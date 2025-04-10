import { Paginated, Post, PostToCreate, LoginCredentials, LoginResponse, Result, User, Category, Tag } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8000';

export class Api {
  async fetchFromApi<T>(url: string, options: RequestInit = {}): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url, options);
    } catch (e) {
      console.error('Error fetching from API:', url, e);
      return null;
    }

    if (!response.ok) {
      console.error('Non 2xx status from API:', url, response.status);
      
      try {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          console.error('Parsed error:', errorJson);
        } catch {
          // If it's not valid JSON, the raw text is already logged above
        }
      } catch (_e) {
        console.error('Could not read error response');
      }
      
      return null;
    }

    // For DELETE requests or other requests that don't return content
    if (response.status === 204) {
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error('Error parsing JSON:', url, e);
      return null;
    }

    return json as T;
  }

  getAuthHeaders(token: string | null): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }
}

export class PostsApi extends Api {
  async getPosts(limit: number = 10, page: number = 1): Promise<Paginated<Post> | null> {
    const url = `${BASE_URL}/posts?limit=${limit}&page=${page}`;
    
    try {
      const response = await fetch(url, {
        next: { revalidate: 60 }, // Cache for 60 seconds
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) return null;
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return null;
    }
  }

  async getPostById(id: number): Promise<Post | null> {
    const url = `${BASE_URL}/posts/${id}`;
    return await this.fetchFromApi<Post>(url);
  }

  async createPost(postData: PostToCreate, token: string): Promise<{ post: Post } | null> {
    if (!token) {
      console.error('No authentication token provided');
      return null;
    }
    
    const url = `${BASE_URL}/posts`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getAuthHeaders(token),
        body: JSON.stringify(postData),
        cache: 'no-store' // Don't cache POST requests
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to create post:', errorText);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  }
}

export class CategoriesApi extends Api {
  async getCategories(limit: number = 10, page: number = 1): Promise<Paginated<Category> | null> {
    const offset = (page - 1) * limit;
    const url = `${BASE_URL}/categories?limit=${limit}&page=${page}`;
    
    try {
      const response = await fetch(url, {
        next: { revalidate: 60 }, // Cache for 60 seconds
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) return null;
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return null;
    }
  }
  
  async getCategoryById(id: number): Promise<Category | null> {
    const url = `${BASE_URL}/categories/${id}`;
    
    try {
      const response = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) return null;
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      return null;
    }
  }
}

export class TagsApi extends Api {
  async getTags(limit = 10, page = 1): Promise<Paginated<Tag> | null> {
    const url = `${BASE_URL}/tags?limit=${limit}&page=${page}`;
    
    try {
      const response = await fetch(url, {
        next: { revalidate: 60 }, // Cache for 60 seconds
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) return null;
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      return null;
    }
  }
  
  async getTagById(id: number): Promise<Tag | null> {
    const url = `${BASE_URL}/tags/${id}`;
    
    try {
      const response = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) return null;
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching tag with ID ${id}:`, error);
      return null;
    }
  }
}

export class AuthApi extends Api {
  async login(credentials: LoginCredentials): Promise<Result<LoginResponse | null>> {
    const url = BASE_URL + '/login';
    try {
      const data = await this.fetchFromApi<LoginResponse>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!data) {
        return { ok: false, error: new Error('Login failed') };
      }

      return { ok: true, value: data };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error : new Error('Unknown error') };
    }
  }

  async logout(token: string): Promise<Result<boolean>> {
    const url = BASE_URL + '/users/logout';
    try {
      await this.fetchFromApi(url, {
        method: 'POST',
        headers: this.getAuthHeaders(token),
      });
      
      return { ok: true, value: true };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error : new Error('Unknown error') };
    }
  }

  // We're adapting this to use our JWT token to decode user info
  // since the backend doesn't have a dedicated /me endpoint
  async getCurrentUser(token: string): Promise<Result<User | null>> {
    try {
      // Decode the JWT token to get user information
      // JWT format: header.payload.signature
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        return { ok: false, error: new Error('Invalid token format') };
      }
      
      // Decode the payload (second part of the token)
      const encodedPayload = tokenParts[1];
      const decodedPayload = atob(encodedPayload);
      const payload = JSON.parse(decodedPayload);
      
      // Extract user information from the payload
      const user: User = {
        id: payload.id,
        username: payload.username,
        isAdmin: payload.isAdmin
      };
      
      return { ok: true, value: user };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error : new Error('Failed to decode token') };
    }
  }
}
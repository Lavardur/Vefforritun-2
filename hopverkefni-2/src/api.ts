import { Paginated, Post } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8000';

export class PostsApi {
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
      
      // Try to get more details about the error
      try {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        
        // Try to parse as JSON for more detailed error info
        try {
          const errorJson = JSON.parse(errorText);
          console.error('Parsed error:', errorJson);
        } catch {
          // If it's not valid JSON, the raw text is already logged above
        }
      } catch (e) {
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

  async getPosts(): Promise<Paginated<Post> | null> {
    const url = BASE_URL + '/posts';
    return await this.fetchFromApi<Paginated<Post>>(url);
  }
}
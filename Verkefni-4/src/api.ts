import { Category, Paginated, Question, Answer } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8000';

export class QuestionsApi {
  async fetchFromApi<T>(url: string, options: RequestInit = {}): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url, options);
    } catch (e) {
      console.error('error fetching from api', url, e);
      return null;
    }

    if (!response.ok) {
      console.error('non 2xx status from API', url, response.status);
      return null;
    }

    if (response.status === 204) {
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error('error parsing json', url, e);
      return null;
    }

    return json as T;
  }

  async getCategory(slug: string): Promise<Category | null> {
    const url = BASE_URL + `/categories/${slug}`;
    return await this.fetchFromApi<Category>(url);
  }

  async getCategories(): Promise<Paginated<Category> | null> {
    const url = BASE_URL + '/categories';
    return await this.fetchFromApi<Paginated<Category>>(url);
  }

  async createCategory(name: string): Promise<Category | null> {
    const url = BASE_URL + '/categories';
    
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    };
    
    return await this.fetchFromApi<Category>(url, options);
  }

  async updateCategory(slug: string, name: string): Promise<Category | null> {
    const url = BASE_URL + `/categories/${slug}`;
    
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    };
    
    return await this.fetchFromApi<Category>(url, options);
  }

  async deleteCategory(slug: string): Promise<boolean> {
    const url = BASE_URL + `/categories/${slug}`;
    
    const options: RequestInit = {
      method: 'DELETE',
    };
    
    await this.fetchFromApi(url, options);
    
    return true;
  }

  async getQuestions(
    categorySlug: string,
  ): Promise<Paginated<Question> | null> {
    const url = BASE_URL + `/questions?category=${categorySlug}`;
    return await this.fetchFromApi<Paginated<Question>>(url);
  }

  async getQuestion(id: number): Promise<Question | null> {
    const url = BASE_URL + `/questions/${id}`;
    return await this.fetchFromApi<Question>(url);
  }

  async createQuestion(
    text: string,
    categoryId: string,
    answers: { text: string; correct: boolean }[]
  ): Promise<Question | null> {
    const url = BASE_URL + '/questions';
    
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        category_id: categoryId,
        answers,
      }),
    };
    
    return await this.fetchFromApi<Question>(url, options);
  }

  async updateQuestion(
    id: number,
    text: string,
    answers: Answer[]
  ): Promise<Question | null> {
    const url = BASE_URL + `/questions/${id}`;
    
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        answers,
      }),
    };
    
    return await this.fetchFromApi<Question>(url, options);
  }

  async deleteQuestion(id: number): Promise<boolean> {
    const url = BASE_URL + `/questions/${id}`;
    
    const options: RequestInit = {
      method: 'DELETE',
    };
    
    await this.fetchFromApi(url, options);
    
    return true;
  }
}

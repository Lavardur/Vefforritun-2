export class PostsApi {
  async getPosts(limit: number = 10, page: number = 1) {
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/posts?limit=${limit}&page=${page}`,
        { next: { revalidate: 60 } } // Cache for 60 seconds
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      return null;
    }
  }
  
  // Other methods
}
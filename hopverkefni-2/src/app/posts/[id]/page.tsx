import React from 'react';
import { Metadata } from 'next';
import { PostsApi } from '@/api';
import Post from '@/components/Post/Post';

type Props = {
  params: {
    id: string;
  };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const api = new PostsApi();
  const post = await api.getPostById(parseInt(params.id));
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    };
  }
  
  return {
    title: post.title,
    description: post.content.substring(0, 160)
  };
}

export default function PostPage({ params }: Props) {
  const postId = parseInt(params.id);
  
  return <Post postId={postId} />;
}
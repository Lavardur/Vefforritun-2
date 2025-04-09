import React from 'react';
import { Metadata } from 'next';
import { PostsApi } from '@/api';
import Post from '@/components/Post/Post';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// Generate metadata for SEO
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
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

export default async function PostPage(props: Props) {
  const params = await props.params;
  const postId = parseInt(params.id);

  return <Post postId={postId} />;
}
// src/Posts.tsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { PostsData } from '../types/graphql';

const GET_ALL_POSTS = gql`
  query {
    posts {
      data {
        id
        title
        body
        userId
      }
    }
  }
`;

const Posts: React.FC = () => {
  const { loading, data } = useQuery<PostsData>(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
 ;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {data?.posts.data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p><strong>User ID:</strong> {post.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;

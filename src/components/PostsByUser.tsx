// src/PostsByUser.tsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { PostsData } from '../types/graphql';

const GET_POSTS_BY_USER = gql`
  query GetPostsByUser($userId: ID!) {
    posts(where: { userId: $userId }) {
      data {
        id
        title
        body
        userId
      }
    }
  }
`;

interface PostsByUserProps {
  userId: number;
}

const PostsByUser: React.FC<PostsByUserProps> = ({ userId }) => {
  const { loading, data } = useQuery<PostsData>(GET_POSTS_BY_USER, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Posts by User ID {userId}</h2>
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

export default PostsByUser;

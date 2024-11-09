// src/CreatePost.tsx
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { CreatePostResponse } from '../types/graphql';

const CREATE_POST = gql`
  mutation CreatePost($input: PostCreateInput!) {
    createPost(input: $input) {
      data {
        id
        title
        body
        userId
      }
    }
  }
`;

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [createPost, { data }] = useMutation<CreatePostResponse>(CREATE_POST);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost({ variables: { input: { title, body, userId: parseInt(userId) } } });
    setTitle('');
    setBody('');
    setUserId('');
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>
      {data && (
        <div>
          <h3>New Post Created:</h3>
          <p><strong>Title:</strong> {data.createPost.data.title}</p>
          <p><strong>Body:</strong> {data.createPost.data.body}</p>
          <p><strong>User ID:</strong> {data.createPost.data.userId}</p>
        </div>
      )}
    </div>
  );
};

export default CreatePost;

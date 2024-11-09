// src/UpdatePost.tsx
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { UpdatePostResponse } from '../types/graphql';

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: PostUpdateInput!) {
    updatePost(id: $id, input: $input) {
      data {
        id
        title
        body
        userId
      }
    }
  }
`;

const UpdatePost: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [updatePost, { data }] = useMutation<UpdatePostResponse>(UPDATE_POST);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePost({ variables: { id, input: { title, body, userId: parseInt(userId) } } });
    setId('');
    setTitle('');
    setBody('');
    setUserId('');
  };

  return (
    <div>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="New Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          type="number"
          placeholder="New User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">Update Post</button>
      </form>
      {data && (
        <div>
          <h3>Post Updated:</h3>
          <p><strong>Title:</strong> {data.updatePost.data.title}</p>
          <p><strong>Body:</strong> {data.updatePost.data.body}</p>
          <p><strong>User ID:</strong> {data.updatePost.data.userId}</p>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;

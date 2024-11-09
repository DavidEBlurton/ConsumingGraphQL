// src/DeletePost.tsx
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { DeletePostResponse } from '../types/graphql';

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      data {
        id
      }
    }
  }
`;

const DeletePost: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [deletePost, { data }] = useMutation<DeletePostResponse>(DELETE_POST);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deletePost({ variables: { id } });
    setId('');
  };

  return (
    <div>
      <h2>Delete a Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit">Delete Post</button>
      </form>
      {data && <p>Post with ID {data.deletePost.data.id} has been deleted.</p>}
    </div>
  );
};

export default DeletePost;

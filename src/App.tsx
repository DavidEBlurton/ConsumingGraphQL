// src/App.tsx
import React from 'react';
import ApolloProviderWrapper from './ApolloProvider';
import Posts from './components/Posts';
import PostsByUser from './components/PostsByUser';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import DeletePost from './components/DeletePost';

const App: React.FC = () => {
  return (
    <ApolloProviderWrapper>
      <div>
        <h1>GraphQL</h1>
        <PostsByUser userId={1} />
        <CreatePost />
        <UpdatePost />
        <DeletePost />
      </div>
    </ApolloProviderWrapper>
  );
};

export default App;

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
  export interface PostsData {
    posts: {
      data: Post[];
    };
  }
  
  export interface CreatePostResponse {
    createPost: {
      data: Post;
    };
  }
  
  export interface UpdatePostResponse {
    updatePost: {
      data: Post;
    };
  }
  
  export interface DeletePostResponse {
    deletePost: {
      data: {
        id: number;
      };
    };
  }
  
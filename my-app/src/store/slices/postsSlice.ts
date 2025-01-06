import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api';

interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  image: string;
  comments: string[];
}

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  comments: { [postId: number]: { id: number; name: string; text: string }[] };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  comments: {},
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.get('/cdeb6c5b-1b40-4af5-a21c-8ed15f45b32d');
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    setCurrentPost(state, action: PayloadAction<Post>) {
      state.currentPost = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
    removePost(state, action: PayloadAction<{ id: number }>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      delete state.comments[action.payload.id];
    },
    addComment(
      state,
      action: PayloadAction<{ postId: number; name: string; text: string }>
    ) {
      const { postId, name, text } = action.payload;
      if (!state.comments[postId]) {
        state.comments[postId] = [];
      }
      state.comments[postId].push({
        id: Date.now(),
        name,
        text,
      });
    },
    removeComment(state, action: PayloadAction<{ postId: number; commentId: number }>) {
      const { postId, commentId } = action.payload;
      state.comments[postId] = state.comments[postId].filter(
        (comment) => comment.id !== commentId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Не удалось загрузить посты';
      });
  },
});

export const {
  setPosts,
  setCurrentPost,
  addPost,
  removePost,
  addComment,
  removeComment
} = postsSlice.actions;

export default postsSlice.reducer;

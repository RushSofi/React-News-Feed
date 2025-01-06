import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Feed from './components/Feed/Feed';
import Post from './components/Post/Post';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchPosts } from './store/slices/postsSlice';
import CreatePost from './components/CreatePost/CreatePost';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const posts = useAppSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Feed posts={filteredPosts} />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
      <ThemeToggle />
    </>
  );
};

export default App;

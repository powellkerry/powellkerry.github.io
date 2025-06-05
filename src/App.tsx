import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/index';
import About from './pages/about';
import Contact from './pages/contact';
import BlogPage from './pages/blog/index';
import BlogPost from './components/Blog/BlogPost';

const App: React.FC = () => (
  <Routes>
    <Route path="/" Component={HomePage} />
    <Route path="/about" Component={About} />
    <Route path="/contact" Component={Contact} />
    <Route path="/blog" Component={BlogPage} />
    <Route path="/blog/:id" Component={BlogPost} />
  </Routes>
);

export default App;

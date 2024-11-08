// main.jsx or index.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './components/Login';
import AuthLayout from './components/AuthLayout';
import AllPosts from './pages/AllPosts';
import Signup from './components/SignUp';
import AddPosts from './pages/AddPosts';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import ErrorBoundary from './components/ErrorBoundary';

// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            <AddPosts />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: '/post/:slug',
        element: <Post />,
      },
      {
        path: '*', // Catch-all route for undefined paths
        element: <NotFound />, // Custom 404 page
      },
    ],
  },
]);

// Render the root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);

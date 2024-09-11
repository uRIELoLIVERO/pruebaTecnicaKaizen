import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';
import TasksList from './components/tasks/TasksList';
import NotFoundPage from './components/not-found-page/NotFoundPage';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/task-list",
    element: <TasksList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
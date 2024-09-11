import axios from 'axios';

const API_URL = 'http://localhost:4000/api/tasks';

const getAuthToken = () => JSON.parse(localStorage.getItem('token'));

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = () => api.get('/my-tasks');

export const updateTask = (id, newStatus) => api.put('/my-tasks/update', {id, status: newStatus});

export const createTask = (taskData) => api.post('/', taskData);

export const deleteTask = (id) => api.put('/my-tasks', {id: id});
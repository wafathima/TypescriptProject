// // appZ/src/api.ts
import axios from "axios";
import type { Todo } from "./types/todo";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      return Promise.reject(error);
    } else if (error.request) {
      console.error('No Response:', error.request);
      return Promise.reject(new Error('No response from server'));
    } else {
      console.error('Request Setup Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export const todoAPI = {
  getAll: async (completed?: boolean): Promise<Todo[]> => {
    const url = completed !== undefined ? `/todos?completed=${completed}` : '/todos';
    const response = await API.get(url);
    return response.data.data || response.data;
  },

  // Get single todo
  getById: async (id: string): Promise<Todo> => {
    const response = await API.get(`/todos/${id}`);
    return response.data.data;
  },

  // Create todo
  create: async (title: string): Promise<Todo> => {
    const response = await API.post('/todos', { title });
    return response.data.data;
  },

  // Update todo 
  update: async (id: string, updates: { title?: string; completed?: boolean }): Promise<Todo> => {
    const response = await API.put(`/todos/${id}`, updates);
    return response.data.data;
  },

  // Partial update (PATCH)
  patch: async (id: string, updates: { title?: string; completed?: boolean }): Promise<Todo> => {
    const response = await API.patch(`/todos/${id}`, updates);
    return response.data.data;
  },

  // Delete todo
  delete: async (id: string): Promise<void> => {
    await API.delete(`/todos/${id}`);
  },

  // Delete all completed todos
  deleteCompleted: async (): Promise<{ message: string; count: number }> => {
    const response = await API.delete('/todos/completed/all');
    return response.data;
  },

  // Toggle all todos
  toggleAll: async (completed: boolean): Promise<Todo[]> => {
    const response = await API.patch('/todos/toggle/all', { completed });
    return response.data.data;
  }
};
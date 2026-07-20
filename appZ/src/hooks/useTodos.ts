// // // appZ/src/hooks/useTodos.ts
import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo.js';
import { todoAPI } from '../api.js';
import axios from 'axios';

const formatTodo = (todo: any): Todo => ({
  ...todo,
  id: todo.id || todo.id,
});

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCatchError = (err: unknown, fallbackMessage: string) => {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || err.message || fallbackMessage);
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError(fallbackMessage);
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    setError(null); 
    try {
      const data = await todoAPI.getAll();
      setTodos(data.map(formatTodo));
    } catch (err) {
      handleCatchError(err, 'Could not fetch todos.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const newTodo = await todoAPI.create(title);
      setTodos((prev) => [...prev, formatTodo(newTodo)]);
    } catch (err) {
      handleCatchError(err, 'Could not add todo item.');
    }
  };

  const toggleTodo = async (id: string, currentStatus: boolean) => {
    try {
      const updated = await todoAPI.update(id, { completed: !currentStatus });
      const formatted = formatTodo(updated);
      setTodos((prev) => prev.map((t) => (t.id === id ? formatted : t)));
    } catch (err) {
      handleCatchError(err, 'Could not update todo.');
    }
  };

  const updateTodo = async (id: string, updates: { title?: string; completed?: boolean }) => {
    try {
      const updated = await todoAPI.update(id, updates);
      const formatted = formatTodo(updated);
      setTodos((prev) => prev.map((t) => (t.id === id ? formatted : t)));
    } catch (err) {
      handleCatchError(err, 'Could not update todo.');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoAPI.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      handleCatchError(err, 'Could not delete todo.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { 
    todos, 
    loading, 
    error, 
    addTodo, 
    toggleTodo, 
    updateTodo,  
    deleteTodo 
  };
};
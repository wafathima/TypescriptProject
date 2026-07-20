// // appZ/src/App.tsx
import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [inputValue, setInputValue] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addTodo(inputValue);
    setInputValue('');
  };

  const startEditing = (todo: { id: string; title: string }) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleUpdate = (id: string) => {
    if (!editValue.trim()) return;
    updateTodo(id, { title: editValue.trim() });
    cancelEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      handleUpdate(id);
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-12 px-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Task Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">Full-Stack TypeScript CRUD Architecture</p>
        </header>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-950/50 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium text-sm rounded-xl px-4 py-2.5 transition-all duration-150 shadow-lg shadow-indigo-600/20"
          >
            Create
          </button>
        </form>

        {/* Dynamic Alerts */}
        {loading && (
          <div className="flex items-center justify-center py-4 text-xs text-slate-400 space-x-2">
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span>Synchronizing with database...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-950/30 border border-red-900/50 text-red-400 rounded-xl p-3 text-xs mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* List Content */}
        {!loading && todos.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
            No active tasks found.
          </div>
        ) : (
          <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center justify-between bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 rounded-xl p-3.5 transition-all duration-200 hover:bg-slate-950"
              >
                {editingId === todo.id ? (
                  // Edit Mode
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, todo.id)}
                      className="flex-1 bg-slate-950 border border-indigo-500 rounded-lg px-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      autoFocus
                      placeholder="Edit task..."
                    />
                    <button
                      onClick={() => handleUpdate(todo.id)}
                      className="text-emerald-400 hover:text-emerald-300 p-1.5 rounded-lg hover:bg-emerald-950/30 transition-all"
                      title="Save"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/30 transition-all"
                      title="Cancel"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <div 
                      onClick={() => toggleTodo(todo.id, todo.completed)}
                      className="flex items-center space-x-3 cursor-pointer flex-1"
                    >
                      {/* Custom Checkbox Design */}
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                        todo.completed 
                          ? 'bg-emerald-600 border-emerald-500 shadow-sm shadow-emerald-600/20' 
                          : 'border-slate-700 group-hover:border-slate-500'
                      }`}>
                        {todo.completed && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Title Text */}
                      <span className={`text-sm tracking-wide select-none transition-all duration-200 ${
                        todo.completed ? 'line-through text-slate-500 decoration-slate-600' : 'text-slate-300'
                      }`}>
                        {todo.title}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                      {/* Edit Button */}
                      <button
                        onClick={() => startEditing(todo)}
                        className="text-slate-500 hover:text-indigo-400 p-1 rounded-md hover:bg-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-150 focus:opacity-100"
                        title="Edit Task"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded-md hover:bg-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-150 focus:opacity-100"
                        title="Remove Task"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Todo Stats */}
        {todos.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/60 flex justify-between text-xs text-slate-500">
            <span>Total: {todos.length}</span>
            <span>Completed: {todos.filter(t => t.completed).length}</span>
            <span>Pending: {todos.filter(t => !t.completed).length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
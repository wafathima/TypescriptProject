// // // appZ/src/App.tsx
// import React, { useState } from 'react';
// import { useTodos } from './hooks/useTodos';

// export default function App() {
//   const { todos, loading, error, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
//   const [inputValue, setInputValue] = useState<string>('');
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState<string>('');

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;
//     addTodo(inputValue);
//     setInputValue('');
//   };

//   const startEditing = (todo: { id: string; title: string }) => {
//     setEditingId(todo.id);
//     setEditValue(todo.title);
//   };

//   const cancelEditing = () => {
//     setEditingId(null);
//     setEditValue('');
//   };

//   const handleUpdate = (id: string) => {
//     if (!editValue.trim()) return;
//     updateTodo(id, { title: editValue.trim() });
//     cancelEditing();
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
//     if (e.key === 'Enter') {
//       handleUpdate(id);
//     } else if (e.key === 'Escape') {
//       cancelEditing();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-12 px-4 selection:bg-indigo-500 selection:text-white">
//       <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        
//         {/* Header */}
//         <header className="mb-6">
//           <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
//             Task Management
//           </h1>
//           <p className="text-xs text-slate-400 mt-1">Full-Stack TypeScript CRUD Architecture</p>
//         </header>

//         {/* Input Form */}
//         <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
//             placeholder="Add a new task..."
//             className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-950/50 transition-all duration-200"
//           />
//           <button
//             type="submit"
//             className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium text-sm rounded-xl px-4 py-2.5 transition-all duration-150 shadow-lg shadow-indigo-600/20"
//           >
//             Create
//           </button>
//         </form>

//         {/* Dynamic Alerts */}
//         {loading && (
//           <div className="flex items-center justify-center py-4 text-xs text-slate-400 space-x-2">
//             <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//             <span>Synchronizing with database...</span>
//           </div>
//         )}
        
//         {error && (
//           <div className="bg-red-950/30 border border-red-900/50 text-red-400 rounded-xl p-3 text-xs mb-4">
//             ⚠️ {error}
//           </div>
//         )}

//         {/* List Content */}
//         {!loading && todos.length === 0 ? (
//           <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
//             No active tasks found.
//           </div>
//         ) : (
//           <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
//             {todos.map((todo) => (
//               <li
//                 key={todo.id}
//                 className="group flex items-center justify-between bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 rounded-xl p-3.5 transition-all duration-200 hover:bg-slate-950"
//               >
//                 {editingId === todo.id ? (
//                   // Edit Mode
//                   <div className="flex-1 flex items-center gap-2">
//                     <input
//                       type="text"
//                       value={editValue}
//                       onChange={(e) => setEditValue(e.target.value)}
//                       onKeyDown={(e) => handleKeyDown(e, todo.id)}
//                       className="flex-1 bg-slate-950 border border-indigo-500 rounded-lg px-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
//                       autoFocus
//                       placeholder="Edit task..."
//                     />
//                     <button
//                       onClick={() => handleUpdate(todo.id)}
//                       className="text-emerald-400 hover:text-emerald-300 p-1.5 rounded-lg hover:bg-emerald-950/30 transition-all"
//                       title="Save"
//                     >
//                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/30 transition-all"
//                       title="Cancel"
//                     >
//                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <div 
//                       onClick={() => toggleTodo(todo.id, todo.completed)}
//                       className="flex items-center space-x-3 cursor-pointer flex-1"
//                     >
//                       {/* Custom Checkbox Design */}
//                       <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
//                         todo.completed 
//                           ? 'bg-emerald-600 border-emerald-500 shadow-sm shadow-emerald-600/20' 
//                           : 'border-slate-700 group-hover:border-slate-500'
//                       }`}>
//                         {todo.completed && (
//                           <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                           </svg>
//                         )}
//                       </div>
                      
//                       {/* Title Text */}
//                       <span className={`text-sm tracking-wide select-none transition-all duration-200 ${
//                         todo.completed ? 'line-through text-slate-500 decoration-slate-600' : 'text-slate-300'
//                       }`}>
//                         {todo.title}
//                       </span>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex items-center gap-1">
//                       {/* Edit Button */}
//                       <button
//                         onClick={() => startEditing(todo)}
//                         className="text-slate-500 hover:text-indigo-400 p-1 rounded-md hover:bg-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-150 focus:opacity-100"
//                         title="Edit Task"
//                       >
//                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//                         </svg>
//                       </button>

//                       {/* Delete Button */}
//                       <button
//                         onClick={() => deleteTodo(todo.id)}
//                         className="text-slate-500 hover:text-red-400 p-1 rounded-md hover:bg-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-150 focus:opacity-100"
//                         title="Remove Task"
//                       >
//                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Todo Stats */}
//         {todos.length > 0 && (
//           <div className="mt-4 pt-4 border-t border-slate-800/60 flex justify-between text-xs text-slate-500">
//             <span>Total: {todos.length}</span>
//             <span>Completed: {todos.filter(t => t.completed).length}</span>
//             <span>Pending: {todos.filter(t => !t.completed).length}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// appZ/src/App.tsx
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

  const completedCount = todos.filter(t => t.completed).length;
  const progressPercentage = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#3d2c1b] flex flex-col items-center justify-center py-12 px-4 selection:bg-[#8b7355] selection:text-[#f5f0e8]">
      {/* Subtle background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233d2c1b' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-lg relative">
        {/* Classic card */}
        <div className="bg-[#faf6ef] border border-[#d4c5b2] rounded-lg p-8 shadow-[0_4px_20px_rgba(61,44,27,0.08)]">
          
          {/* Header */}
          <header className="mb-8 pb-6 border-b border-[#e8ddd0]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-serif font-light tracking-wide text-[#3d2c1b]">
                  TaskFlow
                </h1>
                <p className="text-[11px] text-[#8b7355] mt-1 font-serif tracking-[0.15em] uppercase">
                  Full-Stack TypeScript CRUD
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8b7355] animate-pulse" />
                <span className="text-[10px] text-[#8b7355] font-serif tracking-wider">Live</span>
              </div>
            </div>
          </header>

          {/* Progress Bar */}
          {todos.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between text-[11px] text-[#8b7355] mb-1.5 font-serif">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="h-1 bg-[#e8ddd0] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#8b7355] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                placeholder="Add a new task..."
                className="w-full bg-[#faf6ef] border border-[#d4c5b2] rounded px-4 py-2.5 text-sm text-[#3d2c1b] placeholder:text-[#b8a692] focus:outline-none focus:border-[#8b7355] focus:ring-1 focus:ring-[#8b7355] transition-all duration-200 font-serif"
              />
              {inputValue && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#b8a692] font-serif">
                  {inputValue.length}/100
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-[#8b7355] hover:bg-[#7a6348] disabled:opacity-40 disabled:cursor-not-allowed text-[#faf6ef] font-serif text-sm rounded px-5 py-2.5 transition-all duration-200 active:scale-95 tracking-wide"
            >
              Add
            </button>
          </form>

          {/* Dynamic Alerts */}
          {loading && (
            <div className="flex items-center justify-center py-3 mb-4 text-xs text-[#8b7355] space-x-2 bg-[#f5f0e8] rounded border border-[#e8ddd0]">
              <div className="w-4 h-4 border-2 border-[#8b7355] border-t-transparent rounded-full animate-spin" />
              <span className="font-serif">Synchronizing...</span>
            </div>
          )}
          
          {error && (
            <div className="bg-[#fdf0ed] border border-[#e8c8c0] text-[#8b5a4a] rounded p-3 text-xs mb-4 font-serif">
              ⚠️ {error}
            </div>
          )}

          {/* List Content */}
          {!loading && todos.length === 0 ? (
            <div className="text-center py-12 border border-[#e8ddd0] rounded bg-[#faf6ef]">
              <div className="text-3xl mb-3 opacity-50">📋</div>
              <p className="text-[#8b7355] text-sm font-serif">No tasks yet</p>
              <p className="text-[#b8a692] text-xs mt-1 font-serif">Start by adding your first task above</p>
            </div>
          ) : (
            <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
              {todos.map((todo, index) => (
                <li
                  key={todo.id}
                  className="group flex items-center justify-between bg-[#faf6ef] hover:bg-[#f5f0e8] border border-[#e8ddd0] hover:border-[#d4c5b2] rounded p-3 transition-all duration-200 animate-slideIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {editingId === todo.id ? (
                    // Edit Mode
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, todo.id)}
                        className="flex-1 bg-[#faf6ef] border border-[#8b7355] rounded px-3 py-1.5 text-sm text-[#3d2c1b] placeholder:text-[#b8a692] focus:outline-none focus:ring-1 focus:ring-[#8b7355] font-serif"
                        autoFocus
                        placeholder="Edit task..."
                      />
                      <button
                        onClick={() => handleUpdate(todo.id)}
                        className="text-[#7a6348] hover:text-[#3d2c1b] p-1 rounded hover:bg-[#e8ddd0] transition-all"
                        title="Save"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-[#b8a692] hover:text-[#8b5a4a] p-1 rounded hover:bg-[#e8ddd0] transition-all"
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
                        className="flex items-center space-x-3 cursor-pointer flex-1 group/task"
                      >
                        {/* Custom Checkbox Design */}
                        <div className={`relative w-4 h-4 border-2 flex items-center justify-center transition-all duration-200 ${
                          todo.completed 
                            ? 'bg-[#8b7355] border-[#8b7355]' 
                            : 'border-[#d4c5b2] group-hover/task:border-[#8b7355]'
                        }`}>
                          {todo.completed && (
                            <svg className="w-2.5 h-2.5 text-[#faf6ef] animate-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        
                        {/* Title Text */}
                        <span className={`text-sm font-serif select-none transition-all duration-200 ${
                          todo.completed 
                            ? 'line-through text-[#b8a692]' 
                            : 'text-[#3d2c1b] group-hover/task:text-[#2d1f12]'
                        }`}>
                          {todo.title}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => startEditing(todo)}
                          className="text-[#b8a692] hover:text-[#8b7355] p-1 rounded hover:bg-[#e8ddd0] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-[#b8a692] hover:text-[#8b5a4a] p-1 rounded hover:bg-[#e8ddd0] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Delete"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            <div className="mt-6 pt-4 border-t border-[#e8ddd0] flex justify-between text-[11px] text-[#8b7355]">
              <div className="flex items-center gap-4 font-serif">
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#b8a692]" />
                  Total {todos.length}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#8b7355]" />
                  Done {completedCount}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#d4c5b2]" />
                  Pending {todos.length - completedCount}
                </span>
              </div>
              <span className="font-serif text-[#b8a692]">
                {completedCount === todos.length && todos.length > 0 ? '✦ Complete' : ''}
              </span>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-5 text-[10px] text-[#b8a692] font-serif tracking-[0.2em] uppercase">
          <span className="opacity-60">✦ minimal & classic ✦</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes check {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .animate-check {
          animation: check 0.2s ease-out forwards;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f5f0e8;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4c5b2;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b8a692;
        }
      `}</style>
    </div>
  );
}
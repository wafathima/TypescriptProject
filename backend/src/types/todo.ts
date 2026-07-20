// // backend/src/types/todo.ts

// export interface Todo {
//   id: string;
//   title: string;
//   completed: boolean;
// }

// export interface CreateTodoDTO {
//   title: string;
// }

// export interface UpdateTodoDTO {
//   title?: string;
//   completed?: boolean;
// }

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTodoDTO {
  title: string;
}

export interface UpdateTodoDTO {
  title?: string;
  completed?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}
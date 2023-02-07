// Types and Interfaces

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type Fetch = typeof store.fetch;
type Action = typeof store.action;

interface User {
  email: string;
  password: string;
  name?: string;
  passwordConfirm?: string;
}

interface Token {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

interface Todo {
  created_at: string;
  description: string;
  todo_id: number;
  updated_at: string;
  user_email: string;
  user_name: string;
}

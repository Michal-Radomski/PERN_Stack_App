// Types and Interfaces

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type Fetch = typeof store.fetch;
type Action = typeof store.action;

interface User {
  email: string;
  password: string;
  name?: string;
}

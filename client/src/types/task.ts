export interface Task {
  id: string;
  title: string;
  description: string;
  created_at: string;
  user_id: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
}

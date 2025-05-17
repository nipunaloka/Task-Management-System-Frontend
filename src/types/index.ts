export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Done';
  createdAt: string;
  updatedAt: string;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}
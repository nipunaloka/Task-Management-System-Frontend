import axios from 'axios';
import { Task, TaskFormData, TaskStats } from '../types';

const API_BASE_URL = 'http://localhost:5000/api/tasks'; // Backend base URL

export const taskService = {
  getTasks: async (
    search?: string,
    status?: 'Pending' | 'In Progress' | 'Done',
    sortBy?: 'deadline' | 'title'
  ): Promise<Task[]> => {
    const params: any = {};
    if (search) params.search = search;
    if (status) params.status = status;
    if (sortBy) params.sortBy = sortBy;

    const response = await axios.get<Task[]>(`${API_BASE_URL}`, {
      params,
      withCredentials: true, // Include session cookies
    });
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task | null> => {
    const response = await axios.get<Task>(`${API_BASE_URL}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  },

  createTask: async (taskData: TaskFormData): Promise<Task> => {
    const response = await axios.post<Task>(`${API_BASE_URL}`, taskData, {
      withCredentials: true,
    });
    return response.data;
  },

  updateTask: async (id: string, taskData: TaskFormData): Promise<Task | null> => {
    const response = await axios.put<Task>(`${API_BASE_URL}/${id}`, taskData, {
      withCredentials: true,
    });
    return response.data;
  },

  deleteTask: async (id: string): Promise<boolean> => {
    await axios.delete(`${API_BASE_URL}/${id}`, {
      withCredentials: true,
    });
    return true;
  },

  getTaskStats: async (): Promise<TaskStats> => {
    const response = await axios.get<TaskStats>(`${API_BASE_URL}/stats`, {
      withCredentials: true,
    });
    return response.data;
  }
};

import { Task, TaskStats } from '../types';
import { format, addDays, subDays } from 'date-fns';

// Helper to create date strings
const getDateString = (daysFromNow: number) => {
  const date = daysFromNow > 0 
    ? addDays(new Date(), daysFromNow) 
    : subDays(new Date(), Math.abs(daysFromNow));
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
};

// Mock tasks data
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Set up OAuth 2.0 with Google for the application login system. Test all authentication flows.',
    deadline: getDateString(5),
    assignedTo: 'Emma Johnson',
    status: 'In Progress',
    createdAt: getDateString(-2),
    updatedAt: getDateString(0),
  },
  {
    id: '2',
    title: 'Create dashboard wireframes',
    description: 'Design wireframes for the main dashboard including task summary, recent activities, and quick actions.',
    deadline: getDateString(3),
    assignedTo: 'Liam Chen',
    status: 'Pending',
    createdAt: getDateString(-5),
    updatedAt: getDateString(-1),
  },
  {
    id: '3',
    title: 'Develop REST API endpoints',
    description: 'Create API endpoints for task CRUD operations with proper validation and error handling.',
    deadline: getDateString(7),
    assignedTo: 'Sophia Martinez',
    status: 'Pending',
    createdAt: getDateString(-3),
    updatedAt: getDateString(-3),
  },
  {
    id: '4',
    title: 'Write unit tests for backend',
    description: 'Create comprehensive unit tests for all backend services and controllers to ensure code quality.',
    deadline: getDateString(2),
    assignedTo: 'Noah Williams',
    status: 'Done',
    createdAt: getDateString(-10),
    updatedAt: getDateString(-1),
  },
  {
    id: '5',
    title: 'Optimize database queries',
    description: 'Review and optimize existing database queries to improve performance for task listing and filtering.',
    deadline: getDateString(4),
    assignedTo: 'Olivia Taylor',
    status: 'In Progress',
    createdAt: getDateString(-7),
    updatedAt: getDateString(-2),
  },
  {
    id: '6',
    title: 'Implement responsive design',
    description: 'Ensure the application is fully responsive and works well on mobile, tablet, and desktop devices.',
    deadline: getDateString(6),
    assignedTo: 'Emma Johnson',
    status: 'Pending',
    createdAt: getDateString(-4),
    updatedAt: getDateString(-4),
  },
  {
    id: '7',
    title: 'Create PDF export functionality',
    description: 'Implement functionality to export task lists as PDF reports with filtering options.',
    deadline: getDateString(8),
    assignedTo: 'Liam Chen',
    status: 'Done',
    createdAt: getDateString(-15),
    updatedAt: getDateString(-3),
  },
  {
    id: '8',
    title: 'Set up CI/CD pipeline',
    description: 'Configure continuous integration and deployment pipeline for automated testing and deployment.',
    deadline: getDateString(10),
    assignedTo: 'Noah Williams',
    status: 'In Progress',
    createdAt: getDateString(-6),
    updatedAt: getDateString(0),
  },
];

// Task statistics based on the mock data
export const getTaskStats = (): TaskStats => {
  const pending = mockTasks.filter(task => task.status === 'Pending').length;
  const inProgress = mockTasks.filter(task => task.status === 'In Progress').length;
  const completed = mockTasks.filter(task => task.status === 'Done').length;
  
  return {
    total: mockTasks.length,
    pending,
    inProgress,
    completed
  };
};

// Simulating API calls with mock data
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import StatCard from '../components/dashboard/StatCard';
import Button from '../components/ui/Button';
import { Task, TaskStats } from '../types';
import { taskService } from '../services/taskService';
import { useAuth } from '../context/AuthContext';
import { formatRelativeDate } from '../utils/dateUtils';
import { CheckCircle2, ListTodo, Clock, PlusCircle, ArrowRight, Hourglass } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksData, statsData] = await Promise.all([
          taskService.getTasks(),
          taskService.getTaskStats(),
        ]);
        setTasks(tasksData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRecentTasks = () => {
    return [...tasks]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  };

  const getUpcomingDeadlines = () => {
    const now = new Date();
    return [...tasks]
      .filter(task => task.status !== 'Done' && new Date(task.deadline) > now)
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 5);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.name}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={<ListTodo />}
          color="primary"
        />
        
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Clock />}
          color="warning"
        />
        
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<Hourglass />}
          color="primary"
        />
        
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 />}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recently Updated</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/tasks')}
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {getRecentTasks().length === 0 ? (
                <p className="text-sm text-gray-500 py-4">No recent tasks found.</p>
              ) : (
                getRecentTasks().map((task, index) => (
                  <div 
                    key={task._id ? `recent-${task._id}` : `recent-${index}`}
                    className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors border-l-4 border-primary-500"
                    onClick={() => navigate(`/tasks/${task._id}`)}
                  >
                    <div className="flex-grow cursor-pointer">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{task.title}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Updated {formatRelativeDate(task.updatedAt)}</span>
                        <span className="mx-1">•</span>
                        <span className="truncate">{task.assignedTo}</span>
                      </div>
                    </div>
                    <div>
                      <div className={`
                        text-xs px-2 py-1 rounded-full
                        ${task.status === 'Pending' ? 'bg-warning-100 text-warning-800' : 
                          task.status === 'In Progress' ? 'bg-primary-100 text-primary-800' :
                          'bg-success-100 text-success-800'}
                      `}>
                        {task.status}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
              <Button
                variant="primary"
                size="sm"
                icon={<PlusCircle size={16} />}
                onClick={() => navigate('/tasks/add')}
              >
                New Task
              </Button>
            </div>
            
            <div className="space-y-4">
              {getUpcomingDeadlines().length === 0 ? (
                <p className="text-sm text-gray-500 py-4">No upcoming deadlines.</p>
              ) : (
                getUpcomingDeadlines().map((task, index) => (
                  <div 
                    key={task._id ? `deadline-${task._id}` : `deadline-${index}`}
                    className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                    onClick={() => navigate(`/tasks/${task._id}`)}
                  >
                    <div className="mr-3 mt-1">
                      <div className={`
                        p-2 rounded-full
                        ${task.status === 'Pending' ? 'bg-warning-100 text-warning-600' : 'bg-primary-100 text-primary-600'}
                      `}>
                        <Clock size={14} />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{task.title}</h3>
                      <div className="text-xs text-gray-500">{formatRelativeDate(task.deadline)}</div>
                    </div>
                    <div className="self-center">
                      <ArrowRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
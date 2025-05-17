import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import TaskDetail from '../components/tasks/TaskDetail';
import { Task } from '../types';
import { taskService } from '../services/taskService';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const ViewTaskPage: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // ✅ type the param

  useEffect(() => {
    if (!id) {
      navigate('/tasks');
      return;
    }

    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await taskService.getTaskById(id);

        if (!data) {
          toast.error('Task not found');
          navigate('/tasks');
          return;
        }

        setTask(data);
      } catch (error) {
        console.error('Error fetching task:', error);
        toast.error('Failed to load task');
        navigate('/tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

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
        <button
          onClick={() => navigate('/tasks')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Tasks</span>
        </button>

        <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
      </div>

      {task && (
        <TaskDetail
          task={task}
          onEdit={() => navigate(`/tasks/edit/${task._id}`)} // ✅ Correct edit path
        />
      )}
    </Layout>
  );
};

export default ViewTaskPage;

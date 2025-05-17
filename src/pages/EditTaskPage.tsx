import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import TaskForm from '../components/tasks/TaskForm';
import { Task, TaskFormData } from '../types';
import { taskService } from '../services/taskService';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const EditTaskPage: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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

  const handleSubmit = async (data: TaskFormData) => {
    if (!id) return;
    
    try {
      setSubmitting(true);
      await taskService.updateTask(id, data);
      toast.success('Task updated successfully');
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    } finally {
      setSubmitting(false);
    }
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
        <button
          onClick={() => navigate(`/tasks/${id}`)}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Task Details</span>
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
        <p className="text-gray-600 mt-1">
          Update task details and settings
        </p>
      </div>

      <Card className="animate-slide-up">
        {task && (
          <TaskForm
            initialValues={task}
            onSubmit={handleSubmit}
            isSubmitting={submitting}
          />
        )}
      </Card>
    </Layout>
  );
};

export default EditTaskPage;
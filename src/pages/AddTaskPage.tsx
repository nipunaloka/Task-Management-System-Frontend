import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import TaskForm from '../components/tasks/TaskForm';
import { TaskFormData } from '../types';
import { taskService } from '../services/taskService';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const AddTaskPage: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: TaskFormData) => {
    try {
      setSubmitting(true);
      await taskService.createTask(data);
      toast.success('Task created successfully');
      navigate('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    } finally {
      setSubmitting(false);
    }
  };

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
        
        <h1 className="text-2xl font-bold text-gray-900">Add New Task</h1>
        <p className="text-gray-600 mt-1">
          Create a new task and assign it to an intern
        </p>
      </div>

      <Card className="animate-slide-up">
        <TaskForm
          onSubmit={handleSubmit}
          isSubmitting={submitting}
        />
      </Card>
    </Layout>
  );
};

export default AddTaskPage;
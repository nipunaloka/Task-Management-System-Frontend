import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import TaskList from '../components/tasks/TaskList';
import TaskFilter from '../components/tasks/TaskFilter';
import Button from '../components/ui/Button';
import { Task } from '../types';
import { taskService } from '../services/taskService';
import { pdfService } from '../services/pdfService';
import { toast } from 'react-toastify';
import { PlusCircle } from 'lucide-react';
import Modal from '../components/ui/Modal';

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (search: string, status: string, sortBy: string) => {
    setSearch(search);
    setStatus(status);
    setSortBy(sortBy);

    let filtered = [...tasks];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower) ||
        task.assignedTo.toLowerCase().includes(searchLower)
      );
    }

    if (status) {
      filtered = filtered.filter(task => task.status === status);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === 'deadline') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    setFilteredTasks(filtered);
  };

  const handleExportPDF = async () => {
    try {
      toast.info('Generating PDF...');
      const pdfBlob = await pdfService.generateTaskReport(filteredTasks);

      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `task-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('PDF report downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF report');
    }
  };

  const confirmDelete = (taskId: string) => {
    setTaskToDelete(taskId);
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      setDeleteLoading(true);
      const success = await taskService.deleteTask(taskToDelete);

      if (success) {
        // Update state to remove deleted task from both lists immediately
        setTasks(prev => prev.filter(task => task._id !== taskToDelete));
        setFilteredTasks(prev => prev.filter(task => task._id !== taskToDelete));
        toast.success('Task deleted successfully');
      } else {
        toast.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    } finally {
      setDeleteLoading(false);
      setTaskToDelete(null);
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all intern assignments
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <Button
            onClick={() => navigate('/tasks/add')}
            icon={<PlusCircle size={18} />}
          >
            Add New Task
          </Button>
        </div>
      </div>

      <TaskFilter onFilter={handleFilter} onExport={handleExportPDF} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <TaskList
            tasks={filteredTasks}
            onView={id => navigate(`/tasks/${id}`)}
            onEdit={id => navigate(`/tasks/${id}/edit`)}
            onDelete={confirmDelete}
          />
        </div>
      )}

      <Modal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        title="Confirm Deletion"
        size="sm"
        footer={
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setTaskToDelete(null)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={deleteLoading}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-gray-700">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
      </Modal>
    </Layout>
  );
};

export default TaskListPage;

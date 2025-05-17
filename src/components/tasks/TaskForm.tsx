import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Task, TaskFormData } from '../../types';
import { Calendar, Clock, User } from 'lucide-react';

interface TaskFormProps {
  initialValues?: Task;
  onSubmit: (data: TaskFormData) => void;
  isSubmitting: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedTo: '',
    status: 'Pending',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title,
        description: initialValues.description,
        deadline: new Date(initialValues.deadline).toISOString().split('T')[0],
        assignedTo: initialValues.assignedTo,
        status: initialValues.status,
      });
    }
  }, [initialValues]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const deadlineDate = new Date(formData.deadline);
      if (isNaN(deadlineDate.getTime())) {
        newErrors.deadline = 'Invalid date format';
      }
    }
    
    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assignee is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof TaskFormData]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof TaskFormData];
        return newErrors;
      });
    }
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      status: value as 'Pending' | 'In Progress' | 'Done' 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="title"
        name="title"
        label="Task Title"
        placeholder="Enter task title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
        fullWidth
        className="font-medium"
      />
      
      <TextArea
        id="description"
        name="description"
        label="Description"
        placeholder="Enter task description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        required
        fullWidth
        rows={4}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="deadline"
          name="deadline"
          type="date"
          label="Deadline"
          value={formData.deadline}
          onChange={handleChange}
          error={errors.deadline}
          required
          icon={<Calendar size={16} />}
        />
        
        <Input
          id="assignedTo"
          name="assignedTo"
          label="Assigned To"
          placeholder="Enter assignee name"
          value={formData.assignedTo}
          onChange={handleChange}
          error={errors.assignedTo}
          required
          icon={<User size={16} />}
        />
      </div>
      
      <Select
        id="status"
        name="status"
        label="Status"
        value={formData.status}
        onChange={handleStatusChange}
        options={[
          { value: 'Pending', label: 'Pending' },
          { value: 'In Progress', label: 'In Progress' },
          { value: 'Done', label: 'Done' },
        ]}
      />
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {initialValues ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
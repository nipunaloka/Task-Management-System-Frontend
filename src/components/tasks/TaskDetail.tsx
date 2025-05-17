import React from 'react';
import { Task } from '../../types';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { formatDate, formatDateTime } from '../../utils/dateUtils';
import { Calendar, Clock, Edit, User } from 'lucide-react';
import Button from '../ui/Button';

interface TaskDetailProps {
  task: Task;
  onEdit: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onEdit }) => {
  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">{task.title}</h1>
        <Badge status={task.status} className="ml-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-600">
          <User size={18} className="mr-2 text-gray-400" />
          <span className="text-sm">
            Assigned to:{' '}
            <span className="font-medium text-gray-800">{task.assignedTo}</span>
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Calendar size={18} className="mr-2 text-gray-400" />
          <span className="text-sm">
            Deadline:{' '}
            <span className="font-medium text-gray-800">{formatDate(task.deadline)}</span>
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
        <div className="text-gray-700 whitespace-pre-line">{task.description}</div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-4">
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          <span>
            Created: {formatDateTime(task.createdAt)}
            {task.updatedAt !== task.createdAt && 
              ` (Updated: ${formatDateTime(task.updatedAt)})`}
          </span>
        </div>
        
        <Button
          onClick={onEdit}
          variant="outline"
          size="sm"
          icon={<Edit size={14} />}
        >
          Edit Task
        </Button>
      </div>
    </Card>
  );
};

export default TaskDetail;
import React from 'react';
import { Task } from '../../types';
import Badge from '../ui/Badge';
import { Edit, Eye, Trash2, Clock } from 'lucide-react';
import Button from '../ui/Button';
import { formatDate, formatDeadline } from '../../utils/dateUtils';

interface TaskListProps {
  tasks: Task[];
  onView: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onView,
  onEdit,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks found. Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              Assigned To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Deadline
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task._id ?? task.title} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{task.title}</div>
                <div className="text-sm text-gray-500 md:hidden truncate max-w-[200px]">
                  {task.assignedTo}
                </div>
                <div className="text-xs text-gray-500 flex items-center mt-1 md:hidden">
                  <Clock size={12} className="mr-1" />
                  {formatDeadline(task.deadline)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                <div className="text-sm text-gray-500">{task.assignedTo}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <div className="text-sm text-gray-500">
                  <span className="mr-1">{formatDate(task.deadline)}</span>
                  <span className="text-xs text-gray-400">
                    ({formatDeadline(task.deadline)})
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge status={task.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Button
                    key={`view-${task._id}`}
                    onClick={() => onView(task._id)}
                    variant="outline"
                    size="sm"
                    icon={<Eye size={16} />}
                    aria-label="View task details"
                    className="hidden sm:inline-flex"
                  >
                    View
                  </Button>
                  <Button
                    key={`edit-${task._id}`}
                    onClick={() => onEdit(task._id)}
                    variant="outline"
                    size="sm"
                    icon={<Edit size={16} />}
                    aria-label="Edit task"
                  >
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button
                    key={`delete-${task._id}`}
                    onClick={() => onDelete(task._id)}
                    variant="danger"
                    size="sm"
                    icon={<Trash2 size={16} />}
                    aria-label="Delete task"
                  >
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

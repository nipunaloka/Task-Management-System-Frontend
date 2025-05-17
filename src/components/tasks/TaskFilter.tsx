import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Search, SlidersHorizontal, FileDown } from 'lucide-react';

interface TaskFilterProps {
  onFilter: (search: string, status: string, sortBy: string) => void;
  onExport: () => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilter, onExport }) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onFilter(search, status, sortBy);
  }, [search, status, sortBy]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              icon={<SlidersHorizontal size={18} />}
              aria-label="Toggle filter options"
            >
              <span className="hidden sm:inline">Filters</span>
            </Button>
            
            <Button
              onClick={onExport}
              variant="outline"
              icon={<FileDown size={18} />}
              aria-label="Export as PDF"
            >
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-down">
            <Select
              label="Status"
              value={status}
              onChange={(value) => setStatus(value)}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'Pending', label: 'Pending' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Done', label: 'Done' },
              ]}
            />
            
            <Select
              label="Sort By"
              value={sortBy}
              onChange={(value) => setSortBy(value)}
              options={[
                { value: '', label: 'Default' },
                { value: 'deadline', label: 'Deadline' },
                { value: 'title', label: 'Title' },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFilter;
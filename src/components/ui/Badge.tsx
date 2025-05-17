import React from 'react';

interface BadgeProps {
  status: 'Pending' | 'In Progress' | 'Done';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const statusClasses = {
    'Pending': 'bg-warning-100 text-warning-800',
    'In Progress': 'bg-primary-100 text-primary-800',
    'Done': 'bg-success-100 text-success-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]} ${className}`}
    >
      {status}
    </span>
  );
};

export default Badge;
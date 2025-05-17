import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200';
  const hoverClasses = hover ? 'hover:shadow-md' : '';
  const classes = `${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`;

  return <div className={classes}>{children}</div>;
};

export default Card;
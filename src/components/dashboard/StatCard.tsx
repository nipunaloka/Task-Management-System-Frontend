import React from 'react';
import Card from '../ui/Card';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactElement;
  color: string;
  change?: {
    value: number;
    type: 'positive' | 'negative' | 'neutral';
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  change,
}) => {
  const getBgColor = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50';
      case 'success':
        return 'bg-success-50';
      case 'warning':
        return 'bg-warning-50';
      case 'error':
        return 'bg-error-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'primary':
        return 'text-primary-600';
      case 'success':
        return 'text-success-600';
      case 'warning':
        return 'text-warning-600';
      case 'error':
        return 'text-error-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeColor = () => {
    switch (change?.type) {
      case 'positive':
        return 'text-success-600';
      case 'negative':
        return 'text-error-600';
      default:
        return 'text-gray-500';
    }
  };

  const getChangeText = () => {
    const prefix = change?.type === 'positive' ? '+' : '';
    return `${prefix}${change?.value}%`;
  };

  return (
    <Card hover padding="lg" className="animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center">
              <span className={`text-xs ${getChangeColor()}`}>
                {getChangeText()}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last week</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-md ${getBgColor()}`}>
          <div className={getIconColor()}>
            {React.cloneElement(icon, { size: 24 })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
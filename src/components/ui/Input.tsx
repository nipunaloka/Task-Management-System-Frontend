import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, icon, className = '', ...props }, ref) => {
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{icon}</span>
            </div>
          )}
          <input
            ref={ref}
            className={`
              appearance-none block w-full px-3 py-2 border rounded-md shadow-sm
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'}
              placeholder-gray-400
              sm:text-sm
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  fullWidth = false,
  className = '',
  disabled,
  ...props 
}) => {
  const baseClasses = `
    relative overflow-hidden py-4 px-6 rounded-3xl font-semibold 
    transition-all duration-200 shadow-material
    active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
    disabled:active:scale-100
  `;

  const variantClasses = {
    primary: `
      bg-brand-red text-white 
      active:shadow-ripple active:animate-ripple
      disabled:bg-gray-300 disabled:text-gray-500
    `,
    secondary: `
      bg-brand-black text-white
      active:shadow-ripple
      disabled:bg-gray-300 disabled:text-gray-500
    `,
    outline: `
      bg-white text-brand-red border-2 border-brand-red
      active:bg-brand-gray
      disabled:border-gray-300 disabled:text-gray-500
    `,
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {/* Ripple Effect Layer */}
      <span className="absolute inset-0 bg-white opacity-0 active:opacity-20 transition-opacity duration-200"></span>
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

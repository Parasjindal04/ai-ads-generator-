import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

// PrimaryButton: Prominent button with solid color
export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <button
    className={`
      inline-flex items-center justify-center gap-2
      rounded-full px-5 py-2 text-sm font-medium
      bg-gradient-to-br from-indigo-500 to-indigo-600
      hover:opacity-90 active:scale-95
      transition-all
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

// GhostButton: Secondary button with border and transparent background
export const GhostButton: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <button
    className={`
      inline-flex items-center gap-2 rounded-full px-4 py-2
      text-sm font-medium border border-white/10 bg-white/30
      hover:bg-white/60 backdrop-blur-sm
      active:scale-95 transition-all
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default {
  PrimaryButton,
  GhostButton,
};
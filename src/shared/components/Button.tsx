import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const variantStyles = {
    primary:
      'bg-slate-800 text-white hover:bg-slate-700 focus-visible:ring-slate-400 shadow-sm hover:shadow',
    secondary:
      'bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-400',
    outline:
      'border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus-visible:ring-slate-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 shadow-sm',
    ghost:
      'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2.5 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

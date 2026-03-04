import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const checkboxId = id || label?.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={checkboxId}
        className={`h-5 w-5 rounded border-slate-300 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors cursor-pointer ${className}`}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="ml-2 cursor-pointer text-sm font-medium text-slate-700 select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
}

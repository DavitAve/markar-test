import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select an option',
  onChange,
  value,
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    if (disabled) return;
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-64 select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <div
        className={`bg-gray-200 text-gray-700 rounded-md border border-gray-300 px-4 py-2 flex items-center justify-between
          ${disabled ? 'cursor-not-allowed' : 'hover:border-blue-600'}
        `}
        onClick={() => !disabled && setOpen(!open)}
        tabIndex={0}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`${value ? 'text-gray-900' : 'text-gray-400'}`}>
          {value ? options.find(o => o.value === value)?.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {open && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="listbox"
          tabIndex={-1}
        >
          {options.map(({ value: val, label }) => {
            const isSelected = val === value;
            return (
              <li
                key={val}
                role="option"
                aria-selected={isSelected}
                className={`cursor-pointer select-none relative py-2 pl-4 pr-4 ${
                  isSelected ? 'bg-blue-600 text-white' : 'text-gray-900 hover:bg-blue-100'
                }`}
                onClick={() => handleSelect(val)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(val);
                  }
                }}
                tabIndex={0}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;

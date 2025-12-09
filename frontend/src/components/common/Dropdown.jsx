// Reusable dropdown component with support for single/multi-select.
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Dropdown Component
const Dropdown = ({
  label,
  options = [],
  value,
  onChange,
  multiple = false,
  placeholder = 'Select...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      const index = newValue.indexOf(optionValue);

      if (index > -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(optionValue);
      }

      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const selectedLabels = multiple
    ? value?.map(v => options.find(o => o.value === v)?.label || v).join(', ') || placeholder
    : options.find(o => o.value === value)?.label || placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="mb-2">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-150"
      >
        <span className={`truncate ${!value || (multiple && value.length === 0) ? 'text-gray-400' : ''}`}>
          {selectedLabels}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-20 w-fit min-w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = multiple
                ? value?.includes(option.value)
                : value === option.value;

              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 hover:bg-blue-50 ${isSelected ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                >
                  <div className="flex items-center">
                    {multiple && (
                      <div className={`w-4 h-4 flex-shrink-0 border rounded mr-3 flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                        }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    )}

                    {/* Label with truncation support */}
                    <span className="truncate whitespace-nowrap">
                      {option.label}
                    </span>

                    {option.count !== undefined && (
                      <span className="ml-auto flex-shrink-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {option.count}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
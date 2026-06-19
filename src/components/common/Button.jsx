import React from 'react';

const Button = ({ label, onClick, span = 1, type = 'digit', className = '' }) => {
  // Map 'type' to specific classes for operators, numbers, and system actions (AC, DEL)
  const getButtonTypeClass = () => {
    switch (type) {
      case 'operator':
        return 'btn-operator';
      case 'action':
        return 'btn-action';
      case 'digit':
      default:
        return 'btn-digit';
    }
  };

  const spanClass = span > 1 ? `span-${span}` : '';

  return (
    <button
      onClick={onClick}
      className={`calc-btn ${getButtonTypeClass()} ${spanClass} ${className}`}
      aria-label={label}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;

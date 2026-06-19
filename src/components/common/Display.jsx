import React from 'react';

// Format numbers for better readability (e.g., 1234567.89 -> 1,234,567.89)
// Keeps trailing decimals intact for typing flow (e.g., "12." or "12.0")
const formatOperand = (operand) => {
  if (operand == null) return '';
  if (operand === 'Cannot divide by zero' || operand === 'Error') {
    return operand;
  }
  
  const [integer, decimal] = operand.split('.');
  const formattedInteger = new Intl.NumberFormat('en-US').format(parseFloat(integer));
  
  if (isNaN(parseFloat(integer))) return operand;
  
  if (decimal == null) return formattedInteger;
  return `${formattedInteger}.${decimal}`;
};

const Display = ({ currentOperand, previousOperand, operation }) => {
  const displayCurrent = currentOperand || '0';
  
  // Dynamically shrink font size as characters get longer to avoid overflow
  const getDynamicFontSize = (text) => {
    const len = text.length;
    if (len > 16) return { fontSize: '1.25rem' };
    if (len > 12) return { fontSize: '1.75rem' };
    if (len > 8) return { fontSize: '2.5rem' };
    return { fontSize: '3.2rem' };
  };

  return (
    <div className="calc-display">
      <div className="previous-operand">
        {formatOperand(previousOperand)} {operation}
      </div>
      <div 
        className="current-operand" 
        style={getDynamicFontSize(displayCurrent)}
      >
        {formatOperand(displayCurrent)}
      </div>
    </div>
  );
};

export default Display;

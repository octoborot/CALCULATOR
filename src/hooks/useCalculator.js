import { useReducer, useEffect, useState, useCallback } from 'react';
import { ACTIONS } from '../reducers/calculatorActions';
import { calculatorReducer, initialState } from '../reducers/calculatorReducer';
import { playClickSound } from '../utils/audioUtils';

export const useCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('calculator-sound');
    return saved === 'true'; // Default is false to avoid annoying users initially
  });

  useEffect(() => {
    localStorage.setItem('calculator-sound', soundEnabled);
  }, [soundEnabled]);

  const playClick = useCallback(() => {
    if (soundEnabled) {
      playClickSound();
    }
  }, [soundEnabled]);

  const appendDigit = useCallback((digit) => {
    playClick();
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  }, [playClick]);

  const chooseOperation = useCallback((operation) => {
    playClick();
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
  }, [playClick]);

  const allClear = useCallback(() => {
    playClick();
    dispatch({ type: ACTIONS.CLEAR });
  }, [playClick]);

  const deleteDigit = useCallback(() => {
    playClick();
    dispatch({ type: ACTIONS.DELETE_DIGIT });
  }, [playClick]);

  const evaluate = useCallback(() => {
    playClick();
    dispatch({ type: ACTIONS.EVALUATE });
  }, [playClick]);

  const toggleSign = useCallback(() => {
    playClick();
    dispatch({ type: ACTIONS.TOGGLE_SIGN });
  }, [playClick]);

  const percent = useCallback(() => {
    playClick();
    dispatch({ type: ACTIONS.PERCENT });
  }, [playClick]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  // Set up physical keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      
      // Prevent browser default keys for standard calculator inputs
      if (
        key === '/' || 
        key === '*' || 
        key === '-' || 
        key === '+' || 
        key === 'Enter' || 
        (key === 'Backspace' && event.target === document.body)
      ) {
        event.preventDefault();
      }

      // Check numbers
      if (/^[0-9]$/.test(key)) {
        appendDigit(key);
        return;
      }

      // Decimals
      if (key === '.' || key === ',') {
        appendDigit('.');
        return;
      }

      // Operators
      if (key === '+') {
        chooseOperation('+');
        return;
      }
      if (key === '-') {
        chooseOperation('-');
        return;
      }
      if (key === '*') {
        chooseOperation('×');
        return;
      }
      if (key === '/') {
        chooseOperation('÷');
        return;
      }

      // Evaluate
      if (key === 'Enter' || key === '=') {
        evaluate();
        return;
      }

      // Delete/Backspace
      if (key === 'Backspace') {
        deleteDigit();
        return;
      }

      // Clear (Escape)
      if (key === 'Escape') {
        allClear();
        return;
      }

      // Percent
      if (key === '%') {
        percent();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [appendDigit, chooseOperation, allClear, deleteDigit, evaluate, percent]);

  return {
    state,
    appendDigit,
    chooseOperation,
    allClear,
    deleteDigit,
    evaluate,
    toggleSign,
    percent,
    soundEnabled,
    toggleSound
  };
};

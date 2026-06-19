import React from 'react';
import Display from '../common/Display';
import Keypad from '../common/Keypad';
import ThemeSwitcher from '../ThemeSwitcher';
import { useCalculator } from '../../hooks/useCalculator';

const Calculator = () => {
  const {
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
  } = useCalculator();

  return (
    <div className="calculator-wrapper">
      <div className="calculator-header">
        <ThemeSwitcher />
        
        {/* Haptic click sound setting */}
        <button 
          className={`sound-toggle-btn ${soundEnabled ? 'sound-on' : 'sound-off'}`}
          onClick={toggleSound}
          title={soundEnabled ? 'Tắt âm thanh click' : 'Bật âm thanh click'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? '🔊 Click Sound' : '🔇 Muted'}
        </button>
      </div>

      <div className="calculator-body">
        <Display
          currentOperand={state.currentOperand}
          previousOperand={state.previousOperand}
          operation={state.operation}
        />
        <Keypad
          appendDigit={appendDigit}
          chooseOperation={chooseOperation}
          allClear={allClear}
          deleteDigit={deleteDigit}
          evaluate={evaluate}
          toggleSign={toggleSign}
          percent={percent}
        />
      </div>

      <div className="calculator-footer">
        <p>Gõ phím hoặc click chuột để tính toán</p>
      </div>
    </div>
  );
};

export default Calculator;

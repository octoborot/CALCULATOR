import React from 'react';
import Button from './Button';

const Keypad = ({
  appendDigit,
  chooseOperation,
  allClear,
  deleteDigit,
  evaluate,
  toggleSign,
  percent
}) => {
  return (
    <div className="calc-keypad">
      {/* Row 1 */}
      <Button label="AC" onClick={allClear} span={2} type="action" />
      <Button label="DEL" onClick={deleteDigit} type="action" />
      <Button label="÷" onClick={() => chooseOperation('÷')} type="operator" />

      {/* Row 2 */}
      <Button label="7" onClick={() => appendDigit('7')} type="digit" />
      <Button label="8" onClick={() => appendDigit('8')} type="digit" />
      <Button label="9" onClick={() => appendDigit('9')} type="digit" />
      <Button label="×" onClick={() => chooseOperation('×')} type="operator" />

      {/* Row 3 */}
      <Button label="4" onClick={() => appendDigit('4')} type="digit" />
      <Button label="5" onClick={() => appendDigit('5')} type="digit" />
      <Button label="6" onClick={() => appendDigit('6')} type="digit" />
      <Button label="-" onClick={() => chooseOperation('-')} type="operator" />

      {/* Row 4 */}
      <Button label="1" onClick={() => appendDigit('1')} type="digit" />
      <Button label="2" onClick={() => appendDigit('2')} type="digit" />
      <Button label="3" onClick={() => appendDigit('3')} type="digit" />
      <Button label="+" onClick={() => chooseOperation('+')} type="operator" />

      {/* Row 5 */}
      <Button label="+/-" onClick={toggleSign} type="digit" />
      <Button label="0" onClick={() => appendDigit('0')} type="digit" />
      <Button label="." onClick={() => appendDigit('.')} type="digit" />
      <Button label="%" onClick={percent} type="digit" />

      {/* Row 6 */}
      <Button label="=" onClick={evaluate} span={4} type="operator" className="btn-equals" />
    </div>
  );
};

export default Keypad;

import { ACTIONS } from './calculatorActions';

export const initialState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false
};

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return '';
  
  let computation = 0;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
    case '*':
      computation = prev * current;
      break;
    case '÷':
    case '/':
      if (current === 0) {
        return 'Cannot divide by zero';
      }
      computation = prev / current;
      break;
    default:
      return '';
  }

  // Handle JS floating point issues (e.g. 0.1 + 0.2 = 0.300000000004)
  // toPrecision(12) formats the number and parseFloat strips any trailing decimal zeroes
  const formattedResult = parseFloat(computation.toPrecision(12));
  return formattedResult.toString();
}

export function calculatorReducer(state, { type, payload }) {
  const isError = state.currentOperand === 'Cannot divide by zero' || state.currentOperand === 'Error';

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // Overwrite if overwrite flag is true or if there's an error on screen
      if (state.overwrite || isError) {
        return {
          ...state,
          currentOperand: payload.digit === '.' ? '0.' : payload.digit,
          overwrite: false
        };
      }

      // Avoid leading multiple zeros
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }

      // Prevent multiple decimals
      if (payload.digit === '.' && state.currentOperand && state.currentOperand.includes('.')) {
        return state;
      }

      // If decimal is first key pressed
      if (payload.digit === '.' && !state.currentOperand) {
        return {
          ...state,
          currentOperand: '0.'
        };
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (isError) return state;

      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      // Change operator if we click it after setting previousOperand
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        };
      }

      // If we only have current operand, promote it to previous
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        };
      }

      // If both are set, compute the intermediate result and set the new operation
      const intermediateResult = evaluate(state);
      if (intermediateResult === 'Cannot divide by zero') {
        return {
          ...state,
          currentOperand: intermediateResult,
          previousOperand: null,
          operation: null,
          overwrite: true
        };
      }

      return {
        ...state,
        previousOperand: intermediateResult,
        operation: payload.operation,
        currentOperand: null
      };

    case ACTIONS.CLEAR:
      return initialState;

    case ACTIONS.DELETE_DIGIT:
      if (isError) {
        return initialState;
      }

      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        };
      }

      if (state.currentOperand == null) return state;

      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      const finalResult = evaluate(state);
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: finalResult
      };

    case ACTIONS.TOGGLE_SIGN:
      if (state.currentOperand == null || isError) return state;

      // Toggle negative/positive representation
      const hasNegative = state.currentOperand.startsWith('-');
      return {
        ...state,
        currentOperand: hasNegative ? state.currentOperand.substring(1) : `-${state.currentOperand}`
      };

    case ACTIONS.PERCENT:
      if (state.currentOperand == null || isError) return state;

      const value = parseFloat(state.currentOperand);
      if (isNaN(value)) return state;

      const percentVal = parseFloat((value / 100).toPrecision(12));
      return {
        ...state,
        currentOperand: percentVal.toString(),
        overwrite: true // Allow overwriting after percent calculation
      };

    default:
      return state;
  }
}

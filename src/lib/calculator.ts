export type Operator = "add" | "subtract" | "multiply" | "divide";
export type CalculatorStatus = "input" | "error";

export type CalculatorState = {
  displayValue: string;
  storedValue: number | null;
  pendingOperator: Operator | null;
  waitingForNextValue: boolean;
  status: CalculatorStatus;
};

export const ERROR_DISPLAY_VALUE = "Error";
export const MAX_DISPLAY_LENGTH = 16;

export const initialCalculatorState: CalculatorState = {
  displayValue: "0",
  storedValue: null,
  pendingOperator: null,
  waitingForNextValue: false,
  status: "input",
};

export function inputDigit(state: CalculatorState, digit: string): CalculatorState {
  if (state.status === "error" || !/^\d$/.test(digit)) {
    return state;
  }

  if (state.waitingForNextValue) {
    return {
      ...state,
      displayValue: digit,
      waitingForNextValue: false,
    };
  }

  if (state.displayValue.length >= MAX_DISPLAY_LENGTH) {
    return state;
  }

  return {
    ...state,
    displayValue: state.displayValue === "0" ? digit : `${state.displayValue}${digit}`,
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.status === "error") {
    return state;
  }

  if (state.waitingForNextValue) {
    return {
      ...state,
      displayValue: "0.",
      waitingForNextValue: false,
    };
  }

  if (state.displayValue.includes(".")) {
    return state;
  }

  return {
    ...state,
    displayValue: `${state.displayValue}.`,
  };
}

export function chooseOperator(
  state: CalculatorState,
  nextOperator: Operator,
): CalculatorState {
  if (state.status === "error") {
    return state;
  }

  const currentValue = Number(state.displayValue);

  if (state.storedValue === null) {
    return {
      ...state,
      storedValue: currentValue,
      pendingOperator: nextOperator,
      waitingForNextValue: true,
    };
  }

  if (state.pendingOperator === null || state.waitingForNextValue) {
    return {
      ...state,
      pendingOperator: nextOperator,
      waitingForNextValue: true,
    };
  }

  const result = calculate(state.storedValue, currentValue, state.pendingOperator);

  if (result === null) {
    return errorState();
  }

  return {
    displayValue: formatResult(result),
    storedValue: result,
    pendingOperator: nextOperator,
    waitingForNextValue: true,
    status: "input",
  };
}

export function calculateResult(state: CalculatorState): CalculatorState {
  if (state.status === "error") {
    return state;
  }

  if (
    state.storedValue === null ||
    state.pendingOperator === null ||
    state.waitingForNextValue
  ) {
    return state;
  }

  const result = calculate(
    state.storedValue,
    Number(state.displayValue),
    state.pendingOperator,
  );

  if (result === null) {
    return errorState();
  }

  return {
    displayValue: formatResult(result),
    storedValue: result,
    pendingOperator: null,
    waitingForNextValue: true,
    status: "input",
  };
}

export function clearCalculator(): CalculatorState {
  return initialCalculatorState;
}

export function calculate(
  left: number,
  right: number,
  operator: Operator,
): number | null {
  switch (operator) {
    case "add":
      return left + right;
    case "subtract":
      return left - right;
    case "multiply":
      return left * right;
    case "divide":
      if (right === 0) {
        return null;
      }

      return left / right;
  }
}

export function formatResult(value: number) {
  if (!Number.isFinite(value)) {
    return ERROR_DISPLAY_VALUE;
  }

  const normalized = Number.parseFloat(value.toPrecision(12)).toString();

  if (normalized.length <= MAX_DISPLAY_LENGTH) {
    return normalized;
  }

  const exponential = value.toExponential(8);

  if (exponential.length <= MAX_DISPLAY_LENGTH) {
    return exponential;
  }

  return exponential.slice(0, MAX_DISPLAY_LENGTH);
}

function errorState(): CalculatorState {
  return {
    displayValue: ERROR_DISPLAY_VALUE,
    storedValue: null,
    pendingOperator: null,
    waitingForNextValue: true,
    status: "error",
  };
}

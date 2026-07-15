export type Operator = "add" | "subtract" | "multiply" | "divide";

export type CalculatorState = {
  displayValue: string;
  storedValue: number | null;
  pendingOperator: Operator | null;
  waitingForNextValue: boolean;
};

export const initialCalculatorState: CalculatorState = {
  displayValue: "0",
  storedValue: null,
  pendingOperator: null,
  waitingForNextValue: false,
};

export function inputDigit(state: CalculatorState, digit: string): CalculatorState {
  if (!/^\d$/.test(digit)) {
    return state;
  }

  if (state.waitingForNextValue) {
    return {
      ...state,
      displayValue: digit,
      waitingForNextValue: false,
    };
  }

  return {
    ...state,
    displayValue: state.displayValue === "0" ? digit : `${state.displayValue}${digit}`,
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
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

  return {
    displayValue: formatResult(result),
    storedValue: result,
    pendingOperator: nextOperator,
    waitingForNextValue: true,
  };
}

export function calculateResult(state: CalculatorState): CalculatorState {
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

  return {
    displayValue: formatResult(result),
    storedValue: result,
    pendingOperator: null,
    waitingForNextValue: true,
  };
}

export function calculate(left: number, right: number, operator: Operator) {
  switch (operator) {
    case "add":
      return left + right;
    case "subtract":
      return left - right;
    case "multiply":
      return left * right;
    case "divide":
      return left / right;
  }
}

export function formatResult(value: number) {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  return Number.parseFloat(value.toPrecision(12)).toString();
}

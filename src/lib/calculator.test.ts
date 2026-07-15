import { describe, expect, it } from "vitest";
import {
  type CalculatorState,
  type Operator,
  ERROR_DISPLAY_VALUE,
  calculateResult,
  chooseOperator,
  clearCalculator,
  initialCalculatorState,
  inputDecimal,
  inputDigit,
} from "./calculator";

function enterValue(state: CalculatorState, value: string) {
  return [...value].reduce((currentState, character) => {
    if (character === ".") {
      return inputDecimal(currentState);
    }

    return inputDigit(currentState, character);
  }, state);
}

function calculateExpression(left: string, operator: Operator, right: string) {
  let state = enterValue(initialCalculatorState, left);
  state = chooseOperator(state, operator);
  state = enterValue(state, right);
  return calculateResult(state);
}

describe("calculator logic", () => {
  it.each([
    ["add", "8", "4", "12"],
    ["subtract", "8", "4", "4"],
    ["multiply", "8", "4", "32"],
    ["divide", "8", "4", "2"],
  ] satisfies Array<[Operator, string, string, string]>)(
    "calculates %s",
    (operator, left, right, expectedDisplay) => {
      expect(calculateExpression(left, operator, right).displayValue).toBe(
        expectedDisplay,
      );
    },
  );

  it("chains operations as each operator is pressed", () => {
    let state = enterValue(initialCalculatorState, "2");
    state = chooseOperator(state, "add");
    state = enterValue(state, "3");
    state = chooseOperator(state, "add");

    expect(state.displayValue).toBe("5");
    expect(state.storedValue).toBe(5);

    state = enterValue(state, "4");
    state = calculateResult(state);

    expect(state.displayValue).toBe("9");
  });

  it("continues from a result when an operator is pressed after equals", () => {
    let state = calculateExpression("5", "add", "2");

    expect(state.displayValue).toBe("7");

    state = chooseOperator(state, "multiply");
    state = enterValue(state, "3");
    state = calculateResult(state);

    expect(state.displayValue).toBe("21");
  });

  it("allows one decimal point in the current entry", () => {
    let state = inputDigit(initialCalculatorState, "1");
    state = inputDecimal(state);
    state = inputDigit(state, "2");
    state = inputDecimal(state);
    state = inputDigit(state, "3");

    expect(state.displayValue).toBe("1.23");
  });

  it("calculates decimal values", () => {
    expect(calculateExpression("1.5", "add", "2.25").displayValue).toBe("3.75");
  });

  it("clears pending calculations back to the initial state", () => {
    let state = enterValue(initialCalculatorState, "42");
    state = chooseOperator(state, "subtract");
    state = enterValue(state, "10");

    expect(clearCalculator()).toEqual(initialCalculatorState);
    expect(clearCalculator()).not.toEqual(state);
  });

  it("shows an error for divide by zero and recovers with clear", () => {
    let state = calculateExpression("8", "divide", "0");

    expect(state.displayValue).toBe(ERROR_DISPLAY_VALUE);
    expect(state.status).toBe("error");

    state = inputDigit(state, "9");
    expect(state.displayValue).toBe(ERROR_DISPLAY_VALUE);

    state = clearCalculator();
    expect(state).toEqual(initialCalculatorState);
  });
});

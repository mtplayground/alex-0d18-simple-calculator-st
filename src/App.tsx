import { useState } from "react";
import ButtonGrid from "./components/ButtonGrid";
import Display from "./components/Display";
import {
  type Operator,
  calculateResult,
  chooseOperator,
  clearCalculator,
  initialCalculatorState,
  inputDecimal,
  inputDigit,
} from "./lib/calculator";

function App() {
  const [calculatorState, setCalculatorState] = useState(initialCalculatorState);

  function handleDigitPress(digit: string) {
    setCalculatorState((currentState) => inputDigit(currentState, digit));
  }

  function handleDecimalPress() {
    setCalculatorState((currentState) => inputDecimal(currentState));
  }

  function handleOperatorPress(operator: Operator) {
    setCalculatorState((currentState) => chooseOperator(currentState, operator));
  }

  function handleEqualsPress() {
    setCalculatorState((currentState) => calculateResult(currentState));
  }

  function handleClearPress() {
    setCalculatorState(clearCalculator());
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-950 sm:py-14">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-sm items-center sm:min-h-[calc(100vh-7rem)]">
        <div className="w-full rounded-lg bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/80 sm:p-7">
          <header className="mb-8">
            <p className="text-sm font-medium text-neutral-500">
              Simple Calculator
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              Calculator
            </h1>
          </header>

          <div className="space-y-5">
            <Display
              isError={calculatorState.status === "error"}
              value={calculatorState.displayValue}
            />
            <ButtonGrid
              onClearPress={handleClearPress}
              onDecimalPress={handleDecimalPress}
              onDigitPress={handleDigitPress}
              onEqualsPress={handleEqualsPress}
              onOperatorPress={handleOperatorPress}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

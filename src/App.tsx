import { useState } from "react";
import ButtonGrid from "./components/ButtonGrid";
import Display from "./components/Display";
import {
  type Operator,
  calculateResult,
  chooseOperator,
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

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-8 text-neutral-950 sm:py-10">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-sm items-center sm:min-h-[calc(100vh-5rem)]">
        <div className="w-full rounded-lg bg-white p-5 shadow-sm ring-1 ring-neutral-200 sm:p-6">
          <header className="mb-6">
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Simple Calculator
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              Calculator
            </h1>
          </header>

          <div className="space-y-4">
            <Display value={calculatorState.displayValue} />
            <ButtonGrid
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

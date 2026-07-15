import CalculatorButton from "./CalculatorButton";
import type { Operator } from "../lib/calculator";

type ButtonGridProps = {
  onClearPress: () => void;
  onDecimalPress: () => void;
  onDigitPress: (digit: string) => void;
  onEqualsPress: () => void;
  onOperatorPress: (operator: Operator) => void;
};

const rows = [
  [
    { label: "7", ariaLabel: "Digit 7" },
    { label: "8", ariaLabel: "Digit 8" },
    { label: "9", ariaLabel: "Digit 9" },
    {
      label: "÷",
      ariaLabel: "Divide",
      operator: "divide" as const,
      variant: "operator" as const,
    },
  ],
  [
    { label: "4", ariaLabel: "Digit 4" },
    { label: "5", ariaLabel: "Digit 5" },
    { label: "6", ariaLabel: "Digit 6" },
    {
      label: "×",
      ariaLabel: "Multiply",
      operator: "multiply" as const,
      variant: "operator" as const,
    },
  ],
  [
    { label: "1", ariaLabel: "Digit 1" },
    { label: "2", ariaLabel: "Digit 2" },
    { label: "3", ariaLabel: "Digit 3" },
    {
      label: "−",
      ariaLabel: "Subtract",
      operator: "subtract" as const,
      variant: "operator" as const,
    },
  ],
];

function ButtonGrid({
  onClearPress,
  onDecimalPress,
  onDigitPress,
  onEqualsPress,
  onOperatorPress,
}: ButtonGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3" aria-label="Calculator controls">
      <CalculatorButton
        label="Clear or reset"
        onPress={onClearPress}
        variant="utility"
      >
        C
      </CalculatorButton>
      <CalculatorButton label="Decimal point" onPress={onDecimalPress}>
        .
      </CalculatorButton>
      <CalculatorButton label="Equals" onPress={onEqualsPress} variant="equals">
        =
      </CalculatorButton>
      <CalculatorButton
        label="Add"
        onPress={() => onOperatorPress("add")}
        variant="operator"
      >
        +
      </CalculatorButton>

      {rows.flatMap((row) =>
        row.map((button) => (
          <CalculatorButton
            key={button.ariaLabel}
            label={button.ariaLabel}
            onPress={
              button.operator !== undefined
                ? () => onOperatorPress(button.operator)
                : button.variant === undefined
                ? () => onDigitPress(button.label)
                : undefined
            }
            variant={button.variant}
          >
            {button.label}
          </CalculatorButton>
        )),
      )}

      <CalculatorButton
        label="Digit 0"
        className="col-span-4"
        onPress={() => onDigitPress("0")}
      >
        0
      </CalculatorButton>
    </div>
  );
}

export default ButtonGrid;

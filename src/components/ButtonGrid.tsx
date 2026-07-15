import CalculatorButton from "./CalculatorButton";

const rows = [
  [
    { label: "7", ariaLabel: "Digit 7" },
    { label: "8", ariaLabel: "Digit 8" },
    { label: "9", ariaLabel: "Digit 9" },
    { label: "÷", ariaLabel: "Divide", variant: "operator" as const },
  ],
  [
    { label: "4", ariaLabel: "Digit 4" },
    { label: "5", ariaLabel: "Digit 5" },
    { label: "6", ariaLabel: "Digit 6" },
    { label: "×", ariaLabel: "Multiply", variant: "operator" as const },
  ],
  [
    { label: "1", ariaLabel: "Digit 1" },
    { label: "2", ariaLabel: "Digit 2" },
    { label: "3", ariaLabel: "Digit 3" },
    { label: "−", ariaLabel: "Subtract", variant: "operator" as const },
  ],
];

function ButtonGrid() {
  return (
    <div className="grid grid-cols-4 gap-3" aria-label="Calculator controls">
      <CalculatorButton label="Clear or reset" variant="utility">
        C
      </CalculatorButton>
      <CalculatorButton label="Decimal point">.</CalculatorButton>
      <CalculatorButton label="Equals" variant="equals">
        =
      </CalculatorButton>
      <CalculatorButton label="Add" variant="operator">
        +
      </CalculatorButton>

      {rows.flatMap((row) =>
        row.map((button) => (
          <CalculatorButton
            key={button.ariaLabel}
            label={button.ariaLabel}
            variant={button.variant}
          >
            {button.label}
          </CalculatorButton>
        )),
      )}

      <CalculatorButton label="Digit 0" className="col-span-4">
        0
      </CalculatorButton>
    </div>
  );
}

export default ButtonGrid;

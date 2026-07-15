import type { ReactNode } from "react";

type CalculatorButtonVariant = "number" | "operator" | "utility" | "equals";

type CalculatorButtonProps = {
  children: ReactNode;
  label: string;
  variant?: CalculatorButtonVariant;
  className?: string;
};

const variantClassName: Record<CalculatorButtonVariant, string> = {
  number: "bg-white text-neutral-950 ring-neutral-200 hover:bg-neutral-50",
  operator: "bg-blue-600 text-white ring-blue-600 hover:bg-blue-700",
  utility: "bg-neutral-200 text-neutral-950 ring-neutral-300 hover:bg-neutral-300",
  equals: "bg-blue-600 text-white ring-blue-600 hover:bg-blue-700",
};

function CalculatorButton({
  children,
  label,
  variant = "number",
  className = "",
}: CalculatorButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex h-14 min-w-0 items-center justify-center rounded-lg text-xl font-semibold shadow-sm ring-1 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] sm:h-16 ${variantClassName[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default CalculatorButton;

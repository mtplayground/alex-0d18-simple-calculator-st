import type { ReactNode } from "react";

type CalculatorButtonVariant = "number" | "operator" | "utility" | "equals";

type CalculatorButtonProps = {
  children: ReactNode;
  label: string;
  variant?: CalculatorButtonVariant;
  onPress?: () => void;
  className?: string;
};

const variantClassName: Record<CalculatorButtonVariant, string> = {
  number: "bg-neutral-50 text-neutral-950 ring-neutral-200 hover:bg-white",
  operator: "bg-teal-600 text-white ring-teal-600 hover:bg-teal-700",
  utility: "bg-neutral-200 text-neutral-950 ring-neutral-300 hover:bg-neutral-300",
  equals: "bg-teal-600 text-white ring-teal-600 hover:bg-teal-700",
};

function CalculatorButton({
  children,
  label,
  variant = "number",
  onPress,
  className = "",
}: CalculatorButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onPress}
      className={`flex h-14 min-w-0 items-center justify-center rounded-lg text-xl font-medium shadow-[0_1px_2px_rgba(15,23,42,0.08)] ring-1 transition hover:shadow-[0_3px_10px_rgba(15,23,42,0.1)] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:scale-[0.98] sm:h-16 ${variantClassName[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default CalculatorButton;

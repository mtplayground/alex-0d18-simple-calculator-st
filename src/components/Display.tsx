type DisplayProps = {
  isError?: boolean;
  value: string;
};

function Display({ isError = false, value }: DisplayProps) {
  return (
    <div
      aria-label="Calculator display"
      aria-live="polite"
      role={isError ? "alert" : undefined}
      className="flex min-h-28 items-end justify-end overflow-hidden rounded-lg bg-neutral-950 px-5 py-5 text-right text-5xl font-semibold leading-none text-white shadow-inner sm:min-h-32 sm:px-6 sm:text-6xl"
    >
      <span className="max-w-full truncate tabular-nums">{value}</span>
    </div>
  );
}

export default Display;

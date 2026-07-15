type DisplayProps = {
  value: string;
};

function Display({ value }: DisplayProps) {
  return (
    <div
      aria-label="Calculator display"
      className="flex min-h-24 items-end justify-end overflow-hidden rounded-lg bg-neutral-950 px-5 py-4 text-right text-5xl font-semibold leading-none text-white sm:min-h-28 sm:text-6xl"
    >
      <span className="max-w-full truncate">{value}</span>
    </div>
  );
}

export default Display;

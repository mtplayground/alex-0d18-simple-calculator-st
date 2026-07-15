function App() {
  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-10 text-neutral-950">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center">
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200">
          <header className="mb-6">
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Simple Calculator
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Calculator
            </h1>
          </header>

          <div
            aria-label="Calculator display"
            className="flex min-h-24 items-end justify-end rounded-xl bg-neutral-950 px-5 py-4 text-right text-5xl font-semibold text-white"
          >
            0
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

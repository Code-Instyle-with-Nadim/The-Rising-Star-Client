export default function Loading() {
  return (
    <main
      aria-busy="true"
      className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-6 py-24 text-foreground"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-40 size-[32rem] -translate-y-1/2 rounded-full border border-border"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[34rem] rounded-full border border-border"
      />

      <div
        role="status"
        aria-live="polite"
        className="relative flex w-full max-w-md flex-col items-center text-center"
      >
        <div aria-hidden className="relative grid size-24 place-items-center">
          <span className="absolute inset-0 rounded-full border border-border" />
          <span className="absolute inset-5 animate-ping rounded-full border border-brand/50 [animation-duration:2.2s]" />
          <span className="grid size-12 place-items-center rounded-full border border-brand/40 bg-brand/10">
            <span className="size-2.5 rounded-full bg-brand" />
          </span>
        </div>

        <p className="mt-8 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          The Rising Star
        </p>

        <p className="mt-3 font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl">
          Setting the <span className="text-highlight italic">scene.</span>
        </p>

        <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
          Warming up the lights and opening the doors.
        </p>

        <div aria-hidden className="mt-8 flex items-center gap-1.5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              style={{ animationDelay: `${delay}ms` }}
              className="size-1.5 animate-bounce rounded-full bg-brand"
            />
          ))}
        </div>

        <span className="sr-only">Loading, please wait.</span>
      </div>
    </main>
  )
}

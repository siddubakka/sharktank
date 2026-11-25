import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-5 py-24 sm:px-8">
      <p className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-maroon uppercase">
        Error 404
      </p>
      <h1 className="mt-4 max-w-lg font-display text-4xl leading-tight font-medium tracking-tight text-ink sm:text-5xl">
        This aisle is empty.
        <br />
        <em className="font-normal text-muted-foreground italic">Nothing listed here yet.</em>
      </h1>
      <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
        The page you’re after doesn’t exist — or it’s still in the test bench.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/marketplace"
          className="rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-maroon-deep"
        >
          Browse marketplace
        </Link>
        <Link
          href="/"
          className="rounded-full border px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-maroon hover:text-maroon"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

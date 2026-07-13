import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="font-display text-4xl">Stránka nenalezena</h1>
      <p className="mt-4 text-muted">Tady nic není — možná se odkaz změnil.</p>
      <Link
        href="/"
        className="mt-8 border border-foreground px-6 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
      >
        Zpět na úvod
      </Link>
    </div>
  );
}

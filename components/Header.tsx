import Link from "next/link";

const nav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/o-mne", label: "O mně" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-lg tracking-tight sm:text-xl"
        >
          Petula Trávníčková
        </Link>
        <nav className="flex gap-4 text-sm text-muted sm:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

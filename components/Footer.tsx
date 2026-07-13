import { getSettings } from "@/lib/data";

export async function Footer() {
  const settings = await getSettings();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-display text-foreground">Petula Trávníčková</p>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <a href={`mailto:${settings.email}`} className="hover:text-foreground">
            {settings.email}
          </a>
          {settings.instagram && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              Instagram
            </a>
          )}
        </div>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

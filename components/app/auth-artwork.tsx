import type { ReactNode } from "react";

export function AuthArtwork({ children }: { children: ReactNode }) {
  return (
    <main className="d360-auth grid min-h-screen place-items-center px-4 py-6 sm:px-6 md:py-12">
      <div className="glass-panel d360-auth-frame grid w-full max-w-5xl md:grid-cols-[1.15fr_minmax(0,1fr)]">
        <div className="grid place-items-center" aria-hidden="true">
          <div className="d360-signal-art d360-auth-art" />
        </div>
        <div className="d360-auth-form grid place-items-center px-inset py-card sm:px-card md:py-panel">{children}</div>
      </div>
    </main>
  );
}

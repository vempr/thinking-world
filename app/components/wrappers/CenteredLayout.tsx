export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-grow flex-col items-center justify-center py-10 sm:py-12 hs-dark-mode-active:bg-neutral-800">
      {children}
    </main>
  );
}

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-grow py-10 sm:py-12 dark:bg-neutral-800">
      {children}
    </main>
  );
}

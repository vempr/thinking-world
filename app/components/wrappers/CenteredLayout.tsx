export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-grow flex-col items-center justify-center py-8 sm:py-12 dark:bg-neutral-800">
      {children}
    </main>
  );
}

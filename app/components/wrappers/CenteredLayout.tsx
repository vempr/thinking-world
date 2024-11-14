export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-grow flex-col items-center justify-center py-24 bg-gradient-to-r from-rose-100 to-teal-100 dark:from-transparent dark:to-transparent dark:bg-neutral-800">
      {children}
    </main>
  );
}

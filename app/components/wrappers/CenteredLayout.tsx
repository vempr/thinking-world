export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-grow flex-col items-center justify-center py-24 bg-gray-100/30 dark:bg-neutral-900">
      {children}
    </main>
  );
}

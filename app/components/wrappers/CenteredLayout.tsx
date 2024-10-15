export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-grow flex-col items-center justify-center py-10 bg-gradient-to-r from-rose-100 to-teal-100 dark:from-blue-900 dark:to-black">
      {children}
    </main>
  );
}

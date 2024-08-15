export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-grow flex-col items-center justify-center dark:bg-neutral-800">
      {children}
    </main>
  );
}

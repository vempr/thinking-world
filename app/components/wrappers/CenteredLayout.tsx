export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-grow flex-col items-center justify-center py-8 bg-gradient-to-r from-sky-900 to-black">
      {children}
    </main>
  );
}

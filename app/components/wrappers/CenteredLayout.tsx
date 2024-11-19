export function CenteredLayout({ smallPadding, children }: { smallPadding?: boolean, children: React.ReactNode }) {
  return (
    <main className={(smallPadding ? "py-12 " : "py-24 ") + "flex flex-grow flex-col items-center justify-center py-24 bg-gray-100/30 dark:bg-neutral-900"}>
      {children}
    </main>
  );
}

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex-grow py-8 dark:bg-neutral-800">{children}</main>;
}

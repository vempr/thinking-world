export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex-grow dark:bg-neutral-800">{children}</main>;
}

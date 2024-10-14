export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex justify-center items-center flex-grow py-8 dark:bg-neutral-900">
    <div className="flex-1 max-w-[90rem]">{children}</div>
  </main>;
}

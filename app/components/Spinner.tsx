export function Spinner({ size }: { size?: number }) {
  return (
    <div
      className={`inline-block ${size ? `size-${size}` : "size-6"} animate-spin rounded-full border-[3px] border-current border-t-transparent text-gray-800 dark:text-white`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent ${className}`}
      role='status'
      aria-label='Loading'
    ></div>
  );
};

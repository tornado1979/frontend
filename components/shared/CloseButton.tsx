import Image from 'next/image';

export const CloseButton = ({
  clearInputValue,
  className = '',
}: {
  clearInputValue: () => void;
  className?: string;
}) => {
  return (
    <button
      type='button'
      onClick={clearInputValue}
      className={`transform focus:text-gray-600 transition-colors duration-200 cursor-pointer ${className}`}
      aria-label='Clear text'
    >
      <Image src='/icons/close.svg' alt='clear text' width={20} height={20} />
    </button>
  );
};

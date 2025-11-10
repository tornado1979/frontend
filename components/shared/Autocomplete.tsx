import { type FC, useRef, type ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import type { Address } from '@/types/address';

type Props = {
  searchTerm: string | null;
  clearInputValue?: () => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  handleItemSelect: (item: Address) => void;
  handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  items: Address[];
  renderItem: (item: Address) => React.ReactNode;
};

export const Autocomplete: FC<Props> = ({
  searchTerm,
  clearInputValue,
  showDropdown = false,
  setShowDropdown,
  handleItemSelect,
  handleInputChange,
  items,
  renderItem,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputnRef = useRef<HTMLDivElement>(null);

  const placeholder = 'Search address';

  // handle the clickoutside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputnRef.current &&
        !searchInputnRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, setShowDropdown]);

  return (
    <div ref={searchInputnRef} className='relative w-full mb-4'>
      <Image
        src='/icons/magnifying-glass.svg'
        alt='Search icon'
        className='absolute left-3 top-4 w-5 h-5 text-gray-400 pointer-events-none z-10'
        width={20}
        height={20}
      />
      <input
        ref={inputRef}
        type='text'
        id='address-search'
        className='w-full pl-10 pr-10 p-3 border border-gray-200 rounded-lg focus:ring-2'
        placeholder={placeholder}
        value={searchTerm || ''}
        onChange={handleInputChange}
        required
      />

      {searchTerm && (
        <button
          type='button'
          onClick={clearInputValue}
          className='absolute top-4 right-3 transform focus:text-gray-600 transition-colors duration-200 cursor-pointer'
          aria-label='Clear text'
        >
          <Image
            src='/icons/close.svg'
            alt='clear text'
            width={20}
            height={20}
          />
        </button>
      )}

      {/* Dropdown */}
      {showDropdown && items && items.length > 0 && (
        <div className='flex flex-col w-full z-10 mt-1 bg-gray-00 rounded-lg shadow-lg max-h-60 overflow-auto'>
          {items.map(item => (
            <div
              key={item?.$tsid}
              className='p-3 hover:bg-gray-50 cursor-pointer border-b border-dashed border-gray-50 last:border-b-0'
              onClick={() => handleItemSelect(item)}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

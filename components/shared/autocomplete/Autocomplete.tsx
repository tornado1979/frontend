import { type FC, useRef, useEffect } from 'react';
import Image from 'next/image';
import type { AutocompleteProps } from '../../types';
import { DropdownList } from './DropdownList';
import { Input } from './Input';
import { LoadingSpinner } from '../LoadingSpinner';
import { CloseButton } from '../CloseButton';

export const Autocomplete: FC<AutocompleteProps> = ({
  searchTerm,
  clearInputValue,
  showDropdown = false,
  setShowDropdown,
  handleItemSelect,
  handleInputChange,
  items,
  renderItem,
  isLoading = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputnRef = useRef<HTMLDivElement>(null);

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
      <Input
        inputRef={inputRef}
        searchTerm={searchTerm || ''}
        handleInputChange={handleInputChange}
        setShowDropdown={setShowDropdown}
      />
      {isLoading && searchTerm ? (
        <LoadingSpinner className='absolute top-4 right-3 z-20' />
      ) : searchTerm ? (
        <CloseButton
          clearInputValue={clearInputValue}
          className='absolute top-4 right-3 '
        />
      ) : null}

      {/* Dropdown */}
      {showDropdown && items && items.length > 0 && (
        <DropdownList
          items={items}
          handleItemSelect={handleItemSelect}
          renderItem={renderItem}
        />
      )}
    </div>
  );
};

import type { FC, ChangeEvent, RefObject } from 'react';

type InputProps = {
  placeholder?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  searchTerm: string | null;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setShowDropdown: (show: boolean) => void;
};

export const Input: FC<InputProps> = ({
  placeholder = 'Search address',
  inputRef,
  searchTerm,
  handleInputChange,
  setShowDropdown,
}) => {
  return (
    <input
      ref={inputRef}
      type='text'
      id='address-search'
      className='w-full pl-10 pr-10 p-3 border border-gray-200 rounded-lg focus:ring-2'
      placeholder={placeholder}
      value={searchTerm || ''}
      onChange={handleInputChange}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          setShowDropdown(false);
          inputRef.current?.blur();
        }
      }}
      required
    />
  );
};

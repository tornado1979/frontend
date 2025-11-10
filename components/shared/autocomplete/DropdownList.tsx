import { type FC } from 'react';
import type { DropdownListProps } from '../../types';

export const DropdownList: FC<DropdownListProps> = ({
  items,
  handleItemSelect,
  renderItem,
}) => {
  return (
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
  );
};

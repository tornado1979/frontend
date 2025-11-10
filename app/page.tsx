'use client';
import { Autocomplete } from '@/components/shared/Autocomplete';
import { useSearch } from '@/hooks/useSearch';

export default function Home() {
  const {
    searchTerm,
    addresses,
    isLoading,
    showDropdown,
    setShowDropdown,
    handleInputChange,
    handleItemSelect,
    clearInputValue,
  } = useSearch();

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white dark:bg-black sm:items-start gap-5'>
        <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
          Search for an Address
        </h2>
        <Autocomplete
          searchTerm={searchTerm}
          clearInputValue={clearInputValue}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          handleItemSelect={handleItemSelect}
          handleInputChange={handleInputChange}
          items={addresses}
          isLoading={isLoading}
          renderItem={address => (
            <>
              <div className='font-medium'>{address.street}</div>
              <div className='text-xs text-gray-500'>{address.postNumber}</div>
              <div className='text-sm text-gray-600'>{address.city}</div>
            </>
          )}
        />
        <div className='flex flex-col items-center gap-6 text-center sm:items-start sm:text-left'></div>
      </main>
    </div>
  );
}

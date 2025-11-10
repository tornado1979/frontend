'use client';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAppStore } from '../store';

export default function Home() {
  const { addresses, isLoading, error, success, getAddresses } = useAppStore();

  useEffect(() => {
    getAddresses('Osl');
  }, [getAddresses]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (success && addresses) {
      toast.success('Addresses loaded successfully!');
    }
  }, [error, success, addresses]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div>Loading addresses...</div>
      </div>
    );
  }

  console.log('Addresses:', addresses);
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
        Display the autocomplete component here
        <div className='flex flex-col items-center gap-6 text-center sm:items-start sm:text-left'></div>
      </main>
    </div>
  );
}

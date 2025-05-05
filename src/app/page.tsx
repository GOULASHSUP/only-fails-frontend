'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.refresh();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 gap-4">
      <h1 className="text-2xl text-pink-400 font-bold">You are on the home page!</h1>
      {isLoggedIn ? (
        <button
          className="bg-pink-400 hover:bg-pink-300 text-zinc-50 px-4 py-2 rounded-full transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="bg-blue-400 hover:bg-blue-300 text-zinc-50 px-4 py-2 rounded-full transition"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      )}
    </main>
  );
}
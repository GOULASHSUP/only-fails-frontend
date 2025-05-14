import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-blue-400 text-zinc-50 w-full">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:pt-16 relative">
                <div className="lg:flex lg:items-end lg:justify-between">
                    <div>
                        <div className="flex justify-center lg:justify-start">
                        <h2 className="text-3xl font-extrabold">OnlyFails</h2>
                        </div>
                        <p className="mx-auto mt-2 max-w-md text-center text-md leading-relaxed lg:text-left">
                        Learning from failure, one flop at a time.
                        </p>
                    </div>
                    <ul className="mt-8 flex flex-wrap text-md justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                        <li>
                        <Link className="text-zinc-100 transition hover:text-pink-300" href="/">Home</Link>
                        </li>
                        <li>
                        <Link className="text-zinc-100 transition hover:text-pink-300" href="/about">About</Link>
                        </li>
                        <li>
                        <Link className="text-zinc-100 transition hover:text-pink-300" href="/catalog">Catalog</Link>
                        </li>
                        <li>
                        <Link className="text-zinc-100 transition hover:text-pink-300" href="/login">Login</Link>
                        </li>
                    </ul>
                </div>
                <p className="mt-6 text-center text-md text-zinc-100 lg:text-center">
                &copy; {new Date().getFullYear()} OnlyFails. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
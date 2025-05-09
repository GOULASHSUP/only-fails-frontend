// src/app/about/page.tsx
'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footerSection';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="bg-zinc-100 min-h-screen pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="card lg:card-side bg-zinc-50 rounded-4xl shadow-lg overflow-hidden">
                        <figure className="lg:w-full aspect-[16/8] overflow-hidden">
                            <img
                                src="illustrations/about.jpg"
                                alt="About Us"
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body p-8 lg:w-full">
                            <h2 className="card-title sm:text-4xl text-2xl font-extrabold text-blue-400 mb-4">About Us</h2>
                            <div className='sm:text-lg text-md text-zinc-600 mb-4'>
                                <p className='mb-3'>
                                    Welcome to OnlyFails – where we celebrate the courage to try and the lessons we learn from failure.
                                </p>
                                <p className='mb-3'>
                                    Our mission is to share the stories of failed ideas, forgotten inventions, and ambitious projects that didn't quite hit the mark. 
                                    We believe that every failure is a stepping stone towards success, and that there's always something valuable to learn from every flop.
                                </p>
                                <p className='mb-8'>
                                    Whether you're an entrepreneur, an inventor, or just someone who loves a good story, 
                                    we're here to inspire you to keep pushing forward, no matter the setbacks.
                                </p>
                                <p className='mb-8'>
                                    For more information about our products and services, check out our full product catalog.
                                </p>
                            </div>
                            <div className="card-actions justify-start">
                                <a href="/catalog" className="btn bg-pink-400 hover:bg-pink-300 text-white font-semibold px-6 py-3 rounded-full transition">
                                    Product Catalog
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
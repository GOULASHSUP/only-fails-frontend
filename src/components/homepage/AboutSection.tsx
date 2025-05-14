'use client';

import { useRouter } from 'next/navigation';

export default function AboutSection() {
    const router = useRouter();

    return (
        <section className="overflow-hidden bg-zinc-50 sm:grid sm:grid-cols-2 items-center max-w-7xl rounded-4xl sm:mx-0 mx-4">
            {/* Text content column */}
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="mx-auto max-w-xl text-center sm:text-left">
                    <h2 className="text-3xl font-extrabold text-blue-400 md:text-4xl">
                        You Failed?
                    </h2>

                    <p className="text-zinc-600 md:mt-4">
                        Amazing projects start with amazing ideas. At OnlyFails, we celebrate innovation that doesn’t always go as planned. Join us as we build a place where creativity thrives—even when it stumbles. If you want to see all the biggest flops of the past, check out catalog!
                    </p>

                    <div className="mt-4 md:mt-8">
                        <button
                            onClick={() => router.push('/about')}
                            className="bg-pink-400 hover:bg-pink-300 text-zinc-100 font-semibold px-6 py-3 rounded-full transition"
                            >
                            Learn More About Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Illustration column */}
            <div className="flex justify-center items-center p-8 md:p-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                alt="About OnlyFails"
                src="/illustrations/about-illustration.png"
                className="w-full max-w-xl object-contain sm:max-w-2xl"
                />
            </div>
        </section>
    );
}
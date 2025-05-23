'use client';

interface FailedProduct {
  _id: string;
  name: string;
  imageURL: string;
  upvotes: number;
  description?: string;
}

export default function HeroSection({ product }: { product: FailedProduct | null }) {
    // Render the hero section with the most upvoted product
    return (
        <section
            className="relative w-full h-screen bg-cover bg-center flex items-center text-zinc-100"
            style={{ backgroundImage: `url(${product?.imageURL || ''})` }}
        >
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
            <div className="relative z-10 p-10 px-4 sm:px-8 max-w-7xl mx-auto text-center">
                <p className="sm:text-3xl text-md uppercase text-pink-400 tracking-widest mb-3">The most upvoted product</p>
                <h1 className="sm:text-5xl text-3xl font-bold mb-4">{product?.name}</h1>
                <p className="sm:text-xl text-md font-black text-pink-400 mb-6 flex justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                    </svg>
                    <span>Upvotes: {product?.upvotes}</span>
                </p>
                <button
                    className="bg-blue-400 hover:bg-blue-300 text-zinc-100 font-semibold px-6 py-3 rounded-full transition"
                    onClick={() => {
                        // Redirect to the product page of the most upvoted product
                        if (product?._id) {
                            window.location.href = `/product/${product._id}`;
                        }
                    }}
                >
                    See This Fail
                </button>
            </div>
        </section>
    );
}
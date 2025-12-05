"use client";

import { useEffect, useState, use } from 'react';
import { useProductContext } from '../../../components/ProductContext'; 
import { ShoppingCart, ArrowLeft, CheckCircle, Truck, Shield, Star } from 'lucide-react';

export default function ProductDetailsPage({ params }) {
    // FIX: Unwrap params with use() for Next.js 15 compatibility
    const { id } = use(params); 
    const { addToCart } = useProductContext(); 
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                // The API call will now work because the route handler is fixed
                const res = await fetch(`/api/products/${id}`); 
                if (!res.ok) throw new Error('Product not found');
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart();
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (loading) return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
    );

    if (error || !product) return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <a href="/" className="text-indigo-600 hover:underline">Return to Home</a>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
                </a>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        
                        {/* Large Product Image (PDF Requirement) */}
                        <div className="bg-gray-100 p-10 flex items-center justify-center relative">
                             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-md object-contain relative z-10 mix-blend-multiply drop-shadow-2xl hover:scale-105 transition duration-500"
                                onError={(e) => { e.currentTarget.src = "https://placehold.co/800x600?text=Image+Unavailable"; }}
                            />
                        </div>

                        {/* Details Section */}
                        <div className="p-8 lg:p-14 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">In Stock</span>
                                <div className="flex text-yellow-400"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                            </div>

                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                            <p className="text-3xl font-bold text-indigo-600 mb-6">${product.price.toFixed(2)}</p>
                            
                            <div className="prose text-gray-600 mb-8 leading-relaxed">
                                <p>{product.description}</p>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-2 text-sm text-gray-600"><Truck className="w-5 h-5 text-indigo-600"/> Free Shipping</div>
                                <div className="flex items-center gap-2 text-sm text-gray-600"><Shield className="w-5 h-5 text-indigo-600"/> 2 Year Warranty</div>
                            </div>
                            
                            <div className="mt-auto pt-6 border-t border-gray-100">
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={isAdded}
                                    className={`w-full py-4 px-6 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                                        isAdded 
                                        ? "bg-green-600 text-white scale-95" 
                                        : "bg-gray-900 text-white hover:bg-indigo-600 hover:-translate-y-1"
                                    }`}
                                >
                                    {isAdded ? (
                                        <><CheckCircle className="w-6 h-6"/> Added to Cart</>
                                    ) : (
                                        <><ShoppingCart className="w-6 h-6"/> Add to Cart</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
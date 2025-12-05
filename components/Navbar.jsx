"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import Link from 'next/link'; // Import Next.js Link
import { useProductContext } from './ProductContext'; 

const Navbar = () => {
	const { cartCount } = useProductContext();
    // Fix hydration mismatch for the badge
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

	return (
		<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 supports-[backdrop-filter]:bg-white/60">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					{/* Brand */}
					<Link href="/" className="flex items-center gap-3 group">
						<div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition duration-300">
							<Package size={24} strokeWidth={2.5} />
						</div>
						<div className="flex flex-col">
							<span className="text-xl font-bold text-gray-900 tracking-tight leading-none">Voxen</span>
							<span className="text-xs font-medium text-indigo-600 tracking-widest uppercase">Store</span>
						</div>
					</Link>

					{/* Actions */}
					<div className="flex items-center gap-2 sm:gap-6">
						<Link href="/" className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-indigo-600 transition px-4 py-2 rounded-lg hover:bg-gray-50">
							Products
						</Link>

						<div className="relative group">
                            <button className="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200">
							    <ShoppingCart className="w-6 h-6" strokeWidth={2} />
                            </button>
                            {/* Only show badge after mount to prevent hydration error */}
							{mounted && cartCount > 0 && (
								<span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow ring-2 ring-white transform translate-x-1/4 -translate-y-1/4 animate-in zoom-in duration-300">
									{cartCount}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
import React from 'react';
import ProductCard from '../components/ProductCard'; 

interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	image: string;
}

async function getProducts(): Promise<Product[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	const apiUrl = `${baseUrl}/api/products`; 
	
    try {
        const res = await fetch(apiUrl, { cache: 'no-store' }); 
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default async function HomePage() {
	const products = await getProducts();

	return (
		<main className="min-h-screen bg-gray-50">
            {/* Professional Hero Section (Restored) */}
            <div className="relative bg-white overflow-hidden border-b border-gray-200">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6 tracking-wide uppercase">
                        Summer Tech Sale
                    </span>
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                        Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Workspace</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Discover premium tools designed for productivity. 
                        Minimalist designs, maximum performance.
                    </p>
                </div>
            </div>

            {/* Product Grid Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-bold text-gray-900">Latest Arrivals</h2>
                    <span className="text-sm text-gray-500">{products.length} Products Available</span>
                </div>
				
				{products.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{products.map(product => (
							<ProductCard key={product.id} product={product} /> 
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
						<div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                        <p className="text-gray-500 mt-2">Please check if the local server is running.</p>
					</div>
				)}
			</div>
		</main>
	);
}
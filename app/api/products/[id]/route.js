import { NextResponse } from 'next/server';
import products from '@/lib/ProductData'; 

export async function GET(request, { params }) {
  // FIX: In Next.js 15, params is a Promise. We must await it.
  const { id } = await params; 
  
  const productId = parseInt(id, 10);
  const product = products.find(p => p.id === productId);

  if (product) {
    return NextResponse.json(product);
  } else {
    return new NextResponse('Product Not Found', { status: 404 });
  }
}
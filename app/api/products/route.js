// app/api/products/route.js
import { NextResponse } from 'next/server';
// Import the static mock data from the lib directory, which is outside the app folder
import products from '@/lib/ProductData'; 

/**
 * Handles the GET request for the /api/products endpoint.
 * This function serves as the simple backend for fetching the list of products.
 * Next.js automatically maps this file to the HTTP endpoint /api/products.
 * @returns {Response} JSON array of all products.
 */
export async function GET() {
  // Simulating a minor network delay for realism (optional, but good for demonstrating asynchronous loading)
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    // NextResponse.json serializes the JavaScript object/array into a JSON string 
    // and sends it back to the client with the correct 200 OK status.
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return a standard 500 Internal Server Error response if something goes wrong
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
import { ProductProvider } from '../components/ProductContext.jsx'; // FIX: Corrected import path
import Navbar from '../components/Navbar.jsx'; // FIX: Corrected import path
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'VoxenStore E-Commerce Demo',
	description: 'Technical assessment project for Full Stack Developer Intern.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-gray-50 min-h-screen antialiased">
				{/* The ProductProvider must wrap the entire application content */}
				<ProductProvider> 
					<Navbar />
					{children}
				</ProductProvider>
			</body>
		</html>
	);
}
import { ProductProvider } from '../components/ProductContext.jsx'; 
import Navbar from '../components/Navbar.jsx'; 
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
            {/* FIX: Added suppressHydrationWarning to ignore browser extensions */}
			<body 
                className="bg-gray-50 min-h-screen antialiased"
                suppressHydrationWarning={true}
            >
				<ProductProvider> 
					<Navbar />
					{children}
				</ProductProvider>
			</body>
		</html>
	);
}
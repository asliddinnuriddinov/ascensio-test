import { Inter } from "next/font/google";
import { Providers } from './providers';
import { Navbar } from '@/shared/ui/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Product Catalog',
  description: 'A modern e-commerce product catalog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

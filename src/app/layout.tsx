import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Logo from './components/Logo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} max-w-[1440px] w-full mx-auto px-10 pb-10 grid gap-10`}
      >
        <header className='py-10 w-full border-b flex justify-between gap-4'>
          <Logo />
          <button className='uppercase text-xs'>Start Slideshow</button>
        </header>

        {children}
      </body>
    </html>
  );
}

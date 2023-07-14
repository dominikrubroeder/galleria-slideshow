import './globals.css';
import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import Logo from './components/Logo';

const libre = Libre_Baskerville({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Galleria Slideshow',
  description:
    'Galleria Slideshow | Frontend challenge from frontendmentor.io, developed by Dominik Rubröder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${libre.className} max-w-[1440px] w-full mx-auto px-10 pb-10 grid gap-10`}
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

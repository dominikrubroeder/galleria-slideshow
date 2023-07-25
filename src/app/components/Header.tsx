'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useGalleryContext } from '../context/GalleryProvider';
import Logo from './Logo';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const galleryCtx = useGalleryContext();

  const handleClick = () => {
    if (pathname === '/') router.push('/starry-night');
    galleryCtx.setIsPlaying(!galleryCtx.value.isPlaying);
  };

  return (
    <header className='py-10 w-full border-b flex justify-between items-center gap-4 flex-wrap'>
      <Logo />

      <button
        className='flex gap-1 uppercase text-xs text-right'
        onClick={handleClick}
      >
        <div className='relative'>
          {galleryCtx.value.isPlaying ? 'Stop' : 'Start'}
        </div>
        <div className='relative z-50 bg-white'>Slideshow</div>
      </button>
    </header>
  );
}

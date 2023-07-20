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
    <header className='py-10 w-full border-b flex justify-between gap-4'>
      <Logo />

      <button className='uppercase text-xs' onClick={handleClick}>
        {galleryCtx.value.isPlaying ? 'Stop' : 'Start'} Slideshow
      </button>
    </header>
  );
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useGalleryContext } from '../context/GalleryProvider';
import Logo from './Logo';
import { useAnimate } from 'framer-motion';
import { useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const galleryCtx = useGalleryContext();
  const [startStop, animateStartStop] = useAnimate();

  const handleClick = () => {
    if (pathname === '/') router.push('/starry-night');
    galleryCtx.setIsPlaying(!galleryCtx.value.isPlaying);
  };

  useEffect(() => {
    animateStartStop(startStop.current, { x: [-16, 0] }, { duration: 1 });
  }, [galleryCtx.value.isPlaying]);

  return (
    <header className='py-10 w-full border-b flex justify-between items-center gap-4 flex-wrap'>
      <Logo />

      <button
        className='flex gap-1 uppercase text-xs text-right'
        onClick={handleClick}
      >
        <div ref={startStop} className='relative'>
          {galleryCtx.value.isPlaying ? 'Stop' : 'Start'}
        </div>
        <div className='relative z-50 bg-white'>Slideshow</div>
      </button>
    </header>
  );
}

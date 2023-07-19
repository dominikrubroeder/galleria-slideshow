'use client';

import { useGalleryContext } from '../GalleryContext';
import Logo from './Logo';

export default function Header() {
  const galleryCtx = useGalleryContext();

  return (
    <header className='py-10 w-full border-b flex justify-between gap-4'>
      <Logo />
      <button
        className='uppercase text-xs'
        onClick={() =>
          galleryCtx.updateValue({
            painting: galleryCtx.value.painting,
            isPlaying: true,
            playTimePerPainting: 10,
            playTimeProgress: galleryCtx.value.playTimeProgress,
          })
        }
      >
        Start Slideshow
      </button>
    </header>
  );
}

'use client';

import { useAnimate } from 'framer-motion';
import { useGalleryContext } from '../context/GalleryProvider';
import { Painting } from '@/data/types';
import { useEffect } from 'react';

interface GalleryControlsProps {
  painting: Painting;
}

export default function GalleryControls({ painting }: GalleryControlsProps) {
  const galleryCtx = useGalleryContext();
  const [galleryProgressBar, animateGalleryProgressBar] = useAnimate();
  const [fade, animateFade] = useAnimate();

  useEffect(() => galleryCtx.updatePainting(painting), []);

  useEffect(() => {
    if (galleryCtx.value.isPlaying)
      animateGalleryProgressBar(
        galleryProgressBar.current,
        { width: ['0%', '100%'] },
        {
          ease: 'linear',
          duration: 10,
          delay: 0.4,
        }
      );
  }, [
    animateGalleryProgressBar,
    galleryProgressBar,
    galleryCtx.value.isPlaying,
    galleryCtx.value.painting,
    galleryCtx.value.playTimePerPainting,
  ]);

  useEffect(() => {
    animateFade(
      fade.current,
      { x: [-16, 0], opacity: [0, 1] },
      { duration: 1 }
    );
  }, [galleryCtx.value.painting]);

  return (
    <div className='fixed right-0 left-0 bottom-0 w-full bg-white z-50'>
      <div className='relative h-0.5 w-full bg-[#E5E5E5]'>
        <span
          ref={galleryProgressBar}
          className='absolute left-0 bg-black h-full'
        ></span>
      </div>

      <div className='flex gap-4 justify-between p-4'>
        <div ref={fade} className='grid gap-1'>
          <h2 className='text-lg'>{galleryCtx.value.painting.name}</h2>
          <p className='text-sm'>{galleryCtx.value.painting.artist.name}</p>
        </div>

        <div className='flex items-center gap-4'>
          <button>Prev</button>
          <button onClick={() => galleryCtx.nextPainting()}>Next</button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useAnimate } from 'framer-motion';
import { useGalleryContext } from '../GalleryContext';
import { Painting } from '@/data/types';
import { useEffect } from 'react';

interface GalleryBarProps {
  painting: Painting;
}

export default function GalleryBar({ painting }: GalleryBarProps) {
  const galleryCtx = useGalleryContext();
  const [galleryProgressBar, animateGalleryProgressBar] = useAnimate();

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

  return (
    <div className='fixed right-0 left-0 bottom-0 w-full bg-white z-50'>
      <div className='relative h-0.5 w-full bg-[#E5E5E5]'>
        <span
          ref={galleryProgressBar}
          className='absolute left-0 bg-black h-full'
        ></span>
      </div>

      <div className='flex gap-4 justify-between p-4'>
        <div className='grid gap-1'>
          <h2 className='text-lg'>{galleryCtx.value.painting.name}</h2>
          <p className='text-sm'>{galleryCtx.value.painting.artist.name}</p>
        </div>

        <div className='flex items-center gap-6'>
          <div>
            <button
              onClick={() =>
                galleryCtx.updateValue({
                  painting: galleryCtx.value.painting,
                  isPlaying: false,
                  playTimePerPainting: 10,
                  playTimeProgress: galleryCtx.value.playTimeProgress,
                })
              }
            >
              Stop
            </button>
          </div>

          <div className='w-[1px] h-4 bg-gray-200'></div>

          <div className='flex items-center gap-4'>
            <button>Prev</button>
            <button onClick={() => galleryCtx.nextPainting()}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          duration: galleryCtx.value.playTimePerPainting,
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
          <div className='flex gap-1'>
            <input
              type='number'
              min={1}
              max={10}
              required
              className='border rounded px-1 text-center bg-gray-100 disabled:cursor-not-allowed'
              value={
                galleryCtx.value.isPlaying
                  ? galleryCtx.value.playTimePerPainting -
                    galleryCtx.value.playTimeProgress
                  : galleryCtx.value.playTimePerPainting
              }
              onChange={(e) =>
                galleryCtx.setPlayTimePerPainting(+e.target.value)
              }
              disabled={galleryCtx.value.isPlaying ? true : false}
            />
          </div>

          <div className='w-[1px] h-6 bg-black opacity-10'></div>

          <button
            onClick={() => galleryCtx.navigateSlideshow('previousPainting')}
          >
            Prev
          </button>
          <button onClick={() => galleryCtx.navigateSlideshow('nextPainting')}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

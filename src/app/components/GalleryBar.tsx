'use client';

import { motion } from 'framer-motion';
import { useGalleryContext } from '../GalleryContext';

export default function GalleryBar() {
  const galleryCtx = useGalleryContext();

  return (
    <div className='fixed right-0 left-0 bottom-0 w-full bg-white z-50'>
      <div className='relative h-0.5 w-full bg-[#E5E5E5]'>
        {galleryCtx.value.isPlaying && (
          <motion.span
            className='absolute left-0 bg-black h-full'
            animate={{
              width: [`0%`, '100%'],
            }}
            transition={{
              ease: 'linear',
              duration: galleryCtx.value.playTimePerPainting,
              delay: 0.4,
            }}
          ></motion.span>
        )}
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
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

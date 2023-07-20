'use client';

import Image from 'next/image';
import GalleryControls from '../components/GalleryControls';
import { useGalleryContext } from '../context/GalleryProvider';
import { useAnimate } from 'framer-motion';
import { useEffect } from 'react';

export default function Page() {
  const galleryCtx = useGalleryContext();
  const painting = galleryCtx.value.painting;
  const [fade, animateFade] = useAnimate();

  useEffect(() => {
    animateFade(
      fade.current,
      { x: [-16, 0], opacity: [0, 1] },
      { duration: 1 }
    );
  }, [galleryCtx.value.painting, animateFade, fade]);

  return (
    <section className='grid gap-4 lg:grid-cols-2'>
      <GalleryControls painting={painting} />

      <div className='relative'>
        <div className='relative'>
          <button className='uppercase tracking-widest text-xs bg-black text-white p-4 absolute top-4 left-4 lg:top-auto lg:bottom-4'>
            View image
          </button>

          <div className='relative max-w-xs w-full h-[320px]'>
            <Image
              src={painting.images.hero.large}
              alt={painting.name}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-contain'
            />
          </div>
        </div>

        <div className='-mt-24 lg:mt-0 lg:flex lg:justify-between lg:flex-col lg:translate-x-1/4 lg:top-0 lg:right-0 lg:h-[110%]'>
          <div
            ref={fade}
            className='bg-white p-16 pt-0 w-[23.75rem] grid gap-6'
          >
            <h1 className='leading-none text-2xl lg:text-[3.5rem]'>
              {painting.name}
            </h1>
            <h3 className='text-[#7D7D7D]'>{painting.artist.name}</h3>
          </div>

          <Image
            src={painting.artist.image}
            alt={painting.name}
            width='128'
            height='128'
            className='object-fit mx-auto'
          />
        </div>
      </div>

      <div className='relative'>
        <div className='leading-none text-[#F3F3F3] text-[6.25rem] lg:absolute lg:top-0 lg:right-0 lg:text-[12.5rem]'>
          {painting.year}
        </div>

        <div className='mt-32 max-w-[21.875rem] w-full mx-auto z-10 relative grid gap-20'>
          {painting.description}

          <a
            href={painting.source}
            target='_blank'
            className='underline uppercase text-xs text-[#7D7D7D]'
          >
            Go to source
          </a>
        </div>
      </div>
    </section>
  );
}

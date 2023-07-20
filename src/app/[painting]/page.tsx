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
    <section className='grid gap-4 xl:grid-cols-2'>
      <GalleryControls painting={painting} />

      <div className='relative lg:grid lg:grid-cols-2 xl:block'>
        <div className='relative'>
          <button className='uppercase tracking-widest text-xs bg-black text-white p-4 absolute top-4 left-4 z-50 md:top-auto md:bottom-4 xl:top-auto xl:bottom-4'>
            View image
          </button>

          <div className='relative h-72 md:w-[29.6785rem] md:h-[35rem]'>
            <Image
              src={painting.images.hero.large}
              alt={painting.name}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover bg-center'
            />
          </div>
        </div>

        <div className='-translate-y-1/4 md:-translate-y-0 md:-translate-x-[16%] md:absolute md:right-0 md:top-0 lg:relative lg:mx-auto xl:absolute xl:-translate-x-[0%]'>
          <div
            ref={fade}
            className='relative bg-white w-[280px] z-50 p-6 md:p-16 md:w-[23.75rem]'
          >
            <h1 className='leading-none text-2xl md:text-[3.5rem] mb-2'>
              {painting.name}
            </h1>
            <h3 className='text-[#7D7D7D]'>{painting.artist.name}</h3>
          </div>

          <Image
            src={painting.artist.image}
            alt={painting.name}
            width='128'
            height='128'
            className='w-16 h-16 object-fit bg-center md:w-32 md:h-32 md:ml-auto'
          />
        </div>
      </div>

      <div className='relative -mt-20 md:mt-16'>
        <div className='text-right leading-none text-[#F3F3F3] text-[6.25rem] md:text-[12.5rem] md:text-left xl:absolute xl:top-0 xl:right-0'>
          {painting.year}
        </div>

        <div className='-mt-8 max-w-[21.875rem] w-full text-[#7D7D7D] mx-auto z-10 relative grid gap-20 md:max-w-md md:-mt-24 xl:mt-32'>
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

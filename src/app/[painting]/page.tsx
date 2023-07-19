import { Painting } from '@/data/types';
import Image from 'next/image';
import GalleryBar from '../components/GalleryBar';

async function getData(paintingName: string): Promise<Painting> {
  const res = await fetch('http://localhost:3000/data.json');

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data: Painting[] = await res.json();

  return (
    data.find(
      (currPainting) =>
        currPainting.name.toLowerCase().replaceAll(' ', '-') === paintingName
    ) ?? data[0]
  );
}

export default async function Page({
  params,
}: {
  params: { painting: string };
}) {
  const data = await getData(params.painting);

  return (
    <section className='grid gap-4 lg:grid-cols-2'>
      <GalleryBar painting={data} />

      <div className='relative'>
        <div className='relative'>
          <button className='uppercase tracking-widest text-xs bg-black text-white p-4 absolute top-4 left-4 lg:top-auto lg:bottom-4'>
            View image
          </button>

          <div className='relative max-w-xs w-full h-[320px]'>
            <Image
              src={data.images.hero.large}
              alt={data.name}
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>

        <div className='-mt-24 lg:mt-0 lg:flex lg:justify-between lg:flex-col lg:translate-x-1/4 lg:top-0 lg:right-0 lg:h-[110%]'>
          <div className='bg-white p-16 pt-0 w-[23.75rem] grid gap-6'>
            <h1 className='leading-none text-2xl lg:text-[3.5rem]'>
              {data.name}
            </h1>
            <h3 className='text-[#7D7D7D]'>{data.artist.name}</h3>
          </div>

          <Image
            src={data.artist.image}
            alt={data.name}
            width='128'
            height='128'
            className='object-fit mx-auto'
          />
        </div>
      </div>

      <div className='relative'>
        <div className='leading-none text-[#F3F3F3] text-[6.25rem] lg:absolute lg:top-0 lg:right-0 lg:text-[12.5rem]'>
          {data.year}
        </div>

        <div className='mt-32 max-w-[21.875rem] w-full mx-auto z-10 relative grid gap-20'>
          {data.description}

          <a
            href={data.source}
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

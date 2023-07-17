import { Painting } from '@/data/types';

async function getData(paintingName: string): Promise<Painting> {
  const res = await fetch('http://localhost:3000/data.json');

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data.find(
    (currPainting) =>
      currPainting.name.toLowerCase().replaceAll(' ', '-') === paintingName
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
      <div className='relative'>
        <div className='absolute top-0 right-0 bg-white p-16 pt-0 w-[23.75rem] grid gap-6'>
          <h1 className='text-[3.5rem] leading-none'>{data.name}</h1>
          <h3 className='text-[#7D7D7D]'>{data.artist.name}</h3>
        </div>
        <img
          src={data.images.hero.large}
          alt={data.name}
          className='w-[35rem]'
        />
      </div>

      <div className='relative'>
        <div className='text-[12.5rem] absolute top-0 right-0 leading-none text-[#F3F3F3]'>
          {data.year}
        </div>

        <div className='mt-32 max-w-[21.875rem] w-full mx-auto z-10 relative'>
          {data.description}
        </div>
      </div>
    </section>
  );
}

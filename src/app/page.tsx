import { Painting } from '@/data/types';
import Link from 'next/link';

async function getData(): Promise<Painting[]> {
  const res = await fetch('http://localhost:3000/data.json');

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main className='w-full'>
      <ul className='grid gap-10 sm:grid-cols-2 xl:grid-cols-4'>
        {data.map((painting) => (
          <li key={painting.name}>
            <Link href={`/${painting.name.toLowerCase().replaceAll(' ', '-')}`}>
              <div className='relative'>
                <img
                  src={painting.images.thumbnail}
                  alt={painting.name}
                  className='w-full'
                />
                <div className='absolute bottom-0 p-8 text-white'>
                  <h2 className='text-2xl'>{painting.name}</h2>
                  <h3 className='opacity-75 text-xs'>{painting.artist.name}</h3>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

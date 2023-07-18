import { Hero } from '@/data/types';
import Image from 'next/image';

interface FullViewPaintingProps {
  image: Hero;
  name: string;
}

export default function FullViewPainting({
  image,
  name,
}: FullViewPaintingProps) {
  return (
    <div className='fixed inset-0 w-full h-full bg-black/70 flex justify-center items-center'>
      <Image
        src={image.large}
        alt={name}
        width='128'
        height='128'
        className='object-fit z-50'
      />
    </div>
  );
}

import { config } from '@/config';
import { Painting } from './types';

export const getData = async (
  identifier?: string
): Promise<Painting[] | Painting | undefined> => {
  const res = await fetch(`${config.hostName}/data.json`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  if (identifier) {
    const data: Painting[] = await res.json();
    const painting = data.find(
      (currPainting) =>
        currPainting.name
          .toLowerCase()
          .replaceAll(' ', '')
          .replaceAll('-', '') ===
        identifier
          .toLowerCase()
          .replaceAll(' ', '')
          .replaceAll('-', '')
          .replaceAll('/', '')
    );

    return painting;
  }

  return res.json();
};

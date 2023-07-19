import { Painting } from '@/data/types';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface GalleryContextProviderType {
  children: React.ReactNode;
}

interface Value {
  painting: Painting;
  isPlaying: boolean;
  playTimePerPainting: number;
  playTimeProgress: number;
}

interface GalleryContextData {
  value: Value;
  update: (value: Value) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  updatePainting: (painting: Painting) => void;
  nextPainting: () => void;
}

const GalleryContext = createContext<GalleryContextData>({
  value: {
    painting: {
      name: 'Starry Night',
      year: 1889,
      description:
        'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
      source: 'https://en.wikipedia.org/wiki/The_Starry_Night',
      artist: {
        image: '/assets/starry-night/artist.jpg',
        name: 'Vincent Van Gogh',
      },
      images: {
        thumbnail: '/assets/starry-night/thumbnail.jpg',
        hero: {
          small: '/assets/starry-night/hero-small.jpg',
          large: '/assets/starry-night/hero-large.jpg',
        },
        gallery: '/assets/starry-night/gallery.jpg',
      },
    },
    isPlaying: false,
    playTimePerPainting: 10,
    playTimeProgress: 0,
  },
  update: (value: Value) => {},
  setIsPlaying: (isPlaying: boolean) => {},
  updatePainting: (painting: Painting) => {},
  nextPainting: () => {},
});

export const useGalleryContext = () => useContext(GalleryContext);

export const GalleryContextProvider: React.FC<GalleryContextProviderType> = ({
  children,
}) => {
  const pathname = usePathname();

  const [value, setValue] = useState({
    painting: {
      name: 'Starry Night',
      year: 1889,
      description:
        'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
      source: 'https://en.wikipedia.org/wiki/The_Starry_Night',
      artist: {
        image: '/assets/starry-night/artist.jpg',
        name: 'Vincent Van Gogh',
      },
      images: {
        thumbnail: '/assets/starry-night/thumbnail.jpg',
        hero: {
          small: '/assets/starry-night/hero-small.jpg',
          large: '/assets/starry-night/hero-large.jpg',
        },
        gallery: '/assets/starry-night/gallery.jpg',
      },
    },
    isPlaying: false,
    playTimePerPainting: 10,
    playTimeProgress: 0,
  });

  // Function to update the counter
  const updatePlayTimeProgress = () => {
    if (value.playTimeProgress >= 10) {
      nextPainting();
      return;
    }

    setValue((previousState) => {
      return {
        ...previousState,
        playTimeProgress: previousState.playTimeProgress + 1,
      };
    });
  };

  const nextPainting = async () => {
    const res = await fetch('http://localhost:3000/data.json');

    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    const data: Painting[] = await res.json();

    const currentPaintingIndex = data.findIndex(
      (currPainting) => currPainting.name === value.painting.name
    );

    if (currentPaintingIndex === -1) {
      console.log('yes');
      setValue((previousState) => {
        return {
          ...previousState,
          painting: data[0],
          isPlaying: true,
          playTimeProgress: 0,
        };
      });

      return;
    }

    setValue((previousState) => {
      return {
        ...previousState,
        painting: data[currentPaintingIndex + 1],
        isPlaying: true,
        playTimeProgress: 0,
      };
    });
  };

  // Start the interval when the component mounts
  useEffect(() => {
    if (!value.isPlaying) return;

    const intervalId = setInterval(updatePlayTimeProgress, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [value]);

  useEffect(() => {
    if (pathname === '/')
      setValue((previousState) => {
        return { ...previousState, isPlaying: false, playTimeProgress: 0 };
      });
  }, [pathname]);

  useEffect(() => console.log(value), [value]);

  return (
    <GalleryContext.Provider
      value={{
        value,
        update: setValue,
        setIsPlaying: (isPlaying: boolean) =>
          setValue((previousState) => {
            return {
              ...previousState,
              isPlaying,
            };
          }),
        updatePainting: (painting: Painting) =>
          setValue((previousState) => {
            return {
              ...previousState,
              painting,
            };
          }),
        nextPainting,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

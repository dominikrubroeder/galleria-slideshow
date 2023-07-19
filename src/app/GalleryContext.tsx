import { Painting } from '@/data/types';
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
  updateValue: (newValue: Value) => void;
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
  updateValue: () => {},
});

export const useGalleryContext = () => useContext(GalleryContext);

export const GalleryContextProvider: React.FC<GalleryContextProviderType> = ({
  children,
}) => {
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

  const updateValue = (newValue: Value) => {
    setValue(newValue);
  };

  // Function to update the counter
  const updatePlayTimeProgress = () => {
    setValue((previousState) => {
      return {
        ...previousState,
        playTimeProgress: previousState.playTimeProgress + 1,
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

  useEffect(() => console.log(value), [value]);

  return (
    <GalleryContext.Provider value={{ value, updateValue }}>
      {children}
    </GalleryContext.Provider>
  );
};

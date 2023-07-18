export default function GalleryBar() {
  return (
    <div className='fixed right-0 left-0 bottom-0 w-full bg-white z-50'>
      <div className='relative h-0.5 w-full bg-[#E5E5E5]'>
        <span className='absolute left-0 bg-black w-1/4 h-full'></span>
      </div>

      <div className='flex gap-4 justify-between p-4'>
        <div className='grid gap-1'>
          <h2 className='text-lg'>Starry Night</h2>
          <p className='text-sm'>Vincent Van Gogh</p>
        </div>

        <div className='flex items-center gap-4'>
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}

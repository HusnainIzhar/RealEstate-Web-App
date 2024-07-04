import React from 'react'

type Props = {}

const AmenitiesSkeleton = (props: Props) => {
  return (
    <div className='flex flex-col gap-5 mb-2'>
        <div className='bg-[#f9f4f4] h-12 rounded-md animate-pulse w-full'></div>
        <div className='bg-[#f9f4f4] h-12 rounded-md animate-pulse w-full'></div>
        <div className='bg-[#f9f4f4] h-12 rounded-md animate-pulse w-full'></div>
        <div className='bg-[#f9f4f4] h-12 rounded-md animate-pulse w-full'></div>
        <div className='bg-[#f9f4f4] h-12 rounded-md animate-pulse w-full'></div>
    </div>
  )
}

export default AmenitiesSkeleton
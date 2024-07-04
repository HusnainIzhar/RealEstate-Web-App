import React from 'react'

type Props = {}

const PropertyFormSkeleton = (props: Props) => {
  return (
    <div className='flex flex-col gap-5 max-w-sm overflow-hidden'>
        <div className='bg-[#f9f4f4] w-48 h-5 animate-pulse rounded-md'></div>
        <div className='flex gap-5'>
            <div className='bg-[#f9f4f4] h-12 w-24 animate-pulse rounded-md'></div>
            <div className='bg-[#f9f4f4] h-12 w-24 animate-pulse rounded-md'></div>
        </div>
        <div className='bg-[#f9f4f4] w-48 h-5 animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] w-full h-5 animate-pulse rounded-md'></div>
        <div className='flex flex-wrap gap-5'>
        <div className='bg-[#f9f4f4] h-12 w-24 animate-pulse rounded-md'></div>
            <div className='bg-[#f9f4f4] h-12 w-24 animate-pulse rounded-md'></div>
            <div className='bg-[#f9f4f4] h-12 w-24 animate-pulse rounded-md'></div>
            <div className='bg-[#f9f4f4] h-12 w-24 animate-pulse rounded-md'></div>
            <div className='bg-[#f9f4f4] h-12 w-24 animate-pulse rounded-md'></div>
        </div>
        <div className='bg-[#f9f4f4] h-5 w-12 animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] h-12 w-full animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] h-5 w-12 animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] h-12 w-full animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] h-5 w-12 animate-pulse rounded-md'></div>
    </div>
  )
}

export default PropertyFormSkeleton
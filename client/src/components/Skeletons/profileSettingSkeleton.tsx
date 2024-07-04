import React from 'react'

type Props = {}

const profileSettingSkeleton = (props: Props) => {
  return (
    <div className='max-w-sm flex flex-col gap-5 overflow-hidden'>
        <div className='bg-[#f9f4f4] h-24 w-24 rounded-full animate-pulse'></div>
        <div className='bg-[#f9f4f4] h-12 w-full animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] h-12 w-full animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] h-12 w-full animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] h-12 w-full animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] h-12 w-full animate-pulse rounded-md'></div>
        <div className='bg-[#f9f4f4] h-5 w-20 animate-pulse flex self-end rounded-md'></div>
        <div className='bg-[#f9f4f4] h-12 w-full animate-pulse rounded-md'></div>
    </div>
  )
}

export default profileSettingSkeleton
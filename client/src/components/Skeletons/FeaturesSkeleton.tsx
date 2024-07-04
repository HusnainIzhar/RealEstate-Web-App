import React from 'react'

type Props = {}

const FeaturesSkeleton = (props: Props) => {
  return (
    <div className='flex flex-col gap-2 p-8'>
        <div className='bg-[#f9f4f4] animate-pulse rounded-md h-8 w-36'></div>
        <div className='flex gap-10'>
        <div className='flex gap-2'>
            <div className='h-14 w-14 bg-[#f9f4f4] animate-pulse rounded-md'></div>
            <div className='flex flex-col justify-center gap-2'>
                <div  className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
                <div className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
            </div>
        </div>
        <div className='flex gap-2'>
            <div className='h-14 w-14 bg-[#f9f4f4] animate-pulse rounded-md'></div>
            <div className='flex flex-col justify-center gap-2'>
                <div  className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
                <div className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
            </div>
        </div>
        </div>
        <div className='flex gap-10'>
        <div className='flex gap-2'>
            <div className='h-14 w-14 bg-[#f9f4f4] animate-pulse rounded-md'></div>
            <div className='flex flex-col justify-center gap-2'>
                <div  className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
                <div className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
            </div>
        </div>
        <div className='flex gap-2'>
            <div className='h-14 w-14 bg-[#f9f4f4] animate-pulse rounded-md'></div>
            <div className='flex flex-col justify-center gap-2'>
                <div  className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
                <div className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
            </div>
        </div>
        </div>
        <div className='flex gap-10'>
        <div className='flex gap-2'>
            <div className='h-14 w-14 bg-[#f9f4f4] animate-pulse rounded-md'></div>
            <div className='flex flex-col justify-center gap-2'>
                <div  className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
                <div className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
            </div>
        </div>
        <div className='flex gap-2'>
            <div className='h-14 w-14 bg-[#f9f4f4] animate-pulse rounded-md'></div>
            <div className='flex flex-col justify-center gap-2'>
                <div  className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
                <div className='h-5 w-20 bg-[#f9f4f4] rounded-md animate-pulse'></div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default FeaturesSkeleton
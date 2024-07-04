import React from 'react'

type Props = {}

const GallerySkeleton = (props: Props) => {
  return (
    <div className='flex flex-col gap-2 max-w-[1224px] p-2'>
        <div className='h-[300px] xs:h-[500px] w-full bg-[#f9f4f4] rounded-md animate-pulse'></div>
        <div className='hidden xs:flex gap-2'>
        <div className="h-20 w-28 bg-[#f9f4f4] rounded-md animate-pulse"></div>
        <div className="h-20 w-28 bg-[#f9f4f4] rounded-md animate-pulse"></div>
        <div className="h-20 w-28 bg-[#f9f4f4] rounded-md animate-pulse"></div>
        <div className="h-20 w-28 bg-[#f9f4f4] rounded-md animate-pulse"></div>
        <div className="h-20 w-28 bg-[#f9f4f4] rounded-md animate-pulse"></div>
        </div>
    </div>
  )
}

export default GallerySkeleton
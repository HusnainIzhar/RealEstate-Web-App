import React from 'react'

type Props = {}

const DescriptionSkeleton = (props: Props) => {
  return (
 <div className='flex flex-col gap-2 p-8'>
    <div className='h-8 w-28 bg-[#f9f4f4] rounded-md animate-pulse'></div>
    <div  className="h-5 w-full bg-[#f9f4f4] rounded-md animate-pulse "></div>
    <div className="h-5 w-full bg-[#f9f4f4] rounded-md animate-pulse "></div>
    <div className="h-5 w-full bg-[#f9f4f4] rounded-md animate-pulse max-w-64"></div>
 </div>
  )
}

export default DescriptionSkeleton
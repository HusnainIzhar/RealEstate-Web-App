import React from 'react'

type Props = {}

const LocationSkeleton = (props: Props) => {
  return (
    <div className='p-8'>
        <div className=' h-96 w-full xxs:w-[745px] bg-[#f9f4f4] animate-pulse rounded-md'></div>
    </div>
  )
}

export default LocationSkeleton
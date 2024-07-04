import React from 'react'

type Props = {}

const PropertyCardSkeleton = (props: Props) => {
  return (
    <div className={`w-[260px] font-Poppins bg-white pb-5 rounded`}>
    <div className="h-40 rounded-t-md relative overflow-hidden group bg-[#f9f4f4] animate-pulse"></div>
    <div className="flex justify-between items-center mx-2">
      <div className="h-2 bg-[#f9f4f4] animate-pulse rounded-xl mt-4 w-28"></div>
      <div className="h-2 bg-[#f9f4f4] animate-pulse rounded-xl mt-4 w-16"></div>
    </div>
    <div className="h-2 bg-[#f9f4f4] animate-pulse rounded mt-3 w-48 mx-2"></div>
    <div className="h-2 bg-[#f9f4f4] animate-pulse rounded mt-3 w-40 mx-2"></div>
    <div className="h-2 bg-[#f9f4f4] animate-pulse rounded mt-3 w-16 mx-2"></div>
  </div>
  )
}

export default PropertyCardSkeleton
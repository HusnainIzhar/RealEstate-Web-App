import React from 'react'

type Props = {}

const ContactCardSkeleton = (props: Props) => {
  return (
    <div className='h-40 w-96 bg-[#f9f4f4] animate-pulse rounded-md'></div>
  )
}

export default ContactCardSkeleton
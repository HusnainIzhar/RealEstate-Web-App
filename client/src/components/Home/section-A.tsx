import React from 'react';
import SectionACard from "../ui/sectionACard"

type Props = {}

const sectionC = (props: Props) => {
  return (
   <>
   <div className='w-full flex justify-center mb-12'>
    <div className='top xs:px-16 xs:py-24 xs:gap-8 bg-white inline-flex justify-center flex-wrap rounded-xl drop-shadow-xl'>
    <SectionACard link='/sale/properties?type=residential' icon='/svgexport-2.svg' title='Buy a Property' description='Perfect homes, happy hearts' button='Browse Properties'/>
    <SectionACard link='/dashboard' icon='/svgexport-4.svg' title='Sell a Property' description='Sell high, thrive always any economy' button='Add Listing' flip/>
    <SectionACard link='/rent/properties?type=residential' icon='/svgexport-6.svg' title='Property on Rent' description='Renting, where love resides' button='Find Rentals'/>
   </div>
   </div>
   </>
  )
}

export default sectionC
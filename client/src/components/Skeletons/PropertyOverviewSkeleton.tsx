import React from "react";

type Props = {};

const PropertyOverviewSkeleton = (props: Props) => {
  return (
    <div className="p-8 flex flex-col gap-2">
      <div className="h-8 w-full bg-[#f9f4f4] rounded-md animate-pulse"></div>
      <div className="flex gap-2 flex-wrap">
        <div className="h-5 w-24 bg-[#f9f4f4] rounded-md animate-pulse"></div>
        <div className="h-5 w-24 bg-[#f9f4f4] rounded-md animate-pulse"></div>
        <div className="h-5 w-24 bg-[#f9f4f4] rounded-md animate-pulse"></div>
      </div>
      <div className="h-8 w-28 mt-5 bg-[#f9f4f4] rounded-md animate-pulse"></div>
      <div className="h-5 w-32 bg-[#f9f4f4] rounded-md animate-pulse"></div>
    </div>
  );
};

export default PropertyOverviewSkeleton;

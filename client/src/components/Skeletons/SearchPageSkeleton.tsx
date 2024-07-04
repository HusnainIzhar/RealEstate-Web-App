import React, { ReactNode } from "react";
import CardSkeleton from "./PropertyCardSkeleton";

type Props = {};

const SearchPageSkeleton = (props: Props) => {
  return (
    <div className="h-screen flex justify-center w-full overflow-hidden">
      <div className="w-[1200px] mx-10">
        <div className="hidden xs:block h-2 w-72 bg-[#f9f4f4] rounded-xl mt-5 animate-pulse"></div>
        <div className="h-8 w-full xs:w-[400px] bg-[#f9f4f4] rounded mt-5 animate-pulse"></div>
        <div className="flex justify-between mt-5 flex-wrap">
          <div className="flex gap-5 flex-wrap">
            <div className="hidden xs:block h-9 w-24  bg-[#f9f4f4] rounded animate-pulse"></div>
            <div className="hidden xs:block h-9 w-24  bg-[#f9f4f4] rounded animate-pulse"></div>
            <div className="hidden xs:block h-9 w-24  bg-[#f9f4f4] rounded animate-pulse"></div>
            <div className="hidden xs:block h-9 w-24  bg-[#f9f4f4] rounded animate-pulse"></div>
            <div className="h-9 w-24  bg-[#f9f4f4] rounded animate-pulse"></div>
            <div className="h-9 w-24  bg-[#f9f4f4] rounded animate-pulse"></div>
            <div className="h-9 w-24  bg-[#f9f4f4] rounded animate-pulse"></div>
          </div>
          <div className="hidden xs:block h-9 w-24 mt-5  bg-[#f9f4f4] rounded animate-pulse"></div>
        </div>
        <div className="h-8 w-full xs:w-[500px] bg-[#f9f4f4] rounded mt-5 animate-pulse"></div>
        <div className="flex gap-11 flex-wrap mt-5 justify-center">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default SearchPageSkeleton;

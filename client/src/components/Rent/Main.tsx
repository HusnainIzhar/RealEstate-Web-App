import React, { FC, lazy, Suspense } from "react";
import NavBar from "../StickyNavBar";
import Footer from "../Footer";
import { useGetAllListingsQuery } from "../../redux/features/listing/listingApi";
import { IListing } from "../../types/types";
import CardSlider from "../ui/cardSlider";
import { ReadonlyURLSearchParams } from "next/navigation";
import Skeleton from "../Skeletons/SearchPageSkeleton";
import Loader from "../ui/Loader";

const AdvanceSearch = lazy(() => import("../ui/advanceSearch"));

type Props = {
  query: string | null | undefined;
  path: string | null;
  searchParams: ReadonlyURLSearchParams | null;
};

const Main: FC<Props> = ({ query, path, searchParams }) => {
  const { data: listings } = useGetAllListingsQuery({});
  if (!listings) {
    return <Loader />;
  }
  const forRent = listings.listings.filter((e: IListing) =>
    e.purpose.includes("rent")
  );


  const listingsByCity = Object.values(
    forRent.reduce((acc: Record<string, IListing[]>, listing: IListing) => {
      const city = listing.city;
      return {
        ...acc,
        [city]: [...(acc[city] ?? []), listing],
      };
    }, {})
  ) as IListing[][];



  return (
    <div>
      <NavBar />
      {listingsByCity.length > 0 && query && (
        <div className="flex justify-center">
          <div className=" max-w-[1400px] flex flex-col gap-10 my-5 w-full">
            {listingsByCity.map((list, index) => (
              <CardSlider
                key={index}
                query={query}
                title={`Recent Properties on Rent from ${list[0].city}`}
                listings={list}
              />
            ))}
          </div>
        </div>
      )}
      {query &&
        !listingsByCity.some((e) =>
          e.some((e) => e.propertyType === query)
        ) && <div className="h-[calc(100vh-372px)] flex items-center justify-center font-medium text-xl">No Property found!</div>}

      {!query && path && (
        <Suspense fallback={<Skeleton />}>
          <AdvanceSearch
            path={path}
            listing={forRent}
            searchParams={searchParams}
          />
        </Suspense>
      )}
      <Footer />
    </div>
  );
};

export default Main;

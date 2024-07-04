import React from "react";
import { useGetAllListingsQuery } from "@/redux/features/listing/listingApi";
import { IListing } from "../../types/types";
import CardSlider from "../ui/cardSlider";
type Props = {};

const SectionC = (props: Props) => {
  const { data: listings } = useGetAllListingsQuery({});

  const forRent =
  listings &&
  listings.listings.filter((e: IListing) => e.purpose.includes("rent"));

  return (
    <>
      {listings && (
        <CardSlider title="Recent Properties for Rent" listings={forRent} />
      )}
    </>
  );
};

export default SectionC;
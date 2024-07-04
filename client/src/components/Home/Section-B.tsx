import React from "react";
import { useGetAllListingsQuery } from "@/redux/features/listing/listingApi";
import { IListing } from "../../types/types";
import CardSlider from "../ui/cardSlider";
type Props = {};

const SectionB = (props: Props) => {
  const { data: listings } = useGetAllListingsQuery({});

  const forSale =
    listings &&
    listings.listings.filter((e: IListing) => e.purpose.includes("sale"));

  return (
    <>
      {listings && (
        <CardSlider title="Recent Properties for Sale" listings={forSale} />
      )}
    </>
  );
};

export default SectionB;

import React, { FC, lazy, Suspense } from "react";
import { useSingleListingQuery } from "../../redux/features/listing/listingApi";
import { IListing } from "../../types/types";
import StickyNavBar from "../StickyNavBar";
import { useGetAllListingsQuery } from "../../redux/features/listing/listingApi";
import Title from "./Contacts";
import Footer from "../Footer";
import GallerySkeleton from "../Skeletons/GallerySkeleton";
import SliderSkeleton from "../Skeletons/SliderSkeleton";
import ContactCardSkeleton from "../Skeletons/ContactCardSkeleton";
import FeaturesSkeleton from "../Skeletons/FeaturesSkeleton";
import DescriptionSkeleton from "../Skeletons/DescriptionSkeleton";
import PropertyOverviewSkeleton from "../Skeletons/PropertyOverviewSkeleton";
import LocationSkeleton from "../Skeletons/LocationSkeleton";

const Gallery = lazy(() => import("./Gallery"));
const CardSlider = lazy(() => import("../ui/cardSlider"));
const ContactCard = lazy(() => import("./SideCard"));
const Amenities = lazy(() => import("./Amenities"));
const Description = lazy(() => import("./Overview"));
const PropertyOverview = lazy(() => import("./propertyOverview"));
const Location = lazy(() => import("./Location"));
import Loader from "../ui/Loader";

type Props = {
  id: string;
};

const Main: FC<Props> = ({ id }) => {
  const { data: listings} = useGetAllListingsQuery({});
  const { data: listing } = useSingleListingQuery(id) as {
    data: { listing: IListing };
  };

  if (!listing) {
    return <Loader/>;
  }
  
  const similarProperties = listings && listing && listings.listings.filter(
    (e: IListing) =>
      e.city.includes(listing.listing.city) &&
      e.purpose === listing.listing.purpose &&
      e._id !== listing.listing._id
  );

  return (
    <div
      className="relative inset-0 bg-cover bg-center h-screen w-screen"
      style={{ backgroundImage: "url('/house.png')" }}
    >
      <div className=" fixed z-50 xs:hidden right-10 bottom-10 ">
        {listing && <Title
          telephone={listing.listing.contact.toString()}
          whatsapp={listing.listing.whatsapp.toString()}
        />}
      </div>
      <div className="wrapper h-full w-full bg-white/50 backdrop-blur-2xl overflow-auto">
        <StickyNavBar />
        <div className="max-w-[1224px] mx-auto flex-col flex gap-5 relative">
          <Suspense fallback={<GallerySkeleton />}>
            <Gallery listing={listing.listing} />
          </Suspense>
          <div className="flex gap-5 bg-white rounded py-5 overflow-hidden">
            <div className="flex-1 flex-col gap-5 flex max-w-[809px]">
              <Suspense fallback={<PropertyOverviewSkeleton />}>
                <PropertyOverview listing={listing.listing} />
              </Suspense>
              <hr />
              <Suspense fallback={<DescriptionSkeleton />}>
                <Description listing={listing.listing} />
              </Suspense>
              <hr />
                  <Suspense fallback={<FeaturesSkeleton />}>
                    <Amenities listing={listing.listing} />
                  </Suspense>
                  <hr />
              <Suspense fallback={<LocationSkeleton />}>
                <Location listing={listing.listing} />
              </Suspense>
              <div className="xs:hidden flex justify-center">
                <Suspense fallback={<ContactCardSkeleton />}>
                  <ContactCard listing={listing.listing} />
                </Suspense>
              </div>
            </div>
            <div className="xs:block hidden">
              <Suspense fallback={<ContactCardSkeleton />}>
                <ContactCard listing={listing.listing} />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-24 flex justify-center">
          <div className="max-w-[1224px] w-full">
              <Suspense fallback={<SliderSkeleton />}>
                <CardSlider
                  title="Similar properties"
                  listings={similarProperties}
                />
              </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;

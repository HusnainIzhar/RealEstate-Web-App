"use client";
import React, { Suspense, lazy } from "react";
import Loader from "../../../components/ui/Loader"
import { MetaData } from "../../../utils/MetaData";
import { useParams } from "next/navigation";
import Wrapper from "../../../components/wrapper";

const Property = lazy(()=> import ("../../../components/Property/Main"));

type Props = {};

const Page = () => {
  const { propertyid }: any = useParams();
  return (
    <div>
      <MetaData
        title={`Property Details`}
        description="If you're interested in buying or investing in real estate in DHA Bahawalpur, look no further than EmarkRealty. Contact us today to start your real"
      ></MetaData>
      <Suspense fallback={<Loader/>}>
        <Wrapper component={
      <Property id={propertyid} />}></Wrapper>
      </Suspense>
    </div>
  );
};

export default Page;

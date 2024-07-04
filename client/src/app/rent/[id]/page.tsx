"use client";
import React, { Suspense, lazy } from "react";
import Loader from "../../../components/ui/Loader";
import { useSearchParams, usePathname } from "next/navigation";
import Wrapper from "../../../components/wrapper";
import { MetaData } from "../../../utils/MetaData";

const Main = lazy(() => import("../../../components/Rent/Main"));

type Props = {};

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("type");
  const path = usePathname();
  return (
    <>
      <MetaData
        title={`Properties on Rent`}
        description="If you're interested in buying or investing in real estate in DHA Bahawalpur, look no further than EmarkRealty. Contact us today to start your real"
      ></MetaData>
      <Suspense fallback={<Loader />}>
        <Wrapper
          component={
            <Main query={query} path={path} searchParams={searchParams} />
          }
        />
      </Suspense>
    </>
  );
};

export default Page;

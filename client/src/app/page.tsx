"use client";
import Home from "@/components/Home/Home";
import { MetaData } from "../utils/MetaData";
import Wrapper from "../components/wrapper";
import React, { Suspense, lazy } from "react";
import Loader from "../components/ui/Loader";


function page() {
  return (
    <>
      <div>
        <MetaData
          title="Emark Realty"
          description="If you're interested in buying or investing in real estate in DHA Bahawalpur, look no further than EmarkRealty. Contact us today to start your real"
        ></MetaData>
        <Suspense fallback={<Loader/>}>
        <Wrapper component={<Home />} />
        </Suspense>
      </div>
    </>
  );
}

export default page;

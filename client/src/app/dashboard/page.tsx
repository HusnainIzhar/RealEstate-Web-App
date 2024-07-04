"use client";
import Protected from "@/hooks/useProtected";
import { MetaData } from "../../utils/MetaData";
import { useSelector } from "react-redux";
import Wrapper from "../../components/wrapper";
import React, { Suspense, lazy } from "react";
import Loader from "../../components/ui/Loader";

const Dashboard = lazy(() => import("../../components/Dashboard/Main"));

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      <Protected>
        <MetaData
          title={`${user.name} Account`}
          description="If you're interested in buying or investing in real estate in DHA Bahawalpur, look no further than EmarkRealty. Contact us today to start your real"
        ></MetaData>
        <Suspense fallback={<Loader />}>
          <Wrapper component={<Dashboard />} />
        </Suspense>
      </Protected>
    </>
  );
};

export default Page;

import React, { Suspense, lazy } from "react";
import Loader from "../../components/ui/Loader";
import Wrapper from "../../components/wrapper";
import { MetaData } from "../../utils/MetaData";

const Main = lazy(() => import("../../components/Terms/Main"));

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <MetaData
        title={`Terms and Conditions`}
        description="If you're interested in buying or investing in real estate in DHA Bahawalpur, look no further than EmarkRealty. Contact us today to start your real"
      ></MetaData>
      <Suspense fallback={<Loader />}>
        <Wrapper component={<Main />} />
      </Suspense>
    </>
  );
};

export default Page;

import React, { Suspense, lazy } from "react";
import Wrapper from "../../components/wrapper";
import { MetaData } from "../../utils/MetaData";
import Loader from "../../components/ui/Loader";

const Main = lazy(() => import("../../components/About/Main"));

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <MetaData
        title={`About us`}
        description="If you're interested in buying or investing in real estate in DHA Bahawalpur, look no further than EmarkRealty. Contact us today to start your real"
      ></MetaData>
      <Suspense fallback={<Loader />}>
        <Wrapper component={<Main />} />
      </Suspense>
    </>
  );
};

export default Page;

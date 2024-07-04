import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";

type Props = {};

const Loader = (props: Props) => {
  return (
    <Wrapper
      component={
        <div className="h-full flex justify-center items-center">
          <div className="animate-spin"><Image
            src={"/er.svg"}
            height={50}
            width={50}
            alt="logo"
            className="animate-ping"
          /></div>
          
        </div>
      }
    />
  );
};

export default Loader;

import React, { FC } from "react";


type Props = {
 component:React.ReactNode
};

const Wrapper: FC<Props> = ({ component}) => {
  return (
    <>
      <div className="relative inset-0 bg-cover bg-center h-screen w-screen" style={{ backgroundImage: "url('/house.webp')" }}>
        <div className="wrapper h-full w-full bg-white/50 backdrop-blur-2xl overflow-auto">
          {component}
          </div>
      </div>
    </>
  );
};

export default Wrapper;

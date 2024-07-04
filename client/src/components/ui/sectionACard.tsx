import React, { FC ,useState,useEffect} from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  icon: string;
  title: string;
  description: string;
  button: string;
  flip?:boolean;
  link:string
};

const Test: FC<Props> = ({ icon, title, description, button,flip ,link}) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 600); 
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="px-5 xs:border-none border-b h-auto w-full xxs:px-28 xs:w-72  xs:border xs:rounded-xl text-center xs:flex-col items-center flex gap-3 justify-between xs:px-16 py-12">
        {(!isMobile || !flip) && (<div><Image src={icon} alt="hero" width={100} height={100} /></div>)}
        <div className="min-w-[128px] two text-center flex-col flex gap-3 items-center justify-between max-w-[158px]">
        <p className="xs:text-lg text-md font-medium">{title}</p>
        <p className="xs:text-sm text-xs ">{description}</p>
        <Link href={link}>        
        <button className="bg-[#1f1f29] px-3 py-3 text-white rounded xs:text-sm text-xs font-medium">
         {button}
        </button>
        </Link>
        </div>
        {isMobile && flip && <div className="one"><Image src={icon} alt="hero" width={100} height={100} className=""/></div>}
      </div>
    </>
  );
};

export default Test;

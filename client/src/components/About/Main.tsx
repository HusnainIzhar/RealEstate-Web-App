"use client";
import React ,{lazy}from "react";
import Footer from "../Footer";
import Image from "next/image";
import Loader from "../ui/Loader";

const NavBar = lazy (()=> import("../StickyNavBar"))

type Props = {};

const Main = (props: Props) => {
  if(!NavBar){
    return <Loader/>
  }
  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="flex-1 p-20 flex flex-col justify-center text-xl">
            <h2 className="font-semibold text-4xl text-center mb-16">About</h2>
            <p>Welcome to Emark Realty, your premier destination for all things real estate in Pakistan. Founded with a vision to redefine the real estate experience, we strive to connect buyers, sellers, landlords, and tenants in a seamless and transparent manner.
            </p>
            <br />
            <p>We are on a mission to revolutionize the real estate industry in Pakistan by leveraging cutting-edge technology, unparalleled market knowledge, and a customer-centric approach. Our goal is to empower individuals and businesses to make informed decisions and achieve their real estate goals efficiently.</p>
        </div>
        <div className="flex-1 hidden items-center justify-center xl:flex">
          <Image src={"/er.svg"} height={500} width={500} alt="logo" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;

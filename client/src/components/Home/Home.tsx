"use client";
import React, { lazy } from "react";
import Image from "next/image";
import Footer from "../Footer";

const StickyNavBar = lazy(() => import("../StickyNavBar"));
const SectionA = lazy(() => import("./section-A"));
const SearchBar = lazy(() => import("../SearchBar"));
const SectionB = lazy(() => import("./Section-B"));
const SectionC = lazy(() => import("./section-C"));

function Home() {
  return (
    <>
      <div className="h-full w-full font-Poppins">
        <StickyNavBar />
        <div className="h-[calc(100vh-80px)] flex">
          <div className="flex flex-1 flex-col gap-2 justify-center items-center px-5 sm:px-24 md:px-0 xl:items-start xl:mx-24">
            <p className="uppercase text-xl sm:text-2xl font-medium">
              Build your dream with us
            </p>
            <h1 className="capitalize font-medium text-5xl xxs:text-6xl [740px]:text-8xl text-center xl:text-left">
              Find your best smart real estate
            </h1>
            <p className="text-xl text-center md:text-left">
              Buy or rent properties at the most trusted online real estate
              portal
            </p>
            <SearchBar />
          </div>
          <div className="flex-1 items-center hidden justify-center xl:flex">
            <Image
              src={"/1234.jpg"}
              height={500}
              width={500}
              alt="image"
              className="drop-shadow-xl h-[500px] w-[500px] "
              style={{ borderRadius: "200px 50px 50px 200px/90px" }}
            ></Image>
          </div>
        </div>
        <div className="flex  flex-col gap-20 mt-20">
          <SectionA />
          <SectionB />
          <SectionC />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoLogoInstagram } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { LiaFacebookSquare } from "react-icons/lia";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full">
      <div className="w-full bg-[#1f1f29] text-white">
        <div className="flex px-[15vw] gap-12 py-8 xl:gap-72 flex-wrap">
          <div className="hidden flex-1 flex-col xs:flex gap-4 min-w-48">
            <Link href={"/"}>
              <Image src="/er-white.svg" alt="logo" width={30} height={30} />
            </Link>
            <p className="text-xs">
              &quot;Experience elevated Real Estate Services in DHA Bahawalpur
              with Emark Realty.If you’re interested in buying or investing in
              real estate in DHA Bahawalpur, look no further than Emark Realty.
              Contact us today to start your real estate journey with
              EmarkRealty.&quot;
            </p>
          </div>
          <div className="flex-1 flex justify-center xs:justify-between gap-4 flex-wrap xs:flex-nowrap">
            <div className="w-full flex-col items-center xs:items-start flex gap-4 xs:max-w-56">
              <p className="uppercase">Head Office</p>
              <Link href={"mailto:info@emarkrealty.com"}>
                <p className="flex items-center gap-2 text-xs">
                  <AiOutlineMail />
                  info@emarkrealty.com
                </p>
              </Link>
              <Link href={"tel:923006812612"}>
                <p className="flex items-center gap-2 text-xs">
                  <IoCallOutline />
                  923006812612
                </p>
              </Link>
              <Link
                href={
                  "https://www.google.com/maps/dir//Office+%23+9,+Al-Madina+Commercial+Centre,+Airport+Road,+near+Meezan+Bank,+Bahawalpur+Cantt,+Bahawalpur,+Punjab+63100/@29.3837097,71.6082128,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x86ddcc711d5b54bb:0xf05d4455a0485e8c!2m2!1d71.6906142!2d29.383735?entry=ttu"
                }
              >
                <p className="hidden xs:flex items-start gap-2  text-xs">
                  <HiOutlineLocationMarker className="text-xl" />
                  office #9 Al madina commercial center bahawalpur
                </p>
              </Link>
            </div>
            <div className="w-full flex-col items-center xs:items-start flex gap-4 xs:max-w-56">
              <p className="uppercase">Branch</p>
              <Link href={"tel:923007851854"}>
                <p className="flex items-center gap-2 text-xs">
                  <IoCallOutline />
                  923007851854
                </p>
              </Link>
              <Link
                href={
                  "https://www.google.com/maps/dir//Vehari+Road,+Canal+Bridge,+near+Ford+Wah,+Hasilpur,+63000/@29.7029447,72.4729698,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x393c571ef4237db5:0x7675c7a7245dedef!2m2!1d72.5553712!2d29.7029702?entry=ttu"
                }
              >
                <p className="hidden xs:flex items-start gap-2  text-xs">
                  <HiOutlineLocationMarker className="text-xl" />
                  Office #L5&B4, Sikandar Plaza Hasilpur
                </p>
              </Link>
            </div>
            <div className="flex-col flex gap-4">
              <p className="uppercase">Follow us</p>
              <p className="text-xs">yes we are social</p>
              <div className="flex gap-1">
                <Link href={"https://www.instagram.com/emarkrealty/"}>
                  <IoLogoInstagram />
                </Link>
                <Link href={"https://www.linkedin.com/company/emarkrealty/"}>
                  <CiLinkedin />
                </Link>
                <Link href={"https://twitter.com/emarkrealty?lang=en"}>
                  <FaXTwitter />
                </Link>{" "}
                <Link href={"https://www.youtube.com/channel/UCy7wTpp_ciI9szFYTQgJ0_Q/videos"}>
                  <CiYoutube />
                </Link>{" "}
                <Link href={"https://www.facebook.com/EmarkRealty/"}>
                  <LiaFacebookSquare />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-col flex items-center text-xs py-2 justify-center gap-1">
        <p className="flex gap-2 text-[0.7rem]">
          <a href="/about">About us</a>|
          <a href="/terms">Terms &amp; Conditions</a>
        </p>
        <p className="text-[0.7rem]">
          Copyright 2024 EmarkRealty.com All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

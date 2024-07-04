import React, { FC, useState } from "react";
import { IUser } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { TbHomeCheck } from "react-icons/tb";
import { TbHomeHand } from "react-icons/tb";
import { TiKeyOutline } from "react-icons/ti";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";

type Props = {
  activeAlert: () => void;
  user: IUser;
  handleLogout: () => void;
  closeMenu: () => void;
};

const Hamburger: FC<Props> = ({
  activeAlert,
  user,
  handleLogout,
  closeMenu,
}) => {
  const [menuClicked, setMenuClicked] = useState("");
  return (
    <div className="fixed text-white z-30 top-0 left-0 w-full h-full bg-[#1f1f29]">
      <div className=" flex justify-between px-10 mt-10 text-xl xxxs:text-4xl items-center">
        <Link href={"/"}>
          <h1 className=" font-semibold flex items-center gap-2">
            <Image src={"/er-white.svg"} alt="logo" width={30} height={30} />
            EmarkRealty
          </h1>
        </Link>
        <RxCross2 onClick={closeMenu} className="cursor-pointer" />
      </div>
      <div className="flex flex-col gap-8 text-lg xxxs:text-xl mt-10 px-10">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => {
            menuClicked === "buyers"
              ? setMenuClicked("")
              : setMenuClicked("buyers");
          }}
        >
          <p className="flex gap-5 items-center cursor-pointer">
            <TbHomeHand className="text-3xl" />
            For Buyers
          </p>
          {menuClicked === "buyers" ? (
            <MdKeyboardArrowDown className="text-3xl" />
          ) : (
            <MdKeyboardArrowRight className="text-3xl" />
          )}
        </div>
        {menuClicked === "buyers" && (
          <div className=" text-sm flex flex-col gap-4 px-12 cursor-pointer">
            <a href="/sale/properties?type=residential" onClick={closeMenu}>Buy a residential</a>
            <a href="/sale/properties?type=commercial" onClick={closeMenu}>Buy a commercial</a>
            <a href="/sale/properties?type=plot" onClick={closeMenu}>Buy a plot</a>
          </div>
        )}
        <div
          className="flex items-center justify-between"
          onClick={() => {
            menuClicked === "tenants"
              ? setMenuClicked("")
              : setMenuClicked("tenants");
          }}
        >
          <p className="flex gap-5 items-center cursor-pointer">
            <TiKeyOutline className="text-3xl" />
            For Tenants
          </p>
          {menuClicked === "tenants" ? (
            <MdKeyboardArrowDown className="text-3xl" />
          ) : (
            <MdKeyboardArrowRight className="text-3xl" />
          )}
        </div>
        {menuClicked === "tenants" && (
          <div className="text-sm flex flex-col gap-4 px-12 cursor-pointer">
            <a onClick={closeMenu} href="/rent/properties?type=residential">
              Residential property on rent
            </a>
            <a onClick={closeMenu} href="/rent/properties?type=commercial">
              Commercial property on rent
            </a>
          </div>
        )}

        <div
          className="flex items-center justify-between"
          onClick={() => {
            menuClicked === "owners"
              ? setMenuClicked("")
              : setMenuClicked("owners");
          }}
        >
          <p className="flex gap-5 items-center cursor-pointer">
            <TbHomeCheck className="text-3xl" />
            For Owners
          </p>
          {menuClicked === "owners" ? (
            <MdKeyboardArrowDown className="text-3xl" />
          ) : (
            <MdKeyboardArrowRight className="text-3xl" />
          )}
        </div>
        {menuClicked === "owners" && (
          <div className="text-sm flex flex-col gap-4 px-12 cursor-pointer">
            <a href="/dashboard">Sell a property</a>
            <a href="/dashboard">Rentout a property</a>
          </div>
        )}
      </div>
      {user && (
        <div className="flex flex-col gap-8 text-xl px-10 mt-8">
          <Link href="/dashboard">
            {" "}
            <p onClick={closeMenu} className="flex gap-5 items-center">
              <MdOutlineAccountCircle className="text-3xl" />
              My account
            </p>
          </Link>

          <p  className="flex gap-5 items-center cursor-pointer" onClick={()=>{handleLogout();closeMenu()}}>
            <MdOutlineLogout className="text-3xl" />
            Sign out
          </p>
        </div>
      )}
      {!user && (
        <button
          onClick={() => {
            activeAlert();
            closeMenu();
          }}
          className="cursor-pointer text-xl px-5 py-2 font-medium mx-10 mt-8 bg-white text-[#1f1f29] rounded"
        >
          Login/Signup
        </button>
      )}
    </div>
  );
};

export default Hamburger;

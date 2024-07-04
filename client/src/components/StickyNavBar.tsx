import React, { FC, useState, useEffect, lazy, Suspense } from "react";
import Hamburger from "./Hamburger";
import { styles } from "../Styles/style";
import { useSelector } from "react-redux";
import Popup from "../components/Signup-login/Main";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { HiMenuAlt4 } from "react-icons/hi";
import Link from "next/link";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "../redux/features/auth/authAPI";
const Icon = lazy(() => import("./Signup-login/LoggedInIcon"));
type Props = {};

const StickyNavbar: FC<Props> = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const { data } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  const [logout, setLogout] = useState(false);
  const [menu, setMenu] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout,
  });

  const toggleAlert = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = async () => {
    setLogout(true);
    await signOut();
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1060);
  };
  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
        });
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfully");
      }
    }
  }, [data, user, isSuccess, socialAuth]);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [isDropdownVisible3, setIsDropdownVisible3] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  type DropdownItem = {
    src: string;
    title: string;
  };

  function generateDropdown(items: DropdownItem[]) {
    return (
      <div className="z-20 dropdown origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div
          className="py-2 p-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-button"
        >
          {items.map((item, index) => (
            <a
              href={item.src}
              key={index}
              className="block px-4 py-2 mb-1 text-xs text-gray-700 rounded-md bg-white hover:bg-gray-100"
              role="menuitem"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>  
    <div>
      {isOpen && <Popup closeAlert={toggleAlert}></Popup>}
      {menu && (
        <Hamburger
          handleLogout={handleLogout}
          activeAlert={toggleAlert}
          user={user}
          closeMenu={() => setMenu(false)}
        />
      )}
      <div className="relative w-full  flex items-center px-[9vw] h-20 justify-center border-b-[0.2pt] border-[#b9b9b9]">
        <Link href={"/"}>
          <h1 className="cursor-pointer text-2xl text-[#1f1f29] font-semibold flex items-center gap-2">
            <Image src={"/er.svg"} alt="logo" width={30} height={30} />
            EmarkRealty
          </h1>
        </Link>
        {isMobile ? (
          <div className="flex items-center">
            <HiMenuAlt4
              className=" absolute right-10 text-3xl cursor-pointer"
              onClick={() => setMenu(true)}
            />
          </div>
        ) : (
          <>
            <ul
              className={`hidden lgg:flex gap-5 text-lg items-center text-[#1f2929] font-Poppins justify-center flex-1 px-8 text-[16px] font-medium`}
            >
              <li
                className={`relative  cursor-pointer py-2`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                For Buyers
                {isDropdownVisible &&
                  generateDropdown([
                    {
                      title: "Buy a residential",
                      src: "/sale/properties?type=residential",
                    },
                    {
                      title: "Buy a commercial",
                      src: "/sale/properties?type=commercial",
                    },
                    { title: "Buy a plot", src: "/sale/properties?type=plot" },
                  ])}
              </li>
              <li
                className={`  cursor-pointer py-2`}
                onMouseEnter={() => setIsDropdownVisible2(true)}
                onMouseLeave={() => setIsDropdownVisible2(false)}
              >
                For Tenants
                {isDropdownVisible2 &&
                  generateDropdown([
                    {
                      title: "Residential property on rent",
                      src: "/rent/properties?type=residential",
                    },
                    {
                      title: "Commercial property on rent",
                      src: "/rent/properties?type=commercial",
                    },
                  ])}
              </li>
              <li
                className={`  cursor-pointer py-2 `}
                onMouseEnter={() => setIsDropdownVisible3(true)}
                onMouseLeave={() => setIsDropdownVisible3(false)}
              >
                For Owners
                {isDropdownVisible3 &&
                  generateDropdown([
                    { title: "Sell a property", src: "/dashboard" },
                    { title: "Rentout a property", src: "/dashboard" },
                  ])}
              </li>
            </ul>
            <div className="hidden lgg:flex gap-5 items-center mr-[2vw]">
              {user && !isMobile ? (
                <Suspense
                  fallback={
                    <div className="h-8 w-8 rounded-full bg-[#bbbbbb] animate-pulse"></div>
                  }
                >
                  <Icon user={user} logout={handleLogout} />
                </Suspense>
              ) : (
                <button
                  className={`${styles.BlackButton}`}
                  onClick={toggleAlert}
                >
                  Login
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  
  );
};

export default StickyNavbar;

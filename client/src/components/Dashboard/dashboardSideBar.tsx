import { FormState } from "@/types/types";
import React, { FC } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { MdOutlineEditLocation } from "react-icons/md";
import { PiUserGear } from "react-icons/pi";
import { GrPowerShutdown } from "react-icons/gr";
import { IoChevronBack } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { GoHome } from "react-icons/go";
type Props = {
  setRoute: (route: string) => void;
  setActiveLink: (route: string) => void;
  activeLink: string;
  logoutHandler: () => void;
  setForm: (form: any) => void;
  initialFormState: FormState;
  isMobile: boolean;
};

const DashboardSideBar: FC<Props> = ({
  setRoute,
  setActiveLink,
  activeLink,
  logoutHandler,
  setForm,
  initialFormState,
  isMobile,
}) => {
  const handleClick = (route: string) => {
    setActiveLink(route);
    setRoute(route);
  };
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (show && !event.target.closest(".dropdown")) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <nav
          className={` bg-white shadow-xl rounded-lg  ${
            isMobile
              ? "  flex items-center p-2 gap-1 w-[265px] flex-wrap"
              : "px-2 py-10 flex flex-col  h-[96%] text-2xl  gap-5"
          }`}
        >
          {isMobile && (
            <a
              href="/"
              className="justify-center h-20 w-20 flex flex-col gap-1 items-center hover:cursor-pointer"
            >
              <GoHome className="text-2xl" />
              <p className="text-[10px] font-medium">Home</p>
            </a>
          )}
          <a
            onClick={() => handleClick("dashboard")}
            className={` hover:cursor-pointer ${
              isMobile
                ? "flex flex-col gap-1 items-center h-20 w-20 justify-center"
                : "p-2"
            } ${
              activeLink === "dashboard" &&
              "bg-[#1f1f29] rounded-lg text-white "
            }`}
          >
            <LuLayoutDashboard className={`${isMobile && "text-2xl"}`} />
            {isMobile && <p className="text-[10px] font-medium">Dashboard</p>}
          </a>
          <a
            onClick={() => {
              handleClick("property");
              setForm(initialFormState);
            }}
            className={` hover:cursor-pointer ${
              isMobile
                ? "flex flex-col gap-1 items-center h-20 w-20 justify-center"
                : "p-2"
            } ${
              activeLink === "property" &&
              " bg-[#1f1f29] rounded-lg  text-white"
            }`}
          >
            <MdOutlineAddLocationAlt className={`${isMobile && "text-2xl"}`} />
            {isMobile && (
              <p className="text-[10px] font-medium">Add Property</p>
            )}
          </a>
          <a
            onClick={() => handleClick("manage")}
            className={` hover:cursor-pointer ${
              isMobile
                ? "flex flex-col gap-1 items-center h-20 w-20 justify-center"
                : "p-2"
            } ${
              activeLink === "manage" && " bg-[#1f1f29] rounded-lg text-white"
            }`}
          >
            <MdOutlineEditLocation className={`${isMobile && "text-2xl"}`} />
            {isMobile && <p className="text-[10px] font-medium">Manage</p>}
          </a>
          <a
            onClick={() => handleClick("profile")}
            className={` hover:cursor-pointer ${
              isMobile
                ? "flex flex-col gap-1 items-center h-20 w-20 justify-center"
                : "p-2"
            } ${
              activeLink === "profile" && "bg-[#1f1f29] rounded-lg  text-white"
            }`}
          >
            <PiUserGear className={`${isMobile && "text-2xl"}`} />
            {isMobile && <p className="text-[10px] font-medium">Profile</p>}
          </a>
          <a
            onClick={() => logoutHandler()}
            className={` hover:cursor-pointer ${
              isMobile
                ? "flex flex-col gap-1 items-center h-20 w-20 justify-center"
                : "mt-96 p-2"
            } ${
              activeLink === "logout" && "bg-[#1f1f29] rounded-lg  text-white"
            }`}
          >
            <GrPowerShutdown className={`${isMobile && "text-2xl"}`} />
            {isMobile && <p className="text-[10px] font-medium">Signout</p>}
          </a>
        </nav>
      </div>
    </>
  );
};

export default DashboardSideBar;

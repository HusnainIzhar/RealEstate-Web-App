import React, { FC, useEffect, useState, lazy, Suspense } from "react";
import DashboardMenu from "./dashboardMenu";
import DashSideBar from "./dashboardSideBar";
import PropertyPreview from "./propertyPreview";
import DashRightSide from "./dashRightSide";
import ChangePassword from "./changePassword";
import Alert from "../ui/Modal";
import Amenities from "./amenities";
import { useLogoutQuery } from "../../redux/features/auth/authAPI";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import CoverImage from "./coverImage";
import { FormState, IListing } from "../../types/types";
import Loader from "../../components/ui/Loader";
import ManagePropSkel from "../Skeletons/ManagePropSkeleton";
import PropSkel from "../Skeletons/PropertyFormSkeleton";
import ProfileSettingSkeleton from "../Skeletons/profileSettingSkeleton";
import { CgMenuGridO } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import * as yup from "yup";
import { useFormik } from "formik";

const ListingsMenu = lazy(() => import("./Form/propertyForm"));
const ManageProperties = lazy(() => import("./manageProperties"));
const ProfileMenu = lazy(() => import("./profileMenu"));

type Props = {};

const Main: FC<Props> = () => {
  const [route, setRoute] = useState("dashboard");
  const [activeLink, setActiveLink] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [activeCover, setActiveCover] = useState(false);
  const [formEditMode, setFormEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [loader, setLoader] = useState(false);
  const [menuGrid, setMenuGrid] = useState(false);
  const { } = useLogoutQuery(undefined, {
    skip: !logout,
  });


  const initialFormState: FormState = {
    purpose: "",
    propertyType: "residential",
    subPropertyType: "",
    city: "",
    location: "",
    area: {
      type: "marla",
      size: 0,
    },
    price: 0,
    bedrooms: "",
    bathrooms: "",
    features: [],
    title: "",
    description: "",
    contact: user?.profile.mobile || 92,
    whatsapp: user?.profile.whatsapp || 92,
    name: user?.name || "",
    images: [],
    coverImage: 0,
  };
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1060); // Adjust breakpoint as needed
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditListing = (id: string) => {
    const listingExist: IListing = user.listings.find(
      (listing: IListing) => listing._id === id
    );
    if (listingExist) {
      const images = listingExist.images.map((image) => image.url);

      setEditId(id);
      setFormEditMode(true);
      setForm((prevForm) => ({
        ...prevForm,
        purpose: listingExist.purpose,
        propertyType: listingExist.propertyType,
        subPropertyType: listingExist.subPropertyType,
        city: listingExist.city,
        location: listingExist.location,
        area: {
          type: listingExist.area.type,
          size: listingExist.area.size,
        },
        price: listingExist.price,
        bedrooms: listingExist.bedrooms,
        bathrooms: listingExist.bathrooms,
        features: listingExist.features,
        title: listingExist.title,
        description: listingExist.description,
        contact: listingExist.contact,
        whatsapp: listingExist.whatsapp,
        name: listingExist.name,
        images: listingExist.images,
        coverImage: listingExist.coverImage,
      }));
    }
  };

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  const handleButton = (btnType: string, btnValue: string) => {
    setForm((prevForm) => {
      let newFeatures = [...prevForm.features];
      if (btnValue === "0") {
        newFeatures = newFeatures.filter((feature) => feature.type !== btnType);
      } else if (
        newFeatures.some(
          (feature) => feature.type === btnType && feature.value === btnValue
        )
      ) {
        newFeatures = newFeatures.filter((feature) => feature.type !== btnType);
      } else if (newFeatures.some((feature) => feature.type === btnType)) {
        newFeatures = newFeatures.map((feature) =>
          feature.type === btnType
            ? { type: btnType, value: btnValue }
            : feature
        );
      } else {
        newFeatures = [...newFeatures, { type: btnType, value: btnValue }];
      }
      return { ...prevForm, features: newFeatures };
    });
  };

  const handleReset = () => {
    setForm((prevForm) => ({
      ...prevForm,
      features: [],
    }));
  };

  const handleRemoveTag = (tagToRemove: string, valueToRemove: string) => {
    setForm((prevForm) => {
      const newFeatures = prevForm.features.filter(
        (feature) =>
          !(feature.type === tagToRemove && feature.value === valueToRemove)
      );
      return { ...prevForm, features: newFeatures };
    });
  };

  const handleCoverImage = (index: number) => {
    setForm((prevForm) => {
      return { ...prevForm, coverImage: index };
    });
  };

  const toggleAlert = () => {
    setIsOpen(!isOpen);
  };

  const toggleCover = () => {
    setActiveCover(!activeCover);
  };

  return (
    <>
      {loader && <Loader />}
      <div className="first h-full">
        <div className="relative h-screen w-full flex justify-center items-center overflow-hidden font-Poppins">
          <div className="flex h-full w-full flex-wrap justify-center ">
            {isOpen && (
              <Alert
                closeAlert={toggleAlert}
                component={
                  <Amenities
                    toggleAlert={toggleAlert}
                    handleAllTags={handleButton}
                    allTags={form.features}
                    removeTags={handleRemoveTag}
                    handleReset={handleReset}
                  />
                }
                heading="Features and Amenities"
              />
            )}
            {activeCover && (
              <Alert
                closeAlert={toggleCover}
                component={
                  <CoverImage
                    form={form}
                    handleCoverImage={handleCoverImage}
                    close={toggleCover}
                  />
                }
                heading="Set Cover Image"
              />
            )}
            <div className={`${isMobile ? "hidden" : "h-full w-[80px]"} `}>
              <DashSideBar
                setRoute={setRoute}
                setActiveLink={setActiveLink}
                activeLink={activeLink}
                logoutHandler={logoutHandler}
                setForm={setForm}
                initialFormState={initialFormState}
                isMobile={isMobile}
              />
            </div>

            <div className={`relative flex-1 h-full`}>
              <div
                className={`flex justify-center items-center h-full ${isMobile && "mx-1 w-screen"
                  } `}
              >
                <div className="w-[98%] flex flex-col gap-5 p-5 h-[96%] bg-white shadow-xl rounded-lg relative">
                  <h1 className="text-xl border-b pb-3 border-zinc-400">
                    {route === "dashboard" && "Dashboard"}
                    {route === "property" && "Upload your listing details"}
                    {route === "profile" && "Profile Settings"}
                    {route === "manage" && "Manage Listings"}
                    {route === "password" && "Change Password"}
                    {route === "edit-listing" && "Edit Listing"}
                  </h1>
                  <div className="w-full overflow-auto">
                    {route === "dashboard" && <DashboardMenu user={user} />}

                    {route === "property" && (
                      <>
                        <Suspense fallback={<PropSkel />}>
                          <ListingsMenu
                            activeAlert={toggleAlert}
                            activeCover={toggleCover}
                            rmTags={handleRemoveTag}
                            form={form}
                            setForm={setForm}
                            initialFormState={initialFormState}
                            setLoader={setLoader}
                          />
                        </Suspense>
                      </>
                    )}
                    {route === "profile" && (
                      <Suspense fallback={<ProfileSettingSkeleton />}>
                        <ProfileMenu user={user} setRoute={setRoute} />
                      </Suspense>
                    )}
                    {route === "manage" && (
                      <Suspense fallback={<ManagePropSkel />}>
                        <ManageProperties
                          user={user}
                          setRoute={setRoute}
                          handleEditListing={handleEditListing}
                        />
                      </Suspense>
                    )}
                    {route === "password" && (
                      <ChangePassword setRoute={setRoute} />
                    )}
                    {route === "edit-listing" && (
                      <>
                        <Suspense
                          fallback={
                           <PropSkel />
                          }
                        >
                          <ListingsMenu
                            activeAlert={toggleAlert}
                            activeCover={toggleCover}
                            rmTags={handleRemoveTag}
                            form={form}
                            setForm={setForm}
                            initialFormState={initialFormState}
                            formEditMode={formEditMode}
                            editId={editId}
                            setLoader={setLoader}
                          />
                        </Suspense>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                onClick={() => setMenuGrid(!menuGrid)}
                className={`${isMobile ? "flex" : "hidden"
                  } cursor-pointer absolute right-0 top-1/2 translate-y-1/2 p-1 w-14 rounded bg-[#1f1f29] text-white items-center justify-start text-2xl`}
              >
                {menuGrid ? <RxCross2 /> : <CgMenuGridO />}
              </div>
              {menuGrid && isMobile && (
                <div
                  onClick={() => setMenuGrid(false)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full bg-black/30"
                >
                  <DashSideBar
                    setRoute={setRoute}
                    setActiveLink={setActiveLink}
                    activeLink={activeLink}
                    logoutHandler={logoutHandler}
                    setForm={setForm}
                    initialFormState={initialFormState}
                    isMobile={isMobile}
                  />
                </div>
              )}
            </div>
            <div className="h-full w-[25vw] hidden xl:block">
              {route === "property" ? (
                <PropertyPreview />
              ) : (
                <DashRightSide
                  setRoute={setRoute}
                  setActiveLink={setActiveLink}
                  setForm={setForm}
                  initialFormState={initialFormState}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

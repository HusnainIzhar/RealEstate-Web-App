import React, { FC, ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";
import { styles } from "../../Styles/style";

interface AlertProps {
  component?: ReactNode;
  closeAlert?: () => void;
  heading?: string;
}

const Alert: FC<AlertProps> = ({ component, closeAlert, heading }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    if (wrapper) {
      wrapper.classList.add("modal-open");
    }

    return () => {
      if (wrapper) {
        wrapper.classList.remove("modal-open");
      }
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 600);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={`${styles.popup}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeAlert && closeAlert();
        }
      }}
    >
      <div
        className={`${styles.popupContent} ${!isMobile && "rounded-xl"} ${isMobile && "w-screen h-full"
          } transition-all`}
      >
        <div
          className={`flex items-center justify-between ${heading && "border-b border-zinc-400 py-2"
            }`}
        >
          <p className="text-xl">{heading}</p>
          <RxCross2
            className="text-zinc-500 text-[24px] place-self-end"
            onClick={closeAlert}
          />
        </div>
        <div className="overflow-auto flex justify-center h-full items-center">
          {component}
        </div>
      </div>
    </div>
  );
};

export default Alert;

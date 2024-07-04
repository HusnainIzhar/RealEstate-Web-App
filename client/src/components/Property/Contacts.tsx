import React, { FC } from "react";
import { MdOutlineAddIcCall } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io5";
import Link from "next/link";

type Props = {
  telephone?: string;
  whatsapp?: string;
};

const Contacts: FC<Props> = ({ telephone, whatsapp }) => {
  return (
    <div className="flex flex-col gap-5">
      {telephone && (
        <Link href={`tel:${telephone}`}>
          <div className="bg-[#1f1f29] p-2 rounded-full text-white h-16 w-16 flex items-center justify-center text-3xl">
            <MdOutlineAddIcCall />
          </div>
        </Link>
      )}

      {whatsapp && (
        <Link href={`https://wa.me/${whatsapp}`}>
          <div className="bg-[#4da266] p-2 rounded-full text-white h-16 w-16 flex items-center justify-center text-4xl">
            <IoLogoWhatsapp />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Contacts;

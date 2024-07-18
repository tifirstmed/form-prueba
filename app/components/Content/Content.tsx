"use client";
import RegisterForm from "@/app/components/Form/RegisterForm";
import Image from "next/image";
import { useState } from "react";
import Terms from "../Terms/Terms";

const Content = () => {
  const [viewModal, setViewModal] = useState(false);

  return (
    <>
      <div className="w-full bg-white h-[54px] lg:h-[107px]">
        <div className="ml-[28px] lg:ml-[45px] lg:mt-[25px] mt-[8px]">
          <div className="hidden lg:block">
            <Image
              src="/images/logo.png"
              alt="Imagen Logo"
              width={156.26}
              height={46}
            />
          </div>
          <div className="block lg:hidden">
            <Image
              src="/images/logo.png"
              alt="Imagen Logo"
              width={88}
              height={25.91}
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#E3E3E2] flex flex-col lg:flex-row h-full justify-center items-center">
        <div
          className="w-[60%] h-[60%] lg:w-[100%] lg:h-[100%]"
          style={{ position: "relative" }}
        >
          <Image
            className="object-cover md:object-contain"
            src="/images/image.jpg"
            alt="Imagen Dormilon"
            fill
            priority
          />
        </div>
        <div className="flex justify-center lg:justify-start items-center w-full">
          <RegisterForm viewModal={viewModal} setViewModal={setViewModal} />
        </div>
      </div>
      {viewModal && <Terms viewModal={viewModal} setViewModal={setViewModal} />}
    </>
  );
};

export default Content;

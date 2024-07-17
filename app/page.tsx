import React from "react";
import RegisterForm from "./components/Form/RegisterForm";
import Image from "next/image";

const page = () => {
  return (
    <main className="flex flex-col justify-center items-center w-full h-dvh">
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
          className="w-[50%] h-[50%] lg:w-[100%] lg:h-[100%]"
          style={{ position: "relative" }}
        >
          <Image
            className="object-cover md:object-contain"
            src="/images/image.jpg"
            alt="Imagen Dormilon"
            fill
          />
        </div>
        <div className="flex items-center w-full">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

export default page;

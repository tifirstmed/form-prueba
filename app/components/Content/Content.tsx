'use client';
import RegisterForm from '@/app/components/Form/RegisterForm';
import Image from 'next/image';
import { useState } from 'react';
import Terms from '../Terms/Terms';
import Tiktok from '../assets/Tiktok';
import Youtube from '../assets/Youtube';
import Instagram from '../assets/Instagram';
import Facebook from '../assets/Facebook';
import Linkedin from '../assets/Linkedin';

const Content = () => {
  const [viewModal, setViewModal] = useState(false);

  return (
    <>
      <div className="w-full bg-white h-[54px] lg:h-[107px] flex justify-between">
        <div className="ml-[30px] lg:ml-[45px] lg:mt-[25px] mt-[8px]">
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
              width={100}
              height={31.91}
            />
          </div>
        </div>
        <div className="flex gap-x-1 md:gap-x-3 items-center mr-[30px] lg:mr-20">
          <a
            className="border border-black rounded-full p-1 lg:p-2"
            href="https://www.tiktok.com/@firstmedperu"
            target="_blank"
          >
            <Tiktok />
          </a>
          <a
            className="border border-black rounded-full p-1 lg:p-2"
            href="https://www.youtube.com/@FirstmedPeru"
            target="_blank"
          >
            <Youtube />
          </a>

          <a
            className="border border-black rounded-full p-1 lg:p-2"
            href="https://www.instagram.com/firstmedperu/"
            target="_blank"
          >
            <Instagram />
          </a>

          <a
            className="border border-black rounded-full p-1 lg:p-2"
            href="https://www.facebook.com/firstmedperu"
            target="_blank"
          >
            <Facebook />
          </a>

          <a
            className="border border-black rounded-full p-1 lg:p-2"
            href="https://www.linkedin.com/company/firstmedperu/"
            target="_blank"
          >
            <Linkedin />
          </a>
        </div>
      </div>
      <div className="w-full bg-[#E3E3E2] flex flex-col lg:flex-row h-full justify-center items-center">
        <div className="w-full h-3/4 sm:h-1/2 lg:h-full flex justify-center items-center lg:hidden">
          <Image
            className="object-contain"
            src="/images/image.jpg"
            alt="Imagen Dormilon"
            width={375}
            height={329}
            priority
          />
        </div>
        <div className="w-full h-3/4 sm:h-1/2 lg:h-full lg:flex justify-center items-center hidden">
          <Image
            className="object-contain"
            src="/images/image.jpg"
            alt="Imagen Dormilon"
            width={621}
            height={531}
            priority
          />
        </div>
        <div className="flex justify-center lg:justify-start lg:items-center w-full h-1/4 sm:h-1/2 lg:h-full">
          <RegisterForm viewModal={viewModal} setViewModal={setViewModal} />
        </div>
      </div>
      {viewModal && <Terms viewModal={viewModal} setViewModal={setViewModal} />}
    </>
  );
};

export default Content;

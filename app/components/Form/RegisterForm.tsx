"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "./userScheema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initFacebookPixel } from "@/app/utils/facebookPixel";
import { trackFacebookEvent } from "@/app/utils/facebookPixel";
import { initGA, logPageView } from "@/app/utils/ga";
import { logEvent } from "@/app/utils/ga";
import { RegisterFormProps } from "./RegisterForm.type";
import CompletedForm from "../CompletedForm/CompletedForm";

type User = {
  name: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  description: string;
  acceptTerms: boolean;
};

let isFacebookPixelInitialized = false;

const RegisterForm: React.FC<RegisterFormProps> = ({
  viewModal,
  setViewModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: User) => {
    const formattedData = {
      name: data.name,
      lastName: data.lastname,
      phone: `+51 ${data.phoneNumber}`, // Asegurarse de que el número de teléfono esté correctamente formateado
      email: data.email,
      description: data.description,
    };
    trackFacebookEvent("Lead", formattedData);
    try {
      const response = await fetch("/api/create-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.status === 200) {
        // Llama al evento 'CompleteRegistration' de Facebook Pixel
        trackFacebookEvent("CompleteRegistration");
        logEvent("Form", "Submit");
        setFormCompleted(true);
        console.log("Datos enviados correctamente a Bitrix24");
        // Aquí podrías redirigir o mostrar un mensaje de éxito
      } else {
        console.log("Error al enviar los datos a Bitrix24");
        // Manejar el caso de error según sea necesario
      }
    } catch (error) {
      console.log(error);
    }

    const formattedDataTrack = {
      name: formattedData.name,
      email: formattedData.email,
      phone: formattedData.phone,
    };
    try {
      const response_track = await fetch("/api/track-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedDataTrack),
      });

      const data_track = await response_track.json();
      console.log("Success:", data_track);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const router = useRouter();

  useEffect(() => {
    initGA();
    logPageView();
    if (!isFacebookPixelInitialized) {
      // Inicializa el píxel de Facebook solo una vez
      initFacebookPixel();
      isFacebookPixelInitialized = true;

      // Envía el evento de vista de contenido
      trackFacebookEvent("ViewContent");

      // Realiza la solicitud al endpoint /api/track-event-view
      const trackEventView = async () => {
        try {
          const response_track = await fetch("/api/track-event-view", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data_track = await response_track.json();
          console.log("Success registrada Vista!:", data_track);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      trackEventView();
    }

    // Función para suscribirse a cambios de ruta
    const subscribeToRouteChanges = () => {
      router.push("/");
    };

    // Llama a la función de suscripción al cargar la aplicación
    subscribeToRouteChanges();

    // Limpia el listener cuando el componente se desmonta
    return () => {
      // No es necesario limpiar el listener en este caso
    };
  }, [router]);

  const [formCompleted, setFormCompleted] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[576px] h-[476px] md:h-[607px] w-full bg-[#FFFFFF] rounded-lg font-sans relative"
    >
      <div className="h-[26px] md:h-[38px] bg-black w-full md:w-[574px] flex justify-center items-center lg:rounded-t-lg">
        <h1 className="text-white font-semibold text-base md:text-xl text-center">
          DORMILON M
        </h1>
      </div>
      <div className="mt-[28px] md:mt-[50px] flex flex-col w-[318px] sm:w-[540px] mx-auto sm:ml-8 md:ml-9 xl:ml-[40px]">
        <p className="text-[16px] sm:text-[26px] text-[#6CA936] font-normal leading-5 mb-0">
          Deja tus datos y
        </p>
        <p className="text-[16px] sm:text-[26px] text-[#6CA936] font-semibold leading-6 mt-0">
          te contactaremos en breves minutos
        </p>
      </div>
      <div className="flex flex-col items-center space-y-2 md:space-y-3 ml-[30px] mr-[30px] md:mx-10">
        <div className="flex flex-col lg:flex-row justify-center items-center w-full mt-[28px] lg:mt-[38px] md:gap-x-[10px] h-[64px] lg:h-[38px] gap-y-2">
          <div className="flex flex-col h-[32px] md:h-[38px] w-[310px] sm:w-full lg:w-[242px]">
            <input
              placeholder="Nombres"
              className="border border-black px-2 rounded-[10px] focus:outline-black h-[32px] lg:h-full text-sm md:text-base"
              id="name"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col h-[32px] lg:h-[38px] w-[310px] sm:w-full lg:w-[242px]">
            <input
              placeholder="Apellidos"
              className="border border-black px-2 rounded-[10px] focus:outline-black h-[32px] lg:h-full text-sm md:text-base"
              id="lastname"
              {...register("lastname")}
            />
            {errors.lastname && (
              <span className="text-red-500 text-xs">
                {errors.lastname.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col h-[32px] lg:h-[38px] w-[310px] sm:w-full">
          <input
            placeholder="Celular"
            className="border border-black px-2 rounded-[10px] focus:outline-black h-[32px] md:h-full text-sm md:text-base"
            id="phoneNumber"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-xs">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <div className="flex flex-col h-[32px] lg:h-[38px] w-[310px] sm:w-full">
          <input
            placeholder="Correo electrónico"
            className="border border-black px-2 rounded-[10px] focus:outline-black h-[32px] md:h-full text-sm md:text-base"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col w-[310px] sm:w-full">
          <textarea
            placeholder="¿Qué desea tratar?"
            rows={5}
            className="border border-black px-2 rounded-[10px] focus:outline-black resize-none text-sm md:text-base"
            id="description"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-[310px] sm:w-full">
          <label
            className="text-[11px] md:text-sm flex gap-2"
            htmlFor="acceptTerms"
          >
            <input
              id="acceptTerms"
              type="checkbox"
              {...register("acceptTerms")}
            />
            <div className="flex">
              <p>Al enviar,</p>
              <p
                onClick={() => {
                  setViewModal(true);
                }}
                className="underline cursor-pointer"
              >
                acepto las políticas de Privacidad
              </p>
            </div>
          </label>
          {errors.acceptTerms && (
            <span className="text-red-500 text-xs">
              {errors.acceptTerms.message}
            </span>
          )}
        </div>
        <button
          className="w-[310px] sm:w-full h-10 bg-[#6CA936] text-[#FFFFFF] font-semibold rounded-[10px] text-center text-sm md:text-base"
          type="submit"
        >
          ENVIAR
        </button>
      </div>
      {formCompleted && <CompletedForm formCompleted={formCompleted} />}
    </form>
  );
};

export default RegisterForm;

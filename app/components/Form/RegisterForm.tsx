"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "./userScheema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { initFacebookPixel } from "@/app/utils/facebookPixel";
import { trackFacebookEvent } from "@/app/utils/facebookPixel";
import { initGA, logPageView } from "@/app/utils/ga";
import { logEvent } from "@/app/utils/ga";

type User = {
  name: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  description: string;
  acceptTerms: boolean;
};

let isFacebookPixelInitialized = false;

const RegisterForm: React.FC = () => {
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
        console.log("Datos enviados correctamente a Bitrix24");
        // Aquí podrías redirigir o mostrar un mensaje de éxito
      } else {
        console.log("Error al enviar los datos a Bitrix24");
        // Manejar el caso de error según sea necesario
      }
    } catch (error) {
      console.log(error);
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[574px] h-[605px] w-full bg-[#FFFFFF]"
    >
      <div className="h-[26px] md:h-[38px] bg-black w-full md:w-[574px] flex justify-center items-center">
        <h1 className="text-white font-semibold text-lg md:text-xl text-center">
          DORMILON M
        </h1>
      </div>
      <div className="mt-[28px] md:mt-[50px] ml-[35px] sm:ml-[55px] md:ml-[46px]">
        <p className="text-[17px] md:text-[26px] text-[#6CA936] font-normal leading-5 mb-0">
          Deja tus datos y
        </p>
        <p className="text-[17px] md:text-[26px] text-[#6CA936] font-semibold leading-6 mt-0">
          te contactaremos en breves minutos
        </p>
      </div>
      <div className="flex flex-col space-y-3 mx-11">
        <div className="flex justify-center mt-[38px] gap-[10px] h-[38px]">
          <div className="flex flex-col">
            <input
              placeholder="Nombres"
              className="border border-black px-2 rounded-[10px] focus:outline-black h-full"
              id="name"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Apellidos"
              className="border border-black px-2 rounded-[10px] focus:outline-black h-full"
              id="lastname"
              {...register("lastname")}
            />
            {errors.lastname && (
              <span className="text-red-500">{errors.lastname.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col h-[38px]">
          <input
            placeholder="Celular"
            className="border border-black px-2 rounded-[10px] focus:outline-black h-full"
            id="phoneNumber"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </div>
        <div className="flex flex-col h-[38px]">
          <input
            placeholder="Correo electrónico"
            className="border border-black px-2 rounded-[10px] focus:outline-black h-full"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <textarea
            placeholder="¿Qué desea tratar?"
            rows={5}
            className="border border-black px-2 rounded-[10px] focus:outline-black resize-none"
            id="description"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="acceptTerms">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register("acceptTerms")}
            />
            {"  "}Al enviar, acepto las políticas de Privacidad
          </label>
          {errors.acceptTerms && (
            <span className="text-red-500">{errors.acceptTerms.message}</span>
          )}
        </div>
        <button
          className="w-full h-10 bg-[#6CA936] text-[#FFFFFF] font-semibold rounded-[10px] text-center"
          type="submit"
        >
          ENVIAR
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

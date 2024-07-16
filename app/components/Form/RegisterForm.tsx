"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from './userScheema';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { initFacebookPixel } from '@/app/utils/facebookPixel';
import { trackFacebookEvent } from '@/app/utils/facebookPixel';

type User = {
  name: string;
  lastname: string;
  phoneNumber: number;
  email: string;
  description: string;
  acceptTerms: boolean;
};

declare const fbq: Function;

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: User) => {
    
    const formattedData = {
      ...data,
      phoneNumber: `+51${data.phoneNumber}`,
    };
    trackFacebookEvent('Lead', formattedData);
    try {
      const response = await fetch('/api/create-lead', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
      });

      if (response.status === 200) {
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
    // Inicializa el píxel de Facebook al cargar la aplicación
    initFacebookPixel();

    trackFacebookEvent('ViewContent');

    // Agrega un listener al evento de cambio de ruta usando router.push
    const subscribeToRouteChanges = () => {
      router.push('/');
    };

    // Llama a la función de suscripción al cargar la aplicación
    subscribeToRouteChanges();

    // Limpia el listener cuando el componente se desmonta
    return () => {
      // No es necesario limpiar el listener en este caso
    };
  }, [router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='border-2 rounded-2xl border-green-500 max-w-[650px] w-full p-2 md:p-5 space-y-2 bg-green-100'>
      <div className='flex flex-col'>
        <label className='font-bold' htmlFor="name">Nombres:</label>
        <input className='bg-green-300/60 px-2 rounded-md focus:outline-green-700' id="name" {...register('name')} />
        {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
      </div>
      <div className='flex flex-col'>
        <label className='font-bold' htmlFor="lastname">Apelllidos:</label>
        <input className='bg-green-300/60 px-2 rounded-md focus:outline-green-700' id="lastname" {...register('lastname')} />
        {errors.lastname && <span className='text-red-500'>{errors.lastname.message}</span>}
      </div>
      <div className='flex flex-col'>
        <label className='font-bold' htmlFor="phoneNumber">Celular:</label>
        <input className='bg-green-300/60 px-2 rounded-md focus:outline-green-700' id="phoneNumber" {...register('phoneNumber')} />
        {errors.phoneNumber && <span className='text-red-500'>{errors.phoneNumber.message}</span>}
      </div>
      <div className='flex flex-col'>
        <label className='font-bold' htmlFor="email">Correo electrónico:</label>
        <input className='bg-green-300/60 px-2 rounded-md focus:outline-green-700' id="email" {...register('email')} />
        {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
      </div>
      <div className='flex flex-col'>
        <label className='font-bold' htmlFor="description">¿Qué desea tratar?:</label>
        <input className='bg-green-300/60 px-2 rounded-md focus:outline-green-700' id="description" {...register('description')} />
        {errors.description && <span className='text-red-500'>{errors.description.message}</span>}
      </div>
      <div className='flex flex-col'>
        <label className='text-sm' htmlFor="acceptTerms">
          <input id="acceptTerms" type="checkbox" {...register('acceptTerms')} />
          {"  "}Al enviar, acepto las políticas de Privacidad
        </label>
        {errors.acceptTerms && <span className='text-red-500'>{errors.acceptTerms.message}</span>}
      </div>
      <button className='w-full h-10 bg-green-600 text-white font-bold' type="submit">Enviar</button>
    </form>
  );
};

export default RegisterForm;

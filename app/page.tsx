import React from 'react'
import RegisterForm from './components/Form/RegisterForm'
import Image from 'next/image'

const page = () => {
  return (
    <main className='flex flex-col justify-center items-center w-full h-dvh space-y-3'>
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
        className='object-cover md:object-contain'
          src="/images/dormilonM.jpeg"
          alt="Imagen Dormilon"
          fill
        />
      </div>
      <div className='flex flex-col space-y-2'>
        <h1 className='text-lg md:text-xl lg:text-3xl font-bold text-center'>Formulando tu bienestar</h1>
        <h3 className='text-sm md:text-base text-center'>Completa tus datos para una asesoria personalizada</h3>
      </div>
      <RegisterForm/>
    </main>
  )
}

export default page
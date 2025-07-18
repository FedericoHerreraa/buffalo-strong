'use client'


import Link from 'next/link';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useSearchParams, redirect } from 'next/navigation';

export const SuccessPageContent = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const searchParams = useSearchParams();
    const param = searchParams.get('purchase')

    if (!param) {
        redirect('/');
    }

    useEffect(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });

        const timer = setTimeout(() => setShowConfetti(false), 7000);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className="flex flex-col items-center mt-40 h-screen text-center">
            {showConfetti && 
                <Confetti
                    width={dimensions.width}
                    height={dimensions.height}
                    numberOfPieces={1000}
                    gravity={0.3} 
                    tweenDuration={3000}
                    recycle={false}
                />
            }

            <h1 className="md:text-4xl text-2xl font-bold text-green-600">¡Pedido confirmado! 🎉</h1>
            <p className="md:text-lg text-zinc-500 mt-3">
                Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.
            </p>
            <Link href="/" className='border border-green-500 rounded-md md:px-5 px-3 md:py-2 py-1 mt-5 hover:bg-green-100 transition-all duration-150'>
                <p className="">Volver al inicio</p>
            </Link>
        </div>
    );
}
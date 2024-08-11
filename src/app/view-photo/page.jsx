// src/app/view-photo/page.jsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ViewPhotoPage() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const updateImage = () => {
            const storedImage = localStorage.getItem('currentImage');
            setImage(storedImage);
        };

        // Obtener la imagen inicial
        updateImage();

        // Configurar el listener para cambios en localStorage
        window.addEventListener('storage', updateImage);

        // Limpiar el listener al desmontar el componente
        return () => {
            window.removeEventListener('storage', updateImage);
        };
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <p>Aquí se visualizará tu imagen</p>
            <div className="w-[900px] h-[800px] bg-slate-300 rounded-lg mt-5 flex justify-center items-center">
                {image ? (
                    <Image src={image} alt="Uploaded" className="w-full h-full object-cover" width={100} height={100} loading='lazy' decoding='async'/>
                ) : (
                    <p>No image uploaded yet.</p>
                )}
            </div>
        </main>
    );
}

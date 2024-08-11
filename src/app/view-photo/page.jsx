// src/app/view-photo/page.jsx
'use client';

import { useEffect, useState } from 'react';

export default function ViewPhotoPage() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const updateImage = () => {
            const storedImage = localStorage.getItem('currentImage');
            setImage(storedImage);
        };

        // Actualizar imagen cuando se monta el componente
        updateImage();

        // Escuchar eventos de almacenamiento
        window.addEventListener('storage', updateImage);

        // Limpiar el evento cuando el componente se desmonte
        return () => {
            window.removeEventListener('storage', updateImage);
        };
    }, []);

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <p>Aquí se visualizará tu imagen</p>
            <div className="w-[900px] h-[800px] bg-slate-300 rounded-lg mt-5 flex justify-center items-center">
                {image ? (
                    <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                ) : (
                    <p>No image uploaded yet.</p>
                )}
            </div>
        </main>
    );
}

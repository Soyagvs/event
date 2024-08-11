// src/app/view-photo/page.jsx
'use client';

import { useEffect, useState } from 'react';

const ws = new WebSocket('ws://localhost:8080'); // URL del servidor WebSocket

export default function ViewPhotoPage() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const handleMessage = (event) => {
            setImage(event.data); // Actualizar imagen cuando se recibe un mensaje
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <p>Aquí se visualizará la imagen subida</p>
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

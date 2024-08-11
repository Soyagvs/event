// src/app/view-photo/page.jsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ViewPhotoPage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:8080/images');
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();

        const handleStorageChange = () => {
            fetchImages();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <p>Aquí se visualizarán las imágenes</p>
            <div className="w-[900px] h-[800px] bg-slate-300 rounded-lg mt-5 flex flex-wrap justify-center items-center">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt={`Uploaded ${index}`}
                            className="w-1/3 h-auto object-cover m-1"
                            width={100}
                            height={100}
                            
                        />
                    ))
                ) : (
                    <p>No images uploaded yet.</p>
                )}
            </div>
        </main>
    );
}

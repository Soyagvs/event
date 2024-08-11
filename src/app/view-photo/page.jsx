'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function ViewPhotoPage() {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Escucha en tiempo real a la URL de la imagen más reciente en Firestore
        const unsubscribe = onSnapshot(doc(db, 'images', 'latest'), (doc) => {
            if (doc.exists()) {
                setImageUrl(doc.data().url);
                setLoading(false);
            } else {
                console.log('No image found');
                setLoading(false);
            }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <p>Aquí se visualizará la imagen más reciente</p>
            <div className="w-[900px] h-[800px] bg-slate-300 rounded-lg mt-5 flex justify-center items-center">
                {loading ? (
                    <p>Loading...</p>
                ) : imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="Uploaded Image"
                        className="w-auto h-auto max-w-full max-h-full object-cover rounded-lg"
                        width={900}
                        height={800}
                    />
                ) : (
                    <p>No images uploaded yet.</p>
                )}
            </div>
        </main>
    );
}

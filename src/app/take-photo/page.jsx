'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

export default function TakePhotoPage() {
    const [imageSrc, setImageSrc] = useState(null);
    const router = useRouter();
    const webcamRef = React.useRef(null);

    const capturePhoto = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);

        // Convertir la imagen capturada a un blob para subirla a Firebase
        const response = await fetch(imageSrc);
        const blob = await response.blob();

        // Subir la imagen a Firebase Storage
        const storageRef = ref(storage, `images/${Date.now()}.jpg`);
        try {
            await uploadBytes(storageRef, blob);
            const fileUrl = await getDownloadURL(storageRef);

            // Guardar la URL de la imagen en Firestore
            const imageDoc = doc(db, 'images', 'latest');
            await setDoc(imageDoc, { url: fileUrl });

            // Navegar a la vista de foto
            router.push('/view-photo');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <h1>Tomar una foto</h1>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="mt-5"
            />
            <button
                onClick={capturePhoto}
                className="mt-5 bg-blue-500 text-white p-2 rounded"
            >
                Capturar y subir foto
            </button>
            {imageSrc && <img src={imageSrc} alt="Captured" className="mt-5" />}
        </main>
    );
}

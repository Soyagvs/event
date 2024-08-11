// src/app/upload-photo/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPhotoPage() {
    const [image, setImage] = useState(null);
    const router = useRouter();

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('http://localhost:8080/uploads', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                setImage(data.imageUrl);
                // Notificar a otras pestañas
                window.dispatchEvent(new Event('storage'));
                router.push('/view-photo');
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <h1>Sube tu foto</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="mt-5"
            />
        </main>
    );
}

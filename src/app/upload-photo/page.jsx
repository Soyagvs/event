// src/app/upload-photo/page.jsx
'use client';

import { useRouter } from 'next/navigation';

export default function UploadPhotoPage() {
    const router = useRouter();

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                localStorage.setItem('currentImage', imageUrl); // Guardar en localStorage
                window.dispatchEvent(new Event('storage')); // Notificar a otras pestañas
                router.push('/view-photo');
            };
            reader.readAsDataURL(file);
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

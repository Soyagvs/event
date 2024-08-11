// src/app/take-photo/page.jsx
'use client';

import { useRouter } from 'next/navigation';

export default function TakePhotoPage() {
    const router = useRouter();

    const handleCapture = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                localStorage.setItem('currentImage', imageUrl); // Guardar en localStorage
                // Notificar a otras pestañas que se ha actualizado la imagen
                window.dispatchEvent(new Event('storage'));
                router.push('/view-photo');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <main className="min-h-screen flex justify-center items-center">
            <input
                type="file"
                accept="image/*"
                onChange={handleCapture}
                className="border p-2"
            />
        </main>
    );
}

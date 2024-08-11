'use client';

import { useImage } from '../../context/ImageContext';
import { useRouter } from 'next/navigation';

export default function TakePhotoPage() {
    const { setImage } = useImage();
    const router = useRouter();

    const handleCapture = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setImage(imageUrl); // Este debe ser un método disponible desde el contexto
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

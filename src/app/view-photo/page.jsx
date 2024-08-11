'use client';

import { useImage } from '@/context/ImageContext';

export default function ViewPhotoPage() {
    const { image } = useImage();

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <p>Aquí se visualizará tu imagen</p>
            <div className="w-[900px] h-[800px] bg-slate-300 rounded-lg mt-5 flex justify-center items-center">
                {image ? (
                    <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                ) : (
                    <p>No hay imagen disponible.</p>
                )}
            </div>
        </main>
    );
}

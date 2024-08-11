'use client';

import { useRouter } from 'next/navigation';

export default function TranslatePage() {
    const router = useRouter();

    const handleButtonClick = (path) => {
        router.push(path);
    };

    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-3">
                <h1 className="text-center text-lg">Elige qué herramienta quieres utilizar</h1>
                
                <button
                    className="flex justify-center items-center w-32 h-16 bg-green-300 rounded-lg text-black"
                    onClick={() => handleButtonClick('/upload-photo')}
                >
                    Subir foto
                </button>
                <button
                    className="flex justify-center items-center w-32 h-16 bg-blue-300 rounded-lg text-black"
                    onClick={() => handleButtonClick('/take-photo')}
                >
                    Tomar foto
                </button>
            </div>
        </main>
    );
}

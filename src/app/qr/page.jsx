import { Qr } from "@/ui/Qr";

export default function QrPage() {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen">

            <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-5xl">Escane el codigo QR con el dispositivo movil</h1>
                <div>
                    <Qr />
                </div>
            </div>
        </main>
    )
}
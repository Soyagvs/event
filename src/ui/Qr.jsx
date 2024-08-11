'use client'
import QRCode from 'qrcode.react';

export const Qr = () => {
    const urlToEncode = "https://eventphoto.vercel.app/translate"

    return (
        <div className="flex justify-center items-center h-screen">
            <QRCode
                value={urlToEncode}
                size={256}
                fgColor="black"
                bgColor="yellow"
                level="H"
            />
        </div>
    );
};


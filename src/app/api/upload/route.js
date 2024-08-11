import { NextResponse } from 'next/server';
import { storage } from '../../firebase.js'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST(request) {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    try {
        const storageRef = ref(storage, `images/${Date.now()}.jpg`);
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);

        return NextResponse.json({ imageUrl: fileUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
    }
}

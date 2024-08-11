// src/pages/api/upload.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getStorage as getAdminStorage } from 'firebase-admin/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const app = initializeApp();
const storage = getAdminStorage(app);
const db = getFirestore(app);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(process.cwd(), 'uploads');
        form.keepExtensions = true;
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Formidable error:', err);
                res.status(500).json({ error: 'Error processing file' });
                return;
            }

            const file = files.image[0];
            const filePath = file.filepath;
            const storageRef = ref(storage, 'images/' + path.basename(filePath));

            try {
                const fileBuffer = fs.readFileSync(filePath);
                await uploadBytes(storageRef, fileBuffer);

                const downloadURL = await getDownloadURL(storageRef);
                await setDoc(doc(db, 'images', 'latest'), { url: downloadURL });

                res.status(200).json({ imageUrl: downloadURL });
            } catch (error) {
                console.error('Upload error:', error);
                res.status(500).json({ error: 'Error uploading image' });
            } finally {
                fs.unlinkSync(filePath); // Clean up temporary file
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

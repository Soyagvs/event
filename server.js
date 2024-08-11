// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Configura Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ imageUrl: `http://localhost:${port}/uploads/${req.file.filename}` });
});

// Ruta para obtener imágenes
app.get('/images', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) return res.status(500).send(err);
        res.json(files.map(file => `http://localhost:${port}/uploads/${file}`));
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Test endpoint for file upload
app.post('/api/books', upload.single('pdfFile'), (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    try {
        const { title, author, description, price, rent, image, pdfUrl } = req.body;
        
        // Use uploaded file or provided URL
        const finalPdfUrl = req.file 
            ? `http://localhost:${PORT}/api/files/${req.file.filename}`
            : pdfUrl;
        
        const book = {
            id: Date.now().toString(),
            title,
            author,
            description,
            price: parseFloat(price),
            rent: parseFloat(rent),
            image,
            pdfUrl: finalPdfUrl
        };
        
        res.json({
            success: true,
            message: 'Book created successfully',
            ...book
        });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating book',
            error: error.message
        });
    }
});

// Serve uploaded files
app.get('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ message: 'File not found' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Upload test: open test-upload.html in browser`);
});

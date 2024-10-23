const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'E4RTH', // Set folder in Cloudinary
    resource_type: 'auto',      // Automatically detect file type
    format: async (req, file) => 'pdf',  // Specify format, e.g., 'pdf'
    public_id: (req, file) => Date.now() + '-' + file.originalname, // Customize public_id
  },
});

// Set up multer
const upload = multer({ storage: storage });

// Middleware for handling file upload to Cloudinary
const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // File uploaded successfully to Cloudinary, pass the result to next middleware
    console.log("File uploaded successfully to Cloudinary:", req.file.path);
    req.cloudinaryFile = req.file;  // Store file info in req object
    next();
  } catch (error) {
    res.status(500).json({ message: "Error uploading to Cloudinary", error: error.message });
  }
};

module.exports = { upload, uploadToCloudinary };

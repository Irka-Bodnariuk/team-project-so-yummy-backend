const multer = require("multer");
const path = require("path");

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Images Only!"), false);
    }
  },
});

module.exports = upload;

// const cloudinary = require("cloudinary");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const multer = require("multer");

// const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

// cloudinary.config({
//   cloud_name: CLOUDINARY_NAME,
//   api_key: CLOUDINARY_KEY,
//   api_secret: CLOUDINARY_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "avatars",
//   allowedFormats: ["jpg", "png"],
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   params: {},
// });

// const uploadCloud = multer({ storage });

// module.exports = uploadCloud;

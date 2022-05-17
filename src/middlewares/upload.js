const multer = require("multer");
const createError = require("http-errors");

// const maxSize = 2 * 1024 * 1024;
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
//       cb(null, "./upload");
//       console.log(file.mimetype);
//     } else {
//       console.log(file.mimetype);
//       return cb(createError(403, "Only .jpg .pgn format allowed"));
//     }
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//   },
//   limits: { fileSize: maxSize },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;

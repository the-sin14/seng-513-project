//used 
const multer = require("multer");
//configure how files are stored
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //where to store the file
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf" ||
        file.mimetype === "text/plain" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});
module.exports = upload;
export {};
//# sourceMappingURL=multer.js.map
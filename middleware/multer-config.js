const multer = require('multer');

// App accepted mime types
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (MIME_TYPES[file.mimetype]) {
      callback(null, './uploads/');
    } else {
      callback({ status: 415, message: 'unsupported file type' }, console.log('the bad one.....................................................));
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype] ? MIME_TYPES[file.mimetype] : '';
    callback(null, `${name + Date.now()}.${extension}`);
  },
});

module.exports = multer({ storage }).any();

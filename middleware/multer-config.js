const multer = require('multer');

console.log('we atleast in multer and req body is : ', req.body);

// App accepted mime types
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (MIME_TYPES[file.mimetype]) {
      callback(null, 'uploads');
    } else {
      callback({ status: 415, message: 'unsupported file type' }, false);
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype] ? MIME_TYPES[file.mimetype] : '';
    callback(null, `${name + Date.now()}.${extension}`);
  },
});
const storageConfig = multer({ storage }).any();
console.log('in side multer and multer return is : ', storageConfig);
module.exports = storageConfig;

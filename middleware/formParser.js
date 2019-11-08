const multer = require('multer');

// App accepted mime types
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
};

const m = multer({ dest: 'uploads/' });
// console.log('MULTER BUILD IS : ', m);


module.exports = m.any();

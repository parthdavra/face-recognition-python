const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const desktopPath = path.join(require('os').homedir(), 'Desktop', 'Finall project');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, desktopPath); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        const min = 10000, max = 99999; 
      cb(null, Math.floor(Math.random() * (max - min + 1)) + min + '.png'); // Rename the file
    },
  });

const upload = multer({ storage: storage });

//user_id,name,email,password,user_type
router.post(
    '/user-form',
    [
        body('name').trim().not().isEmpty(),
        body('user_type').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email.')
        .normalizeEmail(),
    ],  authController.userForm
);

router.post('/image', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No image file received');
    }
    const imageUrl = req.file.filename;
    res.status(200).json({ imageUrl });
  });
router.post('/login', authController.login);
router.get('/staff',auth, authController.getStaff);
router.get('/students', auth, authController.getStudent);
router.get('/attendances',auth, authController.getAttendances);
router.get('/user/:id',auth, authController.getUser);


module.exports = router;
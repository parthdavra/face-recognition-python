const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const desktopPath = path.join(require('os').homedir(), 'Desktop', 'Finall project/face-recognition-python/FaceRecognitionAttendanceSystem/faces');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, desktopPath); 
    },
    filename: function (req, file, cb) {
        const min = 10000, max = 99999; 
      cb(null, Math.floor(Math.random() * (max - min + 1)) + min + '.'+file.originalname.split(".")[1]); // Rename the file
    },
  });

const upload = multer({ storage: storage });

router.post(
    '/user-form',
    auth,
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
    const imageUrl = req.file.filename.split(".")[0];
    res.status(200).json({ imageUrl, status:200 });
  });
router.post('/login', authController.login);
router.get('/staff',auth, authController.getStaff);
router.get('/students', auth, authController.getStudent);
router.get('/attendances',auth, authController.getAttendances);
router.get('/user/:id',auth, authController.getUser);
router.get('/rooms',auth, authController.getRooms);
router.post('/class', auth, authController.addClass);
router.get('/staff-attandances',auth, authController.getStaffAttendances);
router.post('/change-password', authController.changePassword);


module.exports = router;
const express= require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const cors = require('cors');
const path = require('path');
const app = express();
const desktopPath = path.join(require('os').homedir(), 'Desktop', 'Finall project');
app.use(desktopPath, express.static('uploads'));
//app.use('/images', express.static(path.join(__dirname, '../../FaceRecognitionAttendanceSystem/faces')));
const ports = process.env.PORT || 3000;
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  
  app.use(cors());
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`))
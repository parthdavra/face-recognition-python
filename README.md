🎓 Face Recognition Attendance System
A smart, contactless Face Recognition Attendance System built using Python, OpenCV, PostgreSQL, Node.js, and Angular. Designed for educational institutions, this project automates attendance tracking using live webcam input and facial recognition algorithms, eliminating manual processes and reducing proxy attendance.

📌 Features
📷 Real-time face detection and recognition using webcam

🧠 Face encoding with face_recognition (dlib-based)

🗃️ Attendance logged automatically to PostgreSQL

📤 Unknown face alerts sent to admin via email

📊 Admin dashboard with attendance statistics

🌐 Web interface for students, staff, and admin using Angular

🔐 JWT-based authentication via Node.js backend

🏗️ Architecture
css
Copy
Edit
[Camera] → [Python Recognition Engine] → [PostgreSQL DB]
                          ↓
               [Node.js API Server]
                          ↓
               [Angular Frontend UI]
🧰 Tech Stack
Layer	Technology
Face Detection	Python, OpenCV, face_recognition
Backend API	Node.js, Express
Frontend UI	Angular 12, Angular Material
Database	PostgreSQL
Tools/IDE	PyCharm, VS Code

🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/parthdavra/face-recognition-python.git
cd face-recognition-python
2. Install Python Dependencies
Make sure Python 3.6+ is installed.

bash
Copy
Edit
pip install -r requirements.txt
Main libraries:

opencv-python

face_recognition

numpy

psycopg2

flask (if using the legacy API)

3. Setup PostgreSQL
Create the following tables:

sql
Copy
Edit
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR UNIQUE,
    name VARCHAR,
    email VARCHAR,
    user_type VARCHAR,
    password VARCHAR
);

-- Attendance Table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_unknown BOOLEAN DEFAULT FALSE,
    class_id VARCHAR
);
Update DB config in your Python and Node.js scripts.

4. Start Face Recognition Engine (Python)
bash
Copy
Edit
python main.py
This script:

Captures frames from the webcam

Detects & encodes faces

Matches faces against the database

Logs attendance

Sends unknown faces to admin (via email)

5. Run the Backend Server (Node.js)
Navigate to the backend directory:

bash
Copy
Edit
cd backend
npm install
npm start
This serves REST APIs for:

Login

Attendance retrieval

User management

6. Run the Frontend (Angular)
Navigate to the frontend directory:

bash
Copy
Edit
cd frontend
npm install
ng serve
Visit: http://localhost:4200

📸 Screenshots
Login Page	Admin Dashboard

Add User Form	Attendance View

Screenshots are stored in /screenshots. Update these as your UI evolves.

🛡️ Security & Privacy
Face encodings are stored securely

Unknown faces are not stored unless flagged

Passwords are hashed before storage (recommended via bcrypt)

Admin authentication uses JWT

📈 Future Enhancements
⬆️ Deep learning face recognition models

☁️ Cloud-based database & image storage

📱 Mobile app integration

🧪 Unit & integration tests

🔔 Real-time alerts with Twilio/Telegram

👨‍🎓 Student self-enrollment UI

🙋‍♂️ Author
Parth Babubhai Davra
MSc Artificial Intelligence & Robotics
University of Hertfordshire

GitHub: @parthdavra


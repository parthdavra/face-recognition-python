import face_recognition
import os, sys
import cv2
import numpy as np
import math
import psycopg2
from datetime import datetime, timedelta
import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import schedule
import time

def face_confidence(face_distance, face_match_threshold=0.6):
    range = (1.0 - face_match_threshold)
    linear_val = (1.0 - face_distance) / (range * 2.0)

    if face_distance > face_match_threshold:
        return str(round(linear_val * 100, 2)) + '%'
    else:
        value = (linear_val + ((1.0 - linear_val) * math.pow((linear_val - 0.5) * 2, 0.2))) * 100
        return str(round(value, 2)) + '%'

def mail_send(user_id, image, class_id):

    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "pdavra1997@gmail.com"
    sender_password = "qadmhqepsqsfsoyf"
    recipient_email = "parthdavra97@gmail.com"
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = f'Unknown person is in the class number {class_id}'
    body = f'Unknown person id is {user_id}'
    image_file = image
    with open(image_file, 'rb') as img_file:
         image = MIMEImage(img_file.read(), name=os.path.basename(image_file))
    msg.attach(image)
    msg.attach(MIMEText(body, 'plain'))
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)

        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)


class FaceRecognition:
    face_locations = []
    face_encodings = []
    face_names = []
    known_face_encodings = []
    known_face_names = []

    def __init__(self):
        self.encode_faces()

    def encode_faces(self):

        for image in os.listdir('faces'):
            face_image = face_recognition.load_image_file(f'faces/{image}')
            face_encoding = face_recognition.face_encodings(face_image)[0]


            self.known_face_encodings.append(face_encoding)
            self. known_face_names.append(image)



    def run_recognition(self):

        capture_objects = []
        index = 0
        conn = psycopg2.connect(database="FaceRecognitionAttendanceSystem", host="127.0.0.1", user="postgres", password="a", port="5432")
        cursor = conn.cursor()
        while True:
            video_capture = cv2.VideoCapture(index)

            if not video_capture.isOpened():
                break

            capture_objects.append(video_capture)
            index += 1
        if len(capture_objects) == 0:
            print("No cameras found!!!")

        while True:
            frames = []
            for video_capture in capture_objects:
                ret, frame = video_capture.read()
                frames.append(frame)
            for i, frame in enumerate(frames):
                process_current_frame = True
                if process_current_frame:

                    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
                    rgb_small_frame = small_frame[:, :, ::-1]

                    self.face_locations = face_recognition.face_locations(rgb_small_frame)
                    self.face_encodings = face_recognition.face_encodings(rgb_small_frame, self.face_locations)

                    self.face_names = []
                    for face_encoding in self.face_encodings:
                        matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding)
                        name = 'unknown'
                        confidence = 'Unknown'

                        face_distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
                        best_match_index = np.argmin(face_distances)

                        if matches[best_match_index]:
                            name = self.known_face_names[best_match_index]
                            confidence = face_confidence(face_distances[best_match_index])
                            now = datetime.now()

                            dt_string = now.strftime("%d/%m/%Y %H")

                            selectQuery = "select * from attendances where student_id = %s ORDER BY id DESC LIMIT 1;" % int(name.split(".")[0])
                            cursor.execute(selectQuery)
                            rows = cursor.fetchall()

                            if len(rows) == 0:
                                cursor.execute("insert into attendances (student_id,class_id, created_at,is_unknown) values (%s, %s, %s, %s);", (int(name.split(".")[0]), int(i), now, 'false'))
                                conn.commit()
                            if len(rows) == 1:
                                for student_data in rows:

                                    if int(student_data[5]) == int(i):
                                        if (student_data[2].strftime("%d/%m/%Y") != now.strftime("%d/%m/%Y")) or ((student_data[2] + timedelta(hours=1)).strftime("%d/%m/%Y %H") <= dt_string):
                                            cursor.execute("insert into attendances (student_id, class_id, created_at, is_unknown) values (%s, %s, %s, %s);",(int(name.split(".")[0]), int(i), now, student_data[6]))
                                            conn.commit()

                                    else:
                                        cursor.execute("insert into attendances (student_id, class_id, created_at, is_unknown) values (%s, %s, %s, %s);", (int(name.split(".")[0]), int(i), now, student_data[6]))
                                        conn.commit()
                        self.face_names.append(f'{name} ({confidence})')

                process_current_frame = not process_current_frame

                for (top, right, bottom, left), name in zip(self.face_locations, self.face_names):

                    top *= 4
                    right *= 4
                    bottom *= 4
                    left *= 4
                    if name.split(" ")[0] == 'unknown':

                        face_image = frame[top:bottom + 35, left:right + 35]
                        student_id = random.randint(10000, 99999)
                        image_name = f'faces/%d.png' % student_id
                        cursor.execute("insert into attendances (student_id, class_id, created_at,is_unknown) values (%s, %s, %s, %s);", (int(student_id), int(i), datetime.now(), 'true'))
                        conn.commit()

                        selectQuery = "select * from attendances where student_id = %s ORDER BY id DESC LIMIT 1;" % int(student_id)
                        cursor.execute(selectQuery)
                        rows = cursor.fetchall()


                        if len(rows) == 1:
                            cv2.imwrite(image_name, face_image)
                            face_image = face_recognition.load_image_file(f'{image_name}')
                            face_encoding = face_recognition.face_encodings(face_image)[0]
                            self.known_face_encodings.append(face_encoding)
                            self.known_face_names.append(image_name.split("/")[1])
                            select_class_number = "select * from class_number where class_id = %s;" % int(i)
                            cursor.execute(select_class_number)
                            row = cursor.fetchall()
                            if len(row) == 1:
                                mail_send(int(student_id), image_name, row[0][2])
                            mail_send(int(student_id), image_name, int(i))



                    cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
                    cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), -1)
                    cv2.putText(frame, name, (left + 6, bottom - 6), cv2.FONT_HERSHEY_DUPLEX, 0.8, (255, 255, 255), 1)



                cv2.imshow(f'Face Recognition{i}', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        for video_capture in capture_objects:
            video_capture.release()
        cv2.destroyAllWindows()
        cursor.close()
        conn.close()

if __name__== '__main__':
    fr = FaceRecognition()
    fr.run_recognition()


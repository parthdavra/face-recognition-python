const db = require('../util/database');

module.exports = class User {
    constructor(user_id,name,email,password,user_type){
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.user_type = user_type;
    }
    static async find(email){
        return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    }
    static save(user){
        return db.query(
            `INSERT INTO users (name, email, password, user_type, user_id) VALUES ($1, $2, $3, $4, $5);`,[user.name, user.email, user.password, user.user_type, parseInt(user.user_id)]
            )
    }
    static getStaff(){
        return db.query(
            `SELECT * FROM users where user_type = 'staff'`
            )
    }
    static getStudentAndVisitor(){
        return db.query(
            `SELECT * FROM users where user_type = 'student' OR user_type= 'visitor'`
            )
    }
    static getAttendances(){
        return db.query(
            `SELECT * FROM attendances LEFT JOIN users ON attendances.student_id = users.user_id LEFT JOIN class_number ON attendances.class_id = class_number.class_id where users.user_type != 'staff' OR  attendances.is_unknown = true`
            )
    }
    static getStaffAttendances(){
        return db.query(
            `SELECT * FROM attendances LEFT JOIN users ON attendances.student_id = users.user_id LEFT JOIN class_number ON attendances.class_id = class_number.class_id where users.user_type = 'staff'`
            )
    }
    static getUser(userId){
        return db.query(`SELECT * FROM users WHERE user_id = $1;`, [userId])
    }
    static updatePassword(user){
        console.log(user);
        return db.query(
            `UPDATE users SET password = $1 where user_id = $2 `, [user.password, parseInt(user.user_id)]
        )
    }
};
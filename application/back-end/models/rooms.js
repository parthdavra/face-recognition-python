const db = require('../util/database');

module.exports = class Rooms {
    constructor(class_id, class_number){
        this.class_id = class_id;
        this.class_number = class_number;
    }
    
    static getRooms(){
        return db.query(
            `SELECT * FROM class_number`
            )
    }
    static getRoomById(id){
        return db.query(
            `SELECT * FROM class_number where class_id = $1`, [id]
            )
    }
    static addClass(id,class_number){
       
        return db.query(
            `INSERT INTO class_number (class_id, class_number) VALUES ($1, $2);`,[ id, class_number]
            )
    }
};
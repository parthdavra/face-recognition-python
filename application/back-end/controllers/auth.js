const { validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.userForm = async (req, res, next) => {
    const errors = validationResult(req);
   if(!errors.isEmpty()) return
    console.log('req.body:::',req.body);
    const {name,email,password,user_type} = req.body;
    console.log(req);
    const min = 10000, max = 99999; 
    let hashedPassword ;
     try{
        const user = await User.find(email);
        if(user.rows.length > 0){
            return res.status(202).json({message: 'Email address already exist!'})
        }
    
        if(password){
             hashedPassword = await bcrypt.hash(password,12)
        }else
        {
            hashedPassword = '';
        }
        const userDetails = {
            name,
            email,
            password: hashedPassword,
            user_type,
            user_id: Math.floor(Math.random() * (max - min + 1)) + min 
        }
        const result = await User.save(userDetails);
        const userData = await User.getUser(userDetails.user_id);
        res.status(201).json({message: 'User registered!', data: userData})

    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      const user = await User.find(email);
        
      if (user.rows.length !== 1) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401; // 401: not authenticated
        throw error;
      }
      const storedUser = user.rows[0];
      if (storedUser.user_type != 'admin') {
        const error = new Error('You are not addmin');
        error.statusCode = 401; // 401: not authenticated
        throw error;
      }

      const isEqual = await bcrypt.compare(password, storedUser.password);
      
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
  
      const token = jwt.sign(
        {
          email: storedUser.email,
          userId: storedUser.user_id,
        },
        'secretfortoken',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: storedUser.user_id });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

exports.getStaff = async (req, res, next) => {

    try {
      const staff = await User.getStaff();
    
      res.status(200).json({ data: staff.rows });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.getStudent = async (req, res, next) => {

    try {
      const getStudent = await User.getStudentAndVisitor();
    
      res.status(200).json({ data: getStudent.rows });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};


exports.getAttendances = async (req, res, next) => {

    try {
      const getAttendance = await User.getAttendances();
    
      res.status(200).json({ data: getAttendance.rows });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};
exports.getUser = async (req, res, next) => {

    try {
      const getUser= await User.getUser(req.params.id);
    
      res.status(200).json({ data: getUser.rows });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};
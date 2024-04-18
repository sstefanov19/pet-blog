const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo =  require('../middleware/validinfo');
const express = require('express');
const pool = require('../db')
const authorization = require('../middleware/authorization');


//register route

router.post("/register" , validInfo , async(req , res) => {
    const {email , name , password } = req.body;
    try {

        
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1 " , [
            email
        ]);

        if(user.rows.length > 0) {
            return res.status(401).json("User already exists");
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password , salt);
        
        const  newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES($1 , $2, $3) " , [name , email , bcryptPassword]);
        
       let jwtToken = jwtGenerator(newUser.rows[0].user_id);
       
       return res.status(200).json({ jwtToken });
       
   }catch(err) {

    console.error(err);
    res.status(500).send("SERVER ERROR");
   }
});

//login route

router.post("/login", validInfo , async (req, res) => {

    const {email ,  password} = req.body;
    
    try {
      

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1 " ,  [
            email
        ]);

        if(user.rows.length === 0) {
            res.status(401).json("Email or password incorrect");
        }
     
       
            const validPassword = await bcrypt.compare(password , user.rows[0].user_password);
            if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
            const jwtToken = jwtGenerator(user.rows[0].user_id);
            
            return res.json({jwtToken});


    }catch(err){
           console.error(err.message);
    res.status(500).send("Server error"); 
    }

});

// async function getCurrentUser() {
//     try {
//         const result = await db.query("SELECT * FROM users");
//         const users = result.rows;
//         const currentUser = users.find((user) => user.id == currentUserId);
//         console.log("Current User:", currentUser);
//         return currentUser;
//     } catch (error) {
//         console.error("Error fetching current user:", error);
//         throw error;
//     }
//   }




router.get("/verify", authorization , async (req, res) => {
    try {
        res.json(true);
     }catch(err) {

    console.error(err);
    res.status(500).send("SERVER ERROR");
   }
});




module.exports = router;
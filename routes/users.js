const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")

const User = require("../models/User")

//login page
router.get("/login", (req, res) => res.render("login"))

//register page
router.get("/register", (req, res) => res.render("register"))

//Register handle
router.post("/register", async (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    //Check requires fields
    if (!name || !email || !password || !password2) {
        errors.push({msg: "please fill all fields"})
    }

    //check password match
    if(password !== password2){
        errors.push({msg: "Password do not match"})
    }

    //check password length
    if(password.length < 6){
        errors.push({msg: "Password should be greater than 6 characters"})
    }

    if(errors.length > 0){
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        //validation pass
        await User.findOne({ where: {email: email}}).then(user => {
            if (user) {
                errors.push({msg: "Email already registered"})
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })
                console.log(newUser);
                res.send("Hello")
            }
        }).catch((err) => {
            
        });
    }
})

module.exports = router
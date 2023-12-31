const express = require('express')
const { UserModel } = require("../models/user.Model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router();


userRouter.post("/signup", async (req, res) => {
    const { name, email, pass } = req.body
    try {
        bcrypt.hash(pass, 5, async function (err, hash) {
            if (err) {
                res.send({ msg: "something went wrong", error: err.message })
            } else {
                const user = new UserModel({ name, email, pass: hash })
                await user.save();
                res.send({ msg: "New user registered" })
            }
        });

    } catch (err) {
        res.send({ msg: "Something went Wrong", "err": err.message })
    }

})


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body


    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, function (err, result) {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "masai")
                    res.send({ msg: "“Login Successful”", token: token })
                    // let ls = localStorage.setItem('masai', JSON.stringify(token))
                    // console.log(ls)
                } else {
                    res.send({ msg: "something went wrong", "error": err.message })
                }
            });
        } else {
            res.send({ "msg": "“Invalid Credentials”", "error": err.message })
        }

    } catch (err) {
        res.send({ "msg": "“Invalid Credentials”", "error": err.message })
    }
})








module.exports = {
    userRouter
}
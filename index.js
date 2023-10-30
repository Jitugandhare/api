const express = require("express")

const { connection } = require("./db");

const { authanticate } = require("./middleware/auth.middleware")
const { userRouter } = require("./routes/user.routs")
const { doctorRouter } = require("./routes/doctor.routs")
const cors = require('cors')
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("HOME PAGE")
})

app.use("/users", userRouter)

// app.use(authanticate)
app.use("/doctors", doctorRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log(`Server listening on port ${process.env.PORT}`)
        console.log("Connected to DB")
    } catch (err) {
        console.log(err)
    }
});
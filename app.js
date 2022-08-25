const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

//DB
const { dbConnect } = require("./models/User")
dbConnect()

//Ejs(middleware)
app.use(expressLayouts)
app.set("view engine", "ejs")

//BodyParser
app.use(express.urlencoded({ extended: false }))

//Routes
app.use("/", require("./routes/index"))
app.use("/users", require("./routes/users"))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started on port ${PORT}`))
const { User } = require("../models")

const main = (req, res, next) => {
    res.send("Working!!")
}
const insert = (req, res, next) => {
    console.log("working route")
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(()=>res.send(JSON.stringify({"status": 200, "error": null, "response": "done"}))).catch((err)=>console.log(err))
}
module.exports = { main: main, insert: insert }
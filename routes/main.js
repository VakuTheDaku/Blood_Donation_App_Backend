const express= require("express")
const { main, insert } = require("../controllers/main.controller")
const router=express.Router()

router.post("/posts",insert)
router.get("/",main)
module.exports= router
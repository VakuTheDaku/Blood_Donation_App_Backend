const express= require("express")
const { main, insert, signin } = require("../controllers/auth.controller")
const router=express.Router()
const auth=require("./user.routes")
router.post("/posts",insert)
router.post("/signin",signin)
router.get("/",main)
module.exports= router
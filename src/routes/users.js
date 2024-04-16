const express = require("express")
const controllerRegister = require("../controllers/users")


const router = express.Router()


router.post("/api/register",controllerRegister.Register)
router.post("/api/login",controllerRegister.Login)
router.get("/api/verfy/:token",controllerRegister.VERFY_TOKEN)



module.exports = router
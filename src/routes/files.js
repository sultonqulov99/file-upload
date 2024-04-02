const express = require("express")
const controllerFiles = require("../controllers/files")
const router = express.Router()


router.post("/api/files/:userId",controllerFiles.PostFiles)
router.get("/api/files/",controllerFiles.FileGet)
router.get("/api/file/download/:fileName",controllerFiles.DOWNLOAD)

module.exports = router
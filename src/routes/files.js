const express = require("express")
const controllerFiles = require("../controllers/files")
const router = express.Router()



router.get("/api/files/",controllerFiles.FileGet)
router.get("/api/file/download/:fileName",controllerFiles.DOWNLOAD)

router.post("/api/files/:userId",controllerFiles.PostFiles)

router.put("/api/fileEdit",controllerFiles.UPDATE)

router.delete("/api/file",controllerFiles.DELETE)


module.exports = router
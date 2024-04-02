const express = require("express")
const fileUpload = require("express-fileupload")
const path = require("path")
const cors = require("cors")

const PORT = process.env.PORT || 4545

const routerRegister = require("./routes/users")
const routerFiles = require('./routes/files')

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(express.static(path.join(process.cwd(),"src","uploads")))
app.use(cors())
app.use(routerRegister)
app.use(routerFiles)


app.listen(PORT, () => console.log("Server is run"))
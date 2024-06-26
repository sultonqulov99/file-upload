const fs = require("fs")
const path = require("path")

const PostFiles = (req,res) => {
    const {userId} = req.params
    const {fileNomi} = req.body 
    const {file} = req.files 
    let fileName = new Date().getTime() + "." + file.name

    let files = fs.readFileSync(path.join(process.cwd(),"src","db","files.json"),"utf-8")
    files = JSON.parse(files)

    newFiles = {
        id:files[files.length - 1].id + 1,
        userId,
        fileName: fileNomi,
        mimetype: file.mimetype,
        link:fileName
    }

    files.push(newFiles)

    fs.writeFileSync(path.join(process.cwd(),"src","db","files.json"),JSON.stringify(files,null,4))
    file.mv(path.join(process.cwd(),"src","uploads", fileName), (err) => {
        if(err){
            return res.status(400).json({
                status:400,
                message:err
            })
        }
        else {
            return res.status(201).json({
                status:201,
                message:"Files Added succass",
                data:newFiles
            })
        }
    })  
}

const FileGet = (req,res) => {

    let files = fs.readFileSync(path.join(process.cwd(),"src","db","files.json"),"utf-8")
    files = JSON.parse(files)
    let users = fs.readFileSync(path.join(process.cwd(),"src","db","users.json"),"utf-8")
    users = JSON.parse(users)

    let file = files.map(file => {
        file.user = users.find(user => user.userId == +file.userId )
        file.viewLink = file.link
        file.downloadLink =  file.link

        delete file.userId

        return file
    })

    res.status(200).json({
        status:200,
        message: "All files succass",
        data: file
    })

}

const DOWNLOAD = (req,res) => {
    const {fileName} = req.params
    console.log(fileName);
    res.download(path.join(process.cwd(),"src","uploads",fileName))
}

const DELETE = (req,res)=> {
    const {fileId,userId} = req.query
    let files = fs.readFileSync(path.join(process.cwd(),"src","db","files.json"),"utf-8")
    files = JSON.parse(files)

    let file = files.find(el => el.id == fileId)

    if(file.userId != userId){
        return res.status(400).json({
            status:400,
            message:"senga bu fileni o'chirish mumkin emas"
        })
    }
    
    file = files.filter(el => el.id != fileId)
    fs.writeFileSync(path.join(process.cwd(),"src","db","files.json"),JSON.stringify(file,null,4))

    return res.status(200).json({
        status:200,
        message: "Deleted success"
    })

}

const UPDATE = (req,res) => {
    const {fileId,userId} = req.query
    const {fileName} = req.body 

    let files = fs.readFileSync(path.join(process.cwd(),"src","db","files.json"),"utf-8")
    files = JSON.parse(files)

    let file = files.find(el => el.id == fileId)

    if(file.userId != userId){
        return res.status(400).json({
            status:400,
            message:"senga bu fileni o'zgartirish mumkin emas"
        })
    }

    file.fileName = fileName

    fs.writeFileSync(path.join(process.cwd(),"src","db","files.json"),JSON.stringify(files,null,4))
    
    return res.status(202).json({
        status:202,
        message:"file update succassd"
    })


}

module.exports = {
    PostFiles,
    FileGet,
    DOWNLOAD,
    UPDATE,
    DELETE
}
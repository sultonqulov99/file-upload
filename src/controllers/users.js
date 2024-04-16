const path = require("path")
const fs = require("fs")
const JWT = require("jsonwebtoken")
const sha256 = require("sha256")


const Register = (req,res) => {
    let {userName,password} = req.body
    password = sha256(password)
    
    const {img} = req.files
    let users = fs.readFileSync(path.join(process.cwd(),"src","db","users.json"),"utf-8")
    users = JSON.parse(users)

    let fileName = new Date().getTime() + "." + img.name


    let newUser = {
        userId: users[users.length - 1].userId + 1,
        userName,
        password,
        img: fileName
    }

    users.push(newUser)

    fs.writeFileSync(path.join("src","db","users.json"),JSON.stringify(users,null,4))
    img.mv(path.join(process.cwd(),"src","uploads", fileName), (err) => {
        if(err){
            return res.status(400).json({
                status:400,
                message:err
            })
        }
        else {
            return res.status(201).json({
                status:201,
                message:"User Added succass",
                data:newUser,
                token: JWT.sign({id:newUser.userId},"shaftoli",{expiresIn:360})
            })
        }
    })
}

const Login = (req,res) => {

    let {userName, password} = req.body
    password = sha256(password)



    let users = fs.readFileSync(path.join(process.cwd(),"src","db","users.json"),"utf-8")
    users = JSON.parse(users)

    let user = users.find(user => user.userName == userName && user.password == password)

    if(!user){
        return res.status(404).json({
            status:404,
            message:"Foydalanuvchi topilmadi"
        })
    }

    return res.status(200).json({
        status:200,
        message:"Foydalanuvchi mavjud",
        data:user,
        token: JWT.sign({id:user.userId},"shaftoli",{expiresIn:360})
    })

}

const VERFY_TOKEN = (req,res) => {
    const {token} = req.params

    let user = JWT.verify(token,"shaftoli")
    if(user){
        return res.status(200).json({
            message:"Token valid"
        })
    }
    return res.statu(400).json({
        message:"Token invalid"
    })
}

module.exports = {
    Register,
    Login,
    VERFY_TOKEN
}
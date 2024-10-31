const userSchema = require("../models/user.js")

const allUsers = async(req,res)=>{
    try{
        const response  = await userSchema.find({_id :{$ne:req.sender }}).select("-password")
        res.status(200).json(response)
    }catch(error){
        res.status(200).json(error.message)
    }
}


const singleUser=async(req,res)=>{
    const {id} = req.params;
    try{
        const response  = await userSchema.findOne({id})
        res.status(200).json(response)
    }catch(error){
        res.status(200).json(error.message)
    }
}
module.exports = {allUsers,singleUser}
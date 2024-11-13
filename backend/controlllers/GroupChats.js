const Gc = require("../models/groupChats.js")


const makeAgroup = async (req, res) => {

   const { idss, input } = req.body;

   let participants = [];

   idss.forEach((item, index) => {
      participants[index] = item;
   });
   console.log(participants)
   const response = await Gc.create({ participants, name: input });
   console.log(response)
   res.status(200).json(response)

};

const getAllGc = async (req, res) => {
   const response = await Gc.find();
   res.status(200).json(response)
}

const FilterGroupChats = async (req, res) => {
   const { _id } = req.query;
   console.log(_id)
   const filtering = await Gc.findById(_id);
   res.status(200).json(filtering)
}




const sendMessageToGc = async (req, res) => {
    const {content }  = req.body;
    const {id} = req.params;
    const response = await Gc.create({
      
    })
   res.status(200).json(content)
}

module.exports = { sendMessageToGc, FilterGroupChats, getAllGc, makeAgroup } 
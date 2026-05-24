const plantDao = require('../../dao/plant-dao');

function CreateAbl(req,res){
 const dtoIn = req.body;
 if(!dtoIn.name || !dtoIn.wateringInterval){
 return res.status(400).json({message:'name and wateringInterval are required'});
 }
 const plant = plantDao.create(dtoIn);
 res.json(plant);
}
module.exports=CreateAbl;

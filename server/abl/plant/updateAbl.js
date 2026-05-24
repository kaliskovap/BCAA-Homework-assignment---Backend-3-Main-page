const plantDao = require('../../dao/plant-dao');
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

async function UpdateAbl(req,res){
 const plant = plantDao.update(req.body);
 if(!plant){return res.status(404).json({message:'Plant not found'});}
 res.json(plant);
}
module.exports=UpdateAbl;

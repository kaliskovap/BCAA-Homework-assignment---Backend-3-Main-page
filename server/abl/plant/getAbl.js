const plantDao = require('../../dao/plant-dao');

function GetAbl(req,res){
 const plant = plantDao.get(req.body.id);
 if(!plant){return res.status(404).json({message:'Plant not found'});}
 res.json(plant);
}
module.exports=GetAbl;

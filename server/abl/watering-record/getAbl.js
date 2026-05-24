const wateringRecordDao = require('../../dao/watering-record-dao');

function GetAbl(req,res){
 const record = wateringRecordDao.get(req.body.id);
 if(!record){return res.status(404).json({message:'Watering record not found'});}
 res.json(record);
}
module.exports=GetAbl;

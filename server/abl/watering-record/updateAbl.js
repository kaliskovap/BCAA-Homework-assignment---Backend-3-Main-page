const wateringRecordDao = require('../../dao/watering-record-dao');

function UpdateAbl(req,res){
 const record = wateringRecordDao.update(req.body);
 if(!record){return res.status(404).json({message:'Watering record not found'});}
 res.json(record);
}
module.exports=UpdateAbl;

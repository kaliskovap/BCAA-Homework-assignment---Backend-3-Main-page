const wateringRecordDao = require('../../dao/watering-record-dao');

function DeleteAbl(req,res){
 wateringRecordDao.remove(req.body.id);
 res.json({});
}
module.exports=DeleteAbl;

const wateringRecordDao = require('../../dao/watering-record-dao');

function ListAbl(req,res){
 const records = wateringRecordDao.list();
 res.json({itemList: records});
}
module.exports=ListAbl;

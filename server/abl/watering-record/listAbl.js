const wateringRecordDao = require('../../dao/watering-record-dao');

async function ListAbl(req,res){
 const records = wateringRecordDao.list();
 res.json({itemList: records});
}
module.exports=ListAbl;

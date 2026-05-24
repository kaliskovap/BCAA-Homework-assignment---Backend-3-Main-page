const plantDao = require('../../dao/plant-dao');
const wateringRecordDao = require('../../dao/watering-record-dao');

function ListAbl(req,res){
 const plants = plantDao.list();
 const result = plants.map(p=>{
 const records = wateringRecordDao.listByPlantId(p.id);
 records.sort((a,b)=> new Date(b.wateringDate)-new Date(a.wateringDate));
 return {...p,lastWatering: records[0]?.wateringDate || null};
 });
 res.json({itemList: result});
}
module.exports=ListAbl;

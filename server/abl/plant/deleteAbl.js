const plantDao = require('../../dao/plant-dao');

function DeleteAbl(req,res){
 plantDao.remove(req.body.id);
 res.json({});
}
module.exports=DeleteAbl;

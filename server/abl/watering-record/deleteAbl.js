const wateringRecordDao = require('../../dao/watering-record-dao');
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req,res){
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({
      code: "dtoInIsNotValid",
      category: "dtoIn is not valid",
      validationError: ajv.errors,
    });
    return;
  }
 wateringRecordDao.remove(req.body.id);
 res.json({});
}
module.exports=DeleteAbl;

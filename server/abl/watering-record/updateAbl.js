const wateringRecordDao = require('../../dao/watering-record-dao');
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    id: {
      type: "string"
    },
    plantId: {
      type: "string"
    },
    wateringDate: {
      type: "string"
    }
  },
  required: ["id", "plantId", "wateringDate"],
  additionalProperties: false
};

async function UpdateAbl(req, res) {
  const record = wateringRecordDao.update(req.body);

  const valid = ajv.validate(schema, record);
  if (!valid) {
    res.status(400).json({
      code: "dtoInIsNotValid",
      message: "dtoIn is not valid",
      validationError: ajv.errors,
    });
    return;
  }

  if (!record) {
    return res.status(404).json({ message: "Watering record not found" });
  }
  res.json(record);
}
module.exports=UpdateAbl;

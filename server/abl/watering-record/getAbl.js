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

async function GetAbl(req, res) {
  const record = wateringRecordDao.get(req.body.id);

  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({
      code: "dtoInIsNotValid",
      category: "dtoIn is not valid",
      validationError: ajv.errors,
    });
    return;
  }
  if (!record) {
    return res.status(404).json({ message: "Watering record not found" });
  }
  res.json(record);
}
module.exports = GetAbl;

const plantDao = require('../../dao/plant-dao');
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
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({
      code: "dtoInIsNotValid",
      category: "dtoIn is not valid",
      validationError: ajv.errors,
    });
    return;
  }
  const plant = plantDao.get(req.body.id);
  if (!plant) {
    return res.status(404).json({ message: "Plant not found" });
  }
  res.json(plant);
}
module.exports = GetAbl;

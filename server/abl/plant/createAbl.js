const plantDao = require('../../dao/plant-dao');
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 100
    },
    wateringInterval: {
      type: "integer",
      minimum: 1
    }
  },
  required: ["name", "wateringInterval"],
  additionalProperties: false
};

function CreateAbl(req, res) {
  const dtoIn = req.body;

  const data = req.body;

     const valid = ajv.validate(schema, dtoIn);

    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        validationError: ajv.errors,
      });
    }
  if (!valid) {
    return res.status(400).json({ error: validate.errors });
  }
  if (!dtoIn.name || !dtoIn.wateringInterval) {
    return res
      .status(400)
      .json({ message: "name and wateringInterval are required" });
  }
  const plant = plantDao.create(dtoIn);
  res.json(plant);
}
module.exports=CreateAbl;

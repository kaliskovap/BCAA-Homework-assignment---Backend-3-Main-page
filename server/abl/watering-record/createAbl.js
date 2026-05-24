const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();

addFormats(ajv);


const wateringRecordDao = require("../../dao/watering-record-dao");
const plantDao = require("../../dao/plant-dao");

const schema = {
  type: "object",
  required: ["plantId"],
  properties: {
    plantId: {
      type: "string",
      minLength: 32,
      maxLength: 32,
    },
    wateringDate: {
      type: "string",
      format: "date",
    },
  },
  additionalProperties: false,
};


async function CreateAbl(req, res) {
  try {
    const dtoIn = req.body;

    const valid = ajv.validate(schema, dtoIn);

    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        validationError: ajv.errors,
      });
    }

    const plant = plantDao.get(dtoIn.plantId);

    if (!plant) {
      return res.status(404).json({
        code: "plantNotFound",
        message: "Plant not found",
      });
    }

    const record = wateringRecordDao.create(dtoIn);

    res.json(record);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;

const PlantDao = require("../../dao/plant-dao");
const WateringRecordDao = require("../../dao/watering-record-dao");

async function ListToWaterAbl(req, res) {
  try {
    const plantDao = PlantDao;
    const wateringRecordDao = WateringRecordDao;

    const plantList = await plantDao.list();

    const result = [];

    for (const plant of plantList) {
      const wateringRecords =
        await wateringRecordDao.listByPlantId(
          plant.id
        );

      let lastWatering = null;

      if (wateringRecords.length > 0) {
        lastWatering = wateringRecords.sort(
          (a, b) =>
            new Date(b.wateringDate) -
            new Date(a.wateringDate)
        )[0];
      }

      const needsWater = isPlantNeedingWater(
        lastWatering,
        plant.wateringInterval
      );

      if (needsWater) {
        result.push({
          ...plant,
          lastWatering:
            lastWatering?.wateringDate || null,
        });
      }
    }

    res.json(result);
  } catch (e) {
    res.status(500).json({
      code: "failedToListPlantsToWater",
      message: e.message,
    });
  }
}

function isPlantNeedingWater(
  lastWatering,
  wateringInterval
) {
  // Rostlina ještě nikdy nebyla zalita
  if (!lastWatering) {
    return true;
  }

  const lastWateringDate = new Date(
    lastWatering.wateringDate
  );

  const today = new Date();

  const differenceInDays = Math.floor(
    (today - lastWateringDate) /
      (1000 * 60 * 60 * 24)
  );

  return differenceInDays >= wateringInterval;
}

module.exports = ListToWaterAbl;
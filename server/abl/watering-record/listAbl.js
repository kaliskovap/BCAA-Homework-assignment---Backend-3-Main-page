const PlantDao =
  require("../../dao/plant-dao");

const WateringRecordDao =
  require(
    "../../dao/watering-record-dao"
  );

async function ListAbl(
  req,
  res
) {
  try {
    console.error("LIST ABL V2");
    const plantDao =
      new PlantDao();

    const wateringRecordDao =
      new WateringRecordDao();

    const plantList =
      await plantDao.list();

    const itemList = [];

    for (const plant of plantList) {
      const wateringRecords =
        await wateringRecordDao.listByPlantId(
          plant.id
        );

      let lastWatering = null;

      if (
        wateringRecords.length > 0
      ) {
        lastWatering =
          wateringRecords.sort(
            (a, b) =>
              new Date(
                b.wateringDate
              ) -
              new Date(
                a.wateringDate
              )
          )[0];
      }

        itemList.push({
  ...plant,

  testValue: "AHOJ",

  lastWatering:
    lastWatering?.wateringDate ||
    null,

  lastWateringRecordId:
    lastWatering?.id ||
    null,
});

    }

    res.json({
      itemList,
    });
  } catch (e) {
    res.status(500).json({
      code:
        "failedToListPlants",

      message: e.message,
    });
  }
}

module.exports = ListAbl;

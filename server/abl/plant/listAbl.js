const plantDao = require("../../dao/plant-dao");
const wateringRecordDao = require("../../dao/watering-record-dao");

async function ListAbl(
  req,
  res
) {
    console.info("LIST ABL CALLED");
  const plants =
    plantDao.list();

  const result =
    plants.map((p) => {
      const records =
        wateringRecordDao.listByPlantId(
          p.id
        );

      records.sort(
        (a, b) =>
          new Date(
            b.wateringDate
          ) -
          new Date(
            a.wateringDate
          )
      );

      const lastRecord =
        records[0];
console.info({
  plant: p.name,
  lastWatering:
    lastRecord?.wateringDate,

  lastWateringRecordId:
    lastRecord?.id,
});
      return {
        ...p,

        lastWatering:
          lastRecord
            ?.wateringDate ||
          null,

        lastWateringRecordId:
          lastRecord?.id ||
          null,
      };
    });

  res.json({
    itemList: result,
  });
}

module.exports = ListAbl;

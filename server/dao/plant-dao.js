const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const plantFolderPath = path.join(__dirname, "storage", "plantList");


function get(plantId) {
  try {
    const filePath = path.join(plantFolderPath, `${plantId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadPlant", plant: error.plant };
  }
}

function create(plant) {
  try {
    const plantList = list();
    if (plantList.some((item) => item.name === plant.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: "exists plant with given name",
      };
    }
    plant.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(plantFolderPath, `${plant.id}.json`);
    const fileData = JSON.stringify(plant);
    fs.writeFileSync(filePath, fileData, "utf8");
    return plant;
  } catch (error) {
    throw { code: "failedToCreatePlant", plant: error.plant };
  }
}

function update(plant) {
  try {
    const currentPlant = get(plant.id);
    if (!currentPlant) return null;

    if (plant.name && plant.name !== currentPlant.name) {
      const plantList = list();
      if (plantList.some((item) => item.name === plant.name)) {
        throw {
          code: "uniqueNameAlreadyExists",
          message: "exists plant with given name",
        };
      }
    }

    const newPlant = { ...currentPlant, ...plant };
    const filePath = path.join(plantFolderPath, `${plant.id}.json`);
    const fileData = JSON.stringify(newPlant);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newPlant;
  } catch (error) {
    throw { code: "failedToUpdatePlant", plant: error.plant };
  }
}

// Method to remove an plant from a file
function remove(plantId) {
  try {
    const filePath = path.join(plantFolderPath, `${plantId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemovePlant", plant: error.plant };
  }
}

// Method to list plants in a folder
function list() {
  try {
    const files = fs.readdirSync(plantFolderPath);
    const plantList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(plantFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return plantList;
  } catch (error) {
    throw { code: "failedToListPlants", plant: error.plant };
  }
}

// get plantMap
function getPlantMap() {
  const plantMap = {};
  const plantList = list();
  plantList.forEach((plant) => {
    plantMap[plant.id] = plant;
  });
  return plantMap;
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  getPlantMap,
};

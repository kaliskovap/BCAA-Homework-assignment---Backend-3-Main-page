const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const storagePath = path.join(__dirname, "storage", "wateringRecordList");

function get(id) {
  try {
    const filePath = path.join(storagePath, `${id}.json`);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

function create(record) {
  record.id = crypto.randomBytes(16).toString("hex");

  const filePath = path.join(storagePath, `${record.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(record), "utf8");

  return record;
}

function update(record) {
  const currentRecord = get(record.id);

  if (!currentRecord) return null;

  const updatedRecord = { ...currentRecord, ...record };

  const filePath = path.join(storagePath, `${record.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(updatedRecord), "utf8");

  return updatedRecord;
}

function remove(id) {
  try {
    const filePath = path.join(storagePath, `${id}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

function list() {
  const files = fs.readdirSync(storagePath);

  return files.map((file) => {
    const fileData = fs.readFileSync(path.join(storagePath, file), "utf8");
    return JSON.parse(fileData);
  });
}

function listByPlantId(plantId) {
  return list().filter((item) => item.plantId === plantId);
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  listByPlantId,
};

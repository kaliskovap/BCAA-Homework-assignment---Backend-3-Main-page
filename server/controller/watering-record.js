const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/watering-record/getAbl");
const ListAbl = require("../abl/watering-record/listAbl");
const CreateAbl = require("../abl/watering-record/createAbl");
const UpdateAbl = require("../abl/watering-record/updateAbl");
const DeleteAbl = require("../abl/watering-record/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;

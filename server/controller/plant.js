const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/plant/getAbl");
const ListAbl = require("../abl/plant/listAbl");
const CreateAbl = require("../abl/plant/createAbl");
const UpdateAbl = require("../abl/plant/updateAbl");
const DeleteAbl = require("../abl/plant/deleteAbl");
const ListToWaterAbl = require("../abl/plant/listToWaterAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.get("/list-to-water", ListToWaterAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);


module.exports = router;

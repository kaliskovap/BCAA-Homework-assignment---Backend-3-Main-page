const express = require("express");
const app = express();
const port = 8888;

const plantController = require("./controller/plant");
const wateringRecordController = require("./controller/watering-record");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Plant watering app backend running");
});

app.use("/plant", plantController);
app.use("/watering-record", wateringRecordController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const express = require("express");
const ConvertHandler = require("../controllers/convertHandler");

const router = express.Router();
const convertHandler = new ConvertHandler();

router.get("/convert", (req, res) => {
  const input = req.query.input;

  const num = convertHandler.getNum(input);
  const unit = convertHandler.getUnit(input);

  if (num === "invalid number" && unit === "invalid unit") {
    return res.json({ error: "invalid number and unit" });
  } else if (num === "invalid number") {
    return res.json({ error: "invalid number" });
  } else if (unit === "invalid unit") {
    return res.json({ error: "invalid unit" });
  }

  const returnNum = convertHandler.convert(num, unit);
  const returnUnit = convertHandler.getReturnUnit(unit);
  const string = convertHandler.getString(num, unit, returnNum, returnUnit);

  res.json({ initNum: num, initUnit: unit, returnNum, returnUnit, string });
});

module.exports = router;

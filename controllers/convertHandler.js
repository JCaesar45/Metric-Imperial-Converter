function ConvertHandler() {
  const unitsMap = {
    gal: { returnUnit: "L", factor: 3.78541 },
    L: { returnUnit: "gal", factor: 1 / 3.78541 },
    mi: { returnUnit: "km", factor: 1.60934 },
    km: { returnUnit: "mi", factor: 1 / 1.60934 },
    lbs: { returnUnit: "kg", factor: 0.453592 },
    kg: { returnUnit: "lbs", factor: 1 / 0.453592 },
  };

  const spellOutUnit = {
    gal: "gallons",
    L: "liters",
    mi: "miles",
    km: "kilometers",
    lbs: "pounds",
    kg: "kilograms",
  };

  this.getNum = function (input) {
    let result = input.match(/^[\d/.]+/);
    if (!result) return 1;

    const number = result[0];
    const countSlashes = (number.match(/\//g) || []).length;
    if (countSlashes > 1) return "invalid number";

    try {
      return eval(number);
    } catch {
      return "invalid number";
    }
  };

  this.getUnit = function (input) {
    const match = input.match(/[a-zA-Z]+$/);
    if (!match) return "invalid unit";
    const unit = match[0].toLowerCase() === "l" ? "L" : match[0].toLowerCase();
    return unitsMap[unit] ? unit : "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    return unitsMap[initUnit]?.returnUnit || "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    return spellOutUnit[unit];
  };

  this.convert = function (initNum, initUnit) {
    return parseFloat((initNum * unitsMap[initUnit].factor).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;

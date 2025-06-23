const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const convertHandler = new ConvertHandler();

describe("Unit Tests", function () {
  it("Whole number input", () => {
    assert.strictEqual(convertHandler.getNum("32L"), 32);
  });

  it("Decimal number input", () => {
    assert.strictEqual(convertHandler.getNum("3.2mi"), 3.2);
  });

  it("Fractional input", () => {
    assert.strictEqual(convertHandler.getNum("1/2km"), 0.5);
  });

  it("Fractional input with decimal", () => {
    assert.strictEqual(convertHandler.getNum("5.4/3kg"), 1.8);
  });

  it("Double fraction error", () => {
    assert.strictEqual(convertHandler.getNum("3/2/3kg"), "invalid number");
  });

  it("Default to 1 when no number", () => {
    assert.strictEqual(convertHandler.getNum("kg"), 1);
  });

  it("Each valid input unit", () => {
    ["gal", "L", "mi", "km", "lbs", "kg"].forEach((u) =>
      assert.strictEqual(convertHandler.getUnit(`3${u}`), u)
    );
  });

  it("Invalid input unit", () => {
    assert.strictEqual(convertHandler.getUnit("3megagram"), "invalid unit");
  });

  it("Correct return unit", () => {
    assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
  });

  it("Spelled out string unit", () => {
    assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
  });

  it("Convert gal to L", () => {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.1);
  });

  it("Convert L to gal", () => {
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.1);
  });

  it("Convert mi to km", () => {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.1);
  });

  it("Convert km to mi", () => {
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.1);
  });

  it("Convert lbs to kg", () => {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.1);
  });

  it("Convert kg to lbs", () => {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.1);
  });
});

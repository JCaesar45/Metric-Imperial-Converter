const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);
const assert = chai.assert;

describe("Functional Tests", function () {
  it("Convert valid input (10L)", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        done();
      });
  });

  it("Invalid unit (32g)", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "32g" })
      .end((err, res) => {
        assert.deepEqual(res.body, { error: "invalid unit" });
        done();
      });
  });

  it("Invalid number (3/7.2/4kg)", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end((err, res) => {
        assert.deepEqual(res.body, { error: "invalid number" });
        done();
      });
  });

  it("Invalid number AND unit", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegagram" })
      .end((err, res) => {
        assert.deepEqual(res.body, { error: "invalid number and unit" });
        done();
      });
  });

  it("Convert with no number (kg)", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "kg" })
      .end((err, res) => {
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        done();
      });
  });
});

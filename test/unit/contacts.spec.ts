import "mocha";
import { assert } from "chai";
import * as request from "supertest";

import app = require("../../app");

describe("API tests", () => {
  let contact = require("../../contact.json");
  describe("Create a contact", () => {
    it("should create a contact", () => {
      request(app)
        .post("/contacts")
        .send(contact)
        .expect(200)
        .end((err, res) => {
          assert.deepEqual(res.body.name, contact.name);
          assert.equal(res.status, 200);
          contact = res.body;
        });
    });

    it("should generate a contact id", () => {
      request(app)
        .post("/contacts")
        .send(contact)
        .expect((res) => {
          assert.equal(res.body.name, contact.name);
          assert.isNumber(res.body.id);
        })
        .expect(200);
    });
  });

  describe("Get a contact", () => {
    it("should return a list of contacts", () => {
      request(app)
        .get("/contacts")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          assert.isArray(res.body);
          assert.equal(res.status, 200);
        });
    });
  });

  describe("Get a contact by id", () => {
    it("should return a contact", () => {
      request(app)
        .get("/contacts/" + contact.id)
        .expect(200)
        .end((err, res) => {
          assert.deepEqual(res.body.name, contact.name);
          assert.equal(res.status, 200);
        });
    });

    it("should not return a contact if id not found", () => {
      request(app)
        .get("/contacts/300")
        .expect(404)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.text, "Sorry, couldn't find that");
        });
    });
  });

  describe("put", () => {
    it("should update a contact", () => {
      const testData = { email: "updated@gmail.com" };
      request(app)
        .put("/contacts/" + contact.id)
        .send(testData)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
        });
    });
  });

  describe("delete", () => {
    it("should delete a contact", () => {
      request(app)
        .delete("/contacts/" + contact.id)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body, 1);
          assert.equal(res.status, 200);
        });
    });
  });
});

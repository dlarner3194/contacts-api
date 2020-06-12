import { Router } from "express";
const router = Router();

/* GET home page. */
const indexRouter = (): Router => {
  return router.get("/", function (req, res, next) {
    res.send(
      `
      Please make a request.\nYou can make requests using the command line (curl, httpie, etc.)

      For example:

        (Listing call) curl -X GET http://localhost:3000/
        (Get a contact) curl -X GET http://localhost:3000/contacts/1
        (Create a contact) curl -X POST -H "Content-Type: application/json" -d @./contact.json http://localhost:3000/contacts
        (Update a contact) curl -X PUT -H "Content-Type: application/json" -d '{"email": "updatedemail@mail.com"}' http://localhost:3000/contacts/84
        (Remove a contact) curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/contacts/84
      `
    );
  });
};

export { indexRouter };

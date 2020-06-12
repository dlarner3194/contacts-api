import * as express from "express";
import { Request, Response } from "express";

import { ContactType } from "../types";
import * as DataStore from "nedb";
const db = new DataStore<ContactType>({ inMemoryOnly: true });

interface IControllerBase {
  initRoutes(): any;
}

export class ContactsController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.get);
    this.router.get("/:id", this.getById);
    this.router.post("/", this.post);
    this.router.put("/:id", this.put);
    this.router.delete("/:id", this.delete);
  }

  get = (req: Request, res: Response) => {
    const data = db.getAllData();

    if (!data) {
      res.status(400).send("Sorry, can't find any data.");
    }

    res.status(200).send(data);
  };

  getById = (req: Request, res: Response) => {
    db.findOne({ id: parseInt(req.params.id, 10) }, function (err, doc) {
      if (err || doc === null) {
        res.status(404).send("Sorry, couldn't find that");
      } else {
        res.json(doc);
      }
    });
  };

  post = (req: Request, res: Response) => {
    const data = { ...req.body, id: Math.floor(Math.random() * 100) };
    db.insert<ContactType>(data, function (err, doc) {
      if (err) {
        res.status(400).send("Sorry, there was an issue with your request");
      } else {
        res.json(doc);
      }
    });
  };

  put = (req: Request, res: Response) => {
    db.update(
      { id: parseInt(req.params.id, 10) },
      { $set: { ...req.body } },
      { upsert: true },
      function (err, doc) {
        if (err) {
          res.status(400).send("Sorry, there was an issue with your request");
        } else {
          res.json(doc);
        }
      }
    );
  };

  delete = (req: Request, res: Response) => {
    db.remove({ id: parseInt(req.params.id, 10) }, { multi: true }, function (
      err,
      numRemoved
    ) {
      if (err) {
        res.status(400).send("Sorry, there was an issue with your request");
      }
      res.json(numRemoved);
    });
  };
}

export default ContactsController;

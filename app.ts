import createError = require("http-errors");
import * as express from "express";
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

import { indexRouter } from "./routes/index";
import { ContactsController } from "./routes/contacts";

const app: express.Application = express();

// view engine setup
const setupViewEngine = () => {
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");
  return app;
};

// asset setup
const setupAssets = () => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  return app;
};

// route setup
const setupRoutes = () => {
  app.use("/", indexRouter());
  app.use("/contacts", new ContactsController().router);
  return app;
};

// error handlers setup
const setupErrorHandlers = () => {
  // catch 404 and forward to error handler
  app.use(function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    next(createError(404));
  });

  // error handler
  app.use(function (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  return app;
};

setupViewEngine();
setupAssets();
setupRoutes();
setupErrorHandlers();

export = app;

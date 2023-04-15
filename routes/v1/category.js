const express = require("express");

const {isAdmin} = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("../../controllers/v1/category");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, isAdmin , controller.create)
  .get(controller.getAll);

router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdmin , controller.remove)
  .put(authenticatedMiddleware, isAdmin , controller.update);

module.exports = router;

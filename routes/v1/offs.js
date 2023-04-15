const express = require("express");

const {isAdmin} = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("../../controllers/v1/off");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, isAdmin , controller.create)
  .get(authenticatedMiddleware, isAdmin , controller.getAll);

router.route("/all").post(authenticatedMiddleware, isAdmin , controller.setOnAll);

router.route("/:code").post(authenticatedMiddleware, controller.getOne);

router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdmin , controller.remove);

module.exports = router;

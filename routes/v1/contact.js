const express = require("express");

const controller = require("../../controllers/v1/contact");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const {isAdmin} = require("../../middlewares/isAdmin");

const router = express.Router();

router.route("/").get(controller.getAll).post(controller.create);
router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdmin , controller.remove);

router
  .route("/answer")
  .post(authenticatedMiddleware, isAdmin , controller.asnwer);

module.exports = router;

const express = require("express");
const controller = require("../../controllers/v1/search");
const { resetCollections } = require("../../util/resetAll");

const router = express.Router();

router.route("/").get(resetCollections);
router.route("/:value").get(controller.get);

module.exports = router;

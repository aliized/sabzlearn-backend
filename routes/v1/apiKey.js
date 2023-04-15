const express = require("express");
const {
  getApiKeyByEmail,
  generateApiKey,
} = require("../../controllers/v1/apiKey");

const authenticatedMiddleware = require("../../middlewares/authenticated");
const { isSuperUser } = require("../../middlewares/isAdmin");

const router = express.Router();

router.route("/").post(authenticatedMiddleware, isSuperUser, generateApiKey);
router
  .route("/:email")
  .get(authenticatedMiddleware, isSuperUser, getApiKeyByEmail);

module.exports = router;

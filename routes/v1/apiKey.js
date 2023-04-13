const express = require("express");
const {
  getApiKeyByEmail,
  generateApiKey,
} = require("../../controllers/v1/apiKey");

const authenticatedMiddleware = require("../../middlewares/authenticated");
const isAdminMiddleware = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, isAdminMiddleware, generateApiKey);
router
  .route("/:email")
  .get(authenticatedMiddleware, isAdminMiddleware, getApiKeyByEmail);

module.exports = router;

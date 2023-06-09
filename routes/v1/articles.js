const express = require("express");
const multer = require("multer");

const articleController = require("../../controllers/v1/articleController");
const multerStorage = require("../../util/multerStorage");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const {isAdmin} = require("../../middlewares/isAdmin");

const router = express.Router();

// router.use(authenticatedMiddleware);

router
  .route("/")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "cover"
    ),
    authenticatedMiddleware,
    isAdmin ,
    articleController.create
  )
  .get(articleController.getAll);

router.route("/:shortName").get(articleController.getOne);

router
  .route("/draft")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "cover"
    ),
    authenticatedMiddleware,
    isAdmin ,
    articleController.saveDraft
  );

router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdmin , articleController.remove);

module.exports = router;

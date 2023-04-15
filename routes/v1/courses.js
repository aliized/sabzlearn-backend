const express = require("express");
const multer = require("multer");

const courseController = require("../../controllers/v1/course");
const multerStorage = require("../../util/multerStorage");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const {isAdmin} = require("../../middlewares/isAdmin");
const loginUser = require("../../middlewares/loginUser");

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
    courseController.create
  )
  .get(courseController.getAll);

router
  .route("/category/:categoryName")
  .get(courseController.getCategoryCourses);

router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdmin , courseController.remove)
  .put(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "cover"
    ),
    authenticatedMiddleware,
    isAdmin ,
    courseController.update
  );

router
  .route("/:id/sessions")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "video"
    ),
    authenticatedMiddleware,
    isAdmin ,
    courseController.createSession
  );

router.route("/sessions").get(courseController.getAllSessions);

router
  .route("/sessions/:id")
  .delete(
    authenticatedMiddleware,
    isAdmin ,
    courseController.removeSession
  );

router.route("/related/:shortName").get(courseController.getRelated);

router
  .route("/:shortName/:sessionID")
  .get(authenticatedMiddleware, courseController.getSessionInfo);

router.route("/presell").get(courseController.getAll);
router.route("/popular").get(courseController.getAll);

router
  .route("/:shortName")
  .get(loginUser, courseController.getOne);

router
  .route("/:id/register")
  .post(authenticatedMiddleware, courseController.register);

module.exports = router;

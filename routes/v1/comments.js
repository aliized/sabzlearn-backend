const express = require("express");

const commentController = require("../../controllers/v1/comment");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const {isAdmin} = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, commentController.create)
  .get(commentController.getAll);

router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdmin , commentController.remove);

router
  .route("/answer/:id")
  .post(authenticatedMiddleware, isAdmin , commentController.answer);

router
  .route("/accept/:id")
  .put(authenticatedMiddleware, isAdmin , commentController.accept);

  router
  .route("/reject/:id")
  .put(authenticatedMiddleware, isAdmin , commentController.reject);

// router
//   .route("/:id/sessions")
//   .post(isAdmin , commentController.createSession);

// router.route("/:id/register").post(commentController.register);

module.exports = router;

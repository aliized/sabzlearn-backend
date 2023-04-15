const express = require("express");

const userController = require("../../controllers/v1/user");
const {isAdmin} = require("../../middlewares/isAdmin");
const isAuthenticated = require("../../middlewares/authenticated");

const router = express.Router();

// router.use(authenticatedMiddleware);

router
  .route("/")
  //   .post(
  //     // multer({ storage: multerStorage }).single('cover'),
  //     authenticatedMiddleware,
  //     isAdmin ,
  //     courseController.create
  //   )
  .get(isAuthenticated, isAdmin , userController.getAll)
  .put(isAuthenticated, userController.updateUser);

router
  .route("/:id")
  .delete(isAuthenticated, isAdmin , userController.removeUser)
  .put(isAuthenticated, isAdmin , userController.editUser);

router
  .route("/ban/:id")
  .put(isAuthenticated, isAdmin , userController.banUser);

router.route("/courses").get(isAuthenticated, userController.getUserCourses);
router
  .route("/role")
  .put(isAuthenticated, isAdmin , userController.changeUserRole);

module.exports = router;

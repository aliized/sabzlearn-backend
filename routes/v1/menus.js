const express = require('express');

const {isAdmin} = require('../../middlewares/isAdmin');
const authenticatedMiddleware = require('../../middlewares/authenticated');
const controller = require('../../controllers/v1/menu');

const router = express.Router();

router
  .route('/')
  .get(controller.getAll)
  .post(authenticatedMiddleware, isAdmin , controller.create);

  router.get('/all', controller.getAllPanelMenus)
  router.get('/topbar', controller.getAllTopbarLinks)

  router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdmin , controller.remove)

module.exports = router;

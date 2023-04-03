const courseUserModel = require("../../models/course-user");

exports.getAll = async (req, res, next) => {
  try {
    const allOrders = await courseUserModel
      .find({ user: req.user._id })
      .populate("course")
      .lean();

    res.json(allOrders);
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const mainOrder = await courseUserModel
      .find({ _id: req.params.id })
      .populate("course")
      .lean();

    res.json(mainOrder);
  } catch (error) {
    next(error);
  }
};

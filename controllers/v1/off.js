const offModel = require("../../models/off");
const courseModel = require("../../models/course");

exports.create = async (req, res, next) => {
  try {
    const { code, percent, course, max } = req.body;

    const newOff = await offModel.create({
      code,
      percent,
      course,
      max,
      uses: 0,
      creator: req.user._id,
    });

    return res.status(201).json(newOff);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const allOffs = await offModel
      .find()
      .populate("creator", "-password")
      .lean();

    const offs = [];

    allOffs.forEach((off) => {
      offs.push({
        ...off,
        creator: off.creator.name,
      });
    });

    res.json(offs);
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { course } = req.body;

    console.log(code, course);
    const off = await offModel.findOne({ code, course }).lean();

    if (!off) {
      return res.status(404).json({ message: "Code is not valid" });
    } else if (off.max === off.uses) {
      return res.status(409).json({ message: "This code already used." });
    } else {
      await offModel.findOneAndUpdate(
        { code, course },
        {
          uses: off.uses + 1,
        }
      );
      return res.json(off);
    }
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deletedOff = await offModel.findOneAndRemove({
      _id: req.params.id,
    });
    if (!deletedOff) {
      return res.status(404).json({ message: "Off Code Not Found!" });
    }
    return res.json(deletedOff);
  } catch (error) {
    next(error);
  }
};

exports.setOnAll = async (req, res, next) => {
  try {
    const { discount } = req.body;

    console.log(discount);

    const setDiscountsOnCourses = await courseModel.updateMany({
      discount,
    });
    console.log();
    return res.json({ msg: "Discounts set successfully ✌️" });
  } catch (error) {
    next(error);
  }
};

const articleModel = require("../../models/article");

exports.create = async (req, res, next) => {
  try {
    const { title, description, body, shortName, categoryID } = req.body;
    const cover = req.file;

    await articleModel.validation({ ...req.body, cover }).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const article = await articleModel.create({
      title,
      description,
      shortName,
      body,
      creator: req.user._id,
      categoryID,
      cover: req.file.filename,
      publish: 1,
    });

    const populatedCourse = await articleModel
      .findById(article._id)
      .populate("creator", "-password");

    return res.status(201).json(populatedCourse);
  } catch (error) {
    next(error);
  }
};

exports.saveDraft = async (req, res, next) => {
  try {
    const { title, description, body, shortName, categoryID } = req.body;

    const cover = req.file;
    await articleModel.validation({ ...req.body, cover }).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const article = await articleModel.create({
      title,
      description,
      shortName,
      body,
      creator: req.user._id,
      categoryID,
      cover: req.file.filename,
      publish: 0,
    });

    const populatedCourse = await articleModel
      .findById(article._id)
      .populate("creator", "-password");

    return res.status(201).json(populatedCourse);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const articles = await articleModel
      .find()
      .populate("creator", "-password")
      .sort({ _id: -1 });
    return res.json(articles);
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const article = await articleModel
      .findOne({ shortName: req.params.shortName })
      .populate("categoryID")
      .populate("creator", "-password")
      .lean();

    res.json(article);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deletedArticle = await articleModel.findOneAndRemove({
      _id: req.params.id,
    });
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article Not Found!" });
    }
    return res.json(deletedArticle);
  } catch (error) {
    next(error);
  }
};

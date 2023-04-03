const newsletterModel = require("../../models/newsletter");

exports.create = async (req, res, next) => {
  try {
    const { email } = req.body;

    const newEmail = await newsletterModel.create({ email });

    return res.status(201).json(newEmail);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const allEmails = await newsletterModel.find();
    res.json(allEmails);
  } catch (error) {
    next(error);
  }
};

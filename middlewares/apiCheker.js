const apiKeyModel = require("../models/apiKey");

const apiChecker = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    const keys = await apiKeyModel.find();

    if (!keys) {
      return next();
    } else {
      console.log(req);
      return res.status(401).json({ message: "API key is missing" });
    }
  }

  try {
    const apiKeyDoc = await apiKeyModel.findOne({ key: apiKey });
    if (!apiKeyDoc) {
      return res.status(401).json({ message: "API key is invalid" });
    }
    req.apiKeyDoc = apiKeyDoc;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = apiChecker;

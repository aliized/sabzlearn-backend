const nodemailer = require("nodemailer");
const apiKeyModel = require("../../models/apiKey");

const generateRandomKey = () => {
  const length = 32;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
};

const generateApiKey = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validate request body
    await apiKeyModel.generatorValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const isApiExists = await apiKeyModel.findOne({
      email,
    });

    if (isApiExists) {
      return res.status(409).json({
        message: "email is duplicate.",
      });
    }

    // Generate API key
    const key = generateRandomKey();

    // Save API key and email address to database
    const generatedApiKey = await apiKeyModel.create({
      key,
      email,
    });

    // Send email to backend with API key

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sabzlearnir@gmail.com",
        // pass: "h z v g l t m f l s y v z p h q",
        pass: "r t f p n x v q j x x o p x a o",
      },
    });

    const mailOptions = {
      from: "sabzlearnir@gmail.com",
      to: email,
      subject: "SabzLearn API Key",
      text: `A new API key has been generated for (${email}): ${key}`,
    };
    await transporter.sendMail(mailOptions);
    const apikey = key;
    res.status(201).json({ apikey });
  } catch (error) {
    next(error);
  }
};

const getApiKeyByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    // Retrieve API key from database based on email address
    const key = await apiKeyModel.findOne({ email });
    if (!key) {
      throw new Error("Email not found");
    }
    const apikey = key.key;
    res.status(200).json({ apikey });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateApiKey, getApiKeyByEmail };

const mongoose = require("mongoose");
const { generateApiKeyValidator } = require("../validators/v1/apiKey");


const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
});

//* add yup validation method to mongoose statics
apiKeySchema.statics.generatorValidation = function (body) {
  return generateApiKeyValidator.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("ApiKey", apiKeySchema);

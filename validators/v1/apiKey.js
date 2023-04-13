const yup = require("yup");

const generateApiKeyValidator = yup.object().shape({
  email: yup.string().email("فرمت ایمیل وارد شده صحیح نیست").required("ایمیل الزامی است"),
});

module.exports = { generateApiKeyValidator };

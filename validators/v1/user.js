const yup = require("yup");

const removeUserValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه کاربر الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست"),
});

const banUserValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه کاربر الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست"),
});

const updateUserValidator = yup.object().shape({
  name: yup.string().required("نام الزامی است"),
  username: yup.string().required("نام کاربری الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  phone: yup
    .string()
    .required("شماره تلفن همراه الزامی است")
    .matches(/^09[0-9]{9}$/, "شماره تلفن همراه معتبر نیست"),
});

const changeUserRoleValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه کاربر الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست"),
  role: yup
    .string()
    .oneOf(["ADMIN", "USER"], "نقش کاربر باید یکی از مقادیر ADMIN و USER باشد")
    .required("نقش کاربر الزامی است"),
});

module.exports = {
  removeUserValidator,
  banUserValidator,
  updateUserValidator,
  changeUserRoleValidator,
};

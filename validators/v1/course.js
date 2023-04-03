const yup = require("yup");

const createCourseValidator = yup.object().shape({
  name: yup.string().required("نام دوره الزامی است"),
  description: yup.string().required("توضیحات دوره الزامی است"),
  cover: yup.string(),
  support: yup.string(),
  shortName: yup.string().required("نام کوتاه دوره الزامی است"),
  price: yup.number().required("قیمت دوره الزامی است").min(0),
  status: yup
    .string()
    .required("وضعیت دوره الزامی است")
    .oneOf(["draft", "published", "rejected"], "وضعیت باید یکی از این 3 حالت باشد draft و rejected و published"),
  discount: yup.number().required("تخفیف دوره الزامی است").min(0).max(100),
  categoryID: yup
    .string()
    .required("شناسه دسته‌بندی الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه دسته‌بندی معتبر نیست"),
});

module.exports = {
  createCourseValidator,
};

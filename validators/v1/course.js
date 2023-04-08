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
    .oneOf(
      ["start", "presell"],
      "وضعیت باید یکی از این 2 حالت باشد start و presell"
    ),
  discount: yup
    .number()
    .min(0, "تخفیف دوره نمی‌تواند منفی باشد")
    .max(100, "تخفیف دوره نمی‌تواند بیشتر از ۱۰۰ درصد باشد"),
  categoryID: yup
    .string()
    .required("شناسه دسته‌بندی الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه دسته‌بندی معتبر نیست"),
});

const getOneValidator = yup.object().shape({
  params: yup.object().shape({
    shortName: yup.string().required("نام کوتاه دوره الزامی است"),
  }),
});
const createSessionValidator = yup.object().shape({
  title: yup.string().required("عنوان جلسه الزامی است"),
  time: yup.number().required("زمان جلسه الزامی است"),
  free: yup.boolean().required("وضعیت رایگان/غیررایگان الزامی است"),
  id: yup
    .string()
    .required("شناسه دوره الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه دوره معتبر نیست"),
  video: yup
    .mixed()
    .required("فایل ویدیوی جلسه الزامی است")
    .test(
      "fileSize",
      "حجم فایل ویدیوی جلسه نباید بیشتر از 50 مگابایت باشد",
      (value) => {
        if (!value) return true;
        return value.size <= 50 * 1024 * 1024;
      }
    )
    .test("fileType", "فرمت فایل ویدیوی جلسه معتبر نیست", (value) => {
      if (!value) return true;
      return ["video/mp4", "video/webm"].includes(value.type);
    }),
});

const registerValidator = yup.object().shape({
  price: yup
    .number()
    .typeError("قیمت باید عددی باشد")
    .required("قیمت الزامی است")
    .min(0, "قیمت نمی‌تواند کمتر از صفر باشد"),
});

const getCategoryCoursesValidator = yup.object().shape({
  params: yup.object().shape({
    categoryName: yup.string().required("نام دسته‌بندی الزامی است"),
  }),
});

const removeCourseValidator = yup.object().shape({
  params: yup.object().shape({
    id: yup
      .string()
      .required("شناسه دوره الزامی است")
      .matches(/^[0-9a-fA-F]{24}$/, "شناسه دوره معتبر نیست"),
  }),
});
const removeSessionValidator = yup.object().shape({
  params: yup.object().shape({
    id: yup
      .string()
      .required("شناسه جلسه الزامی است")
      .matches(/^[0-9a-fA-F]{24}$/, "شناسه جلسه معتبر نیست"),
  }),
});

const getSessionInfoValidator = yup.object().shape({
  shortName: yup.string().required("نام کوتاه دوره الزامی است"),
  sessionID: yup
    .string()
    .required("شناسه جلسه الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه جلسه معتبر نیست"),
});

const getRelatedValidator = yup.object().shape({
  shortName: yup.string().required("نام کوتاه دوره الزامی است"),
});

module.exports = {
  createCourseValidator,
  getOneValidator,
  createSessionValidator,
  registerValidator,
  getCategoryCoursesValidator,
  removeCourseValidator,
  removeSessionValidator,
  getSessionInfoValidator,
  getRelatedValidator,
};

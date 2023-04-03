const mongoose = require("mongoose");
const { createCourseValidator } = require("../validators/v1/course");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    support: {
      type: String,
      required: false,
    },
    shortName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isComplete: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

courseSchema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "course",
});

courseSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "course",
});


//* add yup validation method to mongoose statics
courseSchema.statics.createValidation = function (body) {
  return createCourseValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Course", courseSchema);

module.exports = model;

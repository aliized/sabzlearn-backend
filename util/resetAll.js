//* Database Models
const articleModel = require("../models/article");
const banUserModel = require("../models/ban-phone");
const categoryModel = require("../models/category");
const commentModel = require("../models/comment");
const contactModel = require("../models/contact");
const courseModel = require("../models/course");
const courseUserModel = require("../models/course-user");
const departmentModel = require("../models/department");
const departmentSubModel = require("../models/department-sub");
const infoModel = require("../models/infos");
const newsletterModel = require("../models/newsletter");
const notificationModel = require("../models/notification");
const offModel = require("../models/off");
const sessionModel = require("../models/session");
const ticketModel = require("../models/ticket");
const userModel = require("../models/user");

//* Database Backups
const articlesData = require("../database/articles.json");
const coursesData = require("../database/courses.json");
const banUsersData = require("../database/banusers.json");
const categoriesData = require("../database/categories.json");
const commentsData = require("../database/comments.json");
const contactsData = require("../database/contacts.json");
const courseUsersData = require("../database/courseusers.json");
const departmentsData = require("../database/departments.json");
const departmentSubsData = require("../database/departmentsubs.json");
const infosData = require("../database/infos.json");
const newslettersData = require("../database/newsletters.json");
const notificationsData = require("../database/notifications.json");
const offsData = require("../database/offs.json");
const sessionsData = require("../database/sessions.json");
const ticketsData = require("../database/tickets.json");
const usersData = require("../database/users.json");

// Reset the collections by deleting all documents and creating new ones
async function resetCollections() {
  try {
    // Delete all documents from each collection
    await banUserModel.deleteMany({});
    await articleModel.deleteMany({});
    await categoryModel.deleteMany({});
    await commentModel.deleteMany({});
    await contactModel.deleteMany({});
    await courseModel.deleteMany({});
    await courseUserModel.deleteMany({});
    await departmentModel.deleteMany({});
    await departmentSubModel.deleteMany({});
    await infoModel.deleteMany({});
    await newsletterModel.deleteMany({});
    await notificationModel.deleteMany({});
    await offModel.deleteMany({});
    await sessionModel.deleteMany({});
    await ticketModel.deleteMany({});
    await userModel.deleteMany({});

    // Load the initial data into each collection

    await banUserModel.insertMany(banUsersData);
    await articleModel.insertMany(articlesData);
    await categoryModel.insertMany(categoriesData);
    await commentModel.insertMany(commentsData);
    await contactModel.insertMany(contactsData);
    await courseModel.insertMany(coursesData);
    await courseUserModel.insertMany(courseUsersData);
    await departmentModel.insertMany(departmentsData);
    await departmentSubModel.insertMany(departmentSubsData);
    await infoModel.insertMany(infosData);
    await newsletterModel.insertMany(newslettersData);
    await notificationModel.insertMany(notificationsData);
    await offModel.insertMany(offsData);
    await sessionModel.insertMany(sessionsData);
    await ticketModel.insertMany(ticketsData);
    await userModel.insertMany(usersData);

    console.log(
      `Database reseted successfully at ${new Date(
        Date.now()
      ).toLocaleString()}! `
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  resetCollections,
};

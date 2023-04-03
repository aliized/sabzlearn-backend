const departmentModel = require("../../models/department");
const departmentSubModel = require("../../models/department-sub");
const ticketModel = require("../../models/ticket");
const courseModel = require("../../models/course");

exports.create = async (req, res, next) => {
  try {
    const { departmentID, departmentSubID, title, priority, body, course } =
      req.body;

    const ticket = await ticketModel.create({
      departmentID,
      departmentSubID,
      title,
      body,
      priority,
      user: req.user._id,
      answer: 0,
      isAnswer: 0,
      course,
    });

    const mainTicket = await ticketModel
      .findOne({ _id: ticket._id })
      .populate("departmentID")
      .populate("departmentSubID")
      .populate("user");

    return res.status(201).json(mainTicket);
  } catch (error) {
    next(error);
  }
};

exports.userTickets = async (req, res, next) => {
  try {
    const tickets = await ticketModel
      .find({ user: req.user._id })
      .sort({ _id: -1 })
      .populate("departmentID")
      .populate("departmentSubID")
      .populate("user")
      .lean();

    let ticketsArray = [];

    tickets.forEach((ticket) => {
      if (ticket.isAnswer === 0) {
        ticketsArray.push({
          ...ticket,
          departmentID: ticket.departmentID.title,
          departmentSubID: ticket.departmentSubID.title,
          user: ticket.user.name,
        });
      }
    });

    return res.json(ticketsArray);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const tickets = await ticketModel
      .find({ isAnswer: 0 })
      .populate("user")
      .populate("course")
      .populate("departmentID")
      .populate("departmentSubID")
      .lean();

    let ticketsArray = [];

    tickets.forEach(async (ticket) => {
      if (ticket.isAnswer === 0) {
        ticketsArray.push({
          ...ticket,
          departmentID: ticket.departmentID.title,
          departmentSubID: ticket.departmentSubID.title,
          user: ticket.user.name,
          course: ticket.course ? ticket.course.name : null,
        });
      }
    });

    console.log(ticketsArray);

    return res.json(ticketsArray);
  } catch (error) {
    next(error);
  }
};

exports.getAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const answerTicker = await ticketModel.findOne({ parent: id });
    const ticket = await ticketModel.findOne({ _id: id });

    res.json({
      ticket: ticket.body,
      answer: answerTicker ? answerTicker.body : null,
    });
  } catch (error) {
    next(error);
  }
};

exports.setAnswer = async (req, res, next) => {
  try {
    const { body, ticketID } = req.body;

    const ticket = await ticketModel.findOne({ _id: ticketID }).lean();

    const answer = await ticketModel.create({
      title: ticket.title,
      body,
      parent: ticketID,
      priority: ticket.priority,
      user: req.user._id,
      isAnswer: 1,
      answer: 0,
      departmentID: ticket.departmentID,
      departmentSubID: ticket.departmentSubID,
    });

    const updatedTicket = await ticketModel.findOneAndUpdate(
      { _id: ticket._id },
      {
        answer: 1,
      }
    );

    return res.json(answer);
  } catch (error) {
    next(error);
  }
};

exports.departments = async (req, res, next) => {
  try {
    const departments = await departmentModel.find();

    res.json(departments);
  } catch (error) {
    next(error);
  }
};

exports.departmentsSubs = async (req, res, next) => {
  try {
    const departmentSubs = await departmentSubModel
      .find({ parent: req.params.id })
      .lean();
    res.json(departmentSubs);
  } catch (error) {
    next(error);
  }
};

const sender = require("../config/email-config");
const TicketRepository = require("../repository/ticket-repository");

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    const response = await sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const fetchPendingEmails = async (timeStamp) => {
  try {
    const response = repo.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log("error");
  }
};

const createNotifications = async (data) => {
  try {
    const response = await repo.create(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateTicket = async (ticketId, data) => {
  try {
    const response = await repo.update(ticketId, data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const subscribeEvents = async (payload) => {
  const { service, data } = payload;

  switch (service) {
    case "CREATE_TICKET":
      await this.createNotifications(data);
      break;
    case "SEND_BASIC_MAIL":
      await this.sendBasicEmail(data);
      break;
    default:
      console.log("No valid email received");
      break;
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotifications,
  updateTicket,
  subscribeEvents,
};

const Ticket = require("../models/ticket");

class TicketsDB {
  tickets = [];

  /**
   * Get all tickets from database
   * @returns {Array.<Object>} An array of ticket objects
   */
  getTickets = () => {
    return this.tickets;
  };

  /**
   * Creates a new ticket and adds to the database
   * @param {String} username
   * @param {Number} price
   * @returns {Object} Returns purchased ticket
   */
  buyTicket = (username, price) => {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  };

  /**
   * Updates ticket based on tickedId
   * @param {string} ticketId
   * @param {string} username
   * @returns {object} Return the updated ticket object
   */
  updateTicket = (ticketId, username) => {
    const index = this.tickets.findIndex(
      (ticket) => ticket.ticketId === ticketId
    );
    this.tickets[index].username = username;
    this.tickets[index].updateTime = new Date();
    return this.tickets[index];
  };

  /**
   * Delete ticket based on ticketId
   * @param {string} ticketId
   * @returns {boolean} returns boolean based on task completion.
   */
  deleteTicket = (ticketId) => {
    this.tickets = this.tickets.filter((ticket) => ticket.ticketId != ticketId);
    return true;
  };

  /**
   * Bulk buy tickets based on username
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @returns {Array.<object>} Returns array of new tickets
   */
  bulkBuyTickets = (username, price, quantity) => {
    const ticketsArray = [];
    for (let i = 0; i < quantity; i++) {
      ticketsArray.push(this.buyTicket(username, price));
    }
    return ticketsArray;
  };

  draw = (winners) => {};
}
const DB = new TicketsDB();
module.exports = DB;

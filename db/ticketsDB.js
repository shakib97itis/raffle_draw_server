const Ticket = require("../models/ticket");
const defaultPeople = [
  {
    id: "nmlriUuFIu",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "CaptainCoder",
    price: 10,
  },
  {
    id: "BQH0gXG9cN",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "PixelMaster",
    price: 20,
  },
  {
    id: "wNJlLGaZ4z",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "CodeWarrior",
    price: 30,
  },
  {
    id: "NbxWePP52k",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "ScriptNinja",
    price: 40,
  },
  {
    id: "4AxKEhq16M",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "DebugGuru",
    price: 50,
  },
  {
    id: "AUV6wW6A4Y",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "FunctionFreak",
    price: 60,
  },
  {
    id: "GYcTmgC8rG",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "LoopLegend",
    price: 70,
  },
  {
    id: "yYgYZ2RdAH",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "ArrayAce",
    price: 80,
  },
  {
    id: "VnOyLqKpGE",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "BitWizard",
    price: 90,
  },
  {
    id: "0EnWc9Sx4r",
    purchaseDate: "2024-12-11T04:54:58.485Z",
    updateDate: "2024-12-11T04:54:58.485Z",
    username: "SyntaxSamurai",
    price: 100,
  },
];

class TicketsDB {
  tickets = [...defaultPeople];

  /**
   * Get all tickets from database
   * @returns {Array.<Object>} An array of ticket objects
   */
  getAllTickets = () => {
    return this.tickets;
  };

  /**
   * Get a single ticket by ID
   * @param {string} tickedId - The ID of the ticket
   * @returns {Object} The ticket object
   */
  getSingleTicket = (tickedId) => {
    return this.tickets.find((value) => value.id == tickedId);
  };

  /**
   * Get all tickets by username
   * @param {string} username - The username to filter tickets by
   * @returns {Array.<Object>} An array of ticket objects
   */

  getTicketsByUsername = (username) => {
    return this.tickets.filter((ticket) => ticket.username === username);
  };

  /**
   * Creates a new ticket and adds to the database
   * @param {String} username - The username of the buyer
   * @param {Number} price - The price of the ticket
   * @returns {Object} Returns purchased ticket
   */
  buySingleTicket = (username, price) => {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  };

  /**
   * Bulk buy tickets based on username
   * @param {string} username - The username of the buyer
   * @param {number} price - The price of each ticket
   * @param {number} quantity - The number of tickets to buy
   * @returns {Array.<object>} Returns array of new tickets
   */
  BuyBulkTickets = (username, price, quantity) => {
    const ticketsArray = [];
    for (let i = 0; i < quantity; i++) {
      ticketsArray.push(this.buySingleTicket(username, price));
    }
    return ticketsArray;
  };

  /**
   * Updates ticket based on ticketId
   * @param {string} ticketId - The ID of the ticket
   * @param {string} username - The new username
   * @returns {object} Return the updated ticket object
   */
  updateSingleTicket = (ticketId, username) => {
    const index = this.tickets.findIndex((ticket) => ticket.id === ticketId);
    this.tickets[index].username = username;
    this.tickets[index].updateDate = new Date();
    return this.tickets[index];
  };

  /**
   * Update multiple tickets based on username
   * @param {string} oldUserName - The old username
   * @param {string} newUserName - The new username
   * @returns {Array.<object>} Returns array of updated tickets
   */
  updateBulkTickets = (oldUserName, newUserName) => {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.username === oldUserName) {
        ticket.username = newUserName;
        ticket.updateDate = new Date();
      }
      return ticket;
    });
    return this.tickets;
  };

  /**
   * Delete ticket based on ticketId
   * @param {string} ticketId - The ID of the ticket
   * @returns {boolean} returns boolean based on task completion.
   */
  deleteSingleTicket = (ticketId) => {
    this.tickets = this.tickets.filter((ticket) => ticket.id != ticketId);
    return true;
  };

  /**
   * Delete tickets based on username
   * @param {string} username - The username to filter tickets by
   * @returns {Array.<object>} Returns array of remaining tickets
   */
  deleteBulkTickets = (username) => {
    this.tickets = this.tickets.filter((ticket) => ticket.username != username);
    return this.tickets;
  };

  /**
   * Draw random winners from the tickets
   * @param {number} winners - The number of winners to draw
   * @returns {Array.<object>} Returns array of winning tickets
   */
  draw = (winners = 3) => {
    const tickets = this.tickets;
    const winnersArray = [];
    for (let i = 0; i < winners; i++) {
      const randomIndex = Math.floor(Math.random() * tickets.length);
      winnersArray.push(tickets[randomIndex]);
    }
    return winnersArray;
  };
}

const DB = new TicketsDB();

module.exports = DB;

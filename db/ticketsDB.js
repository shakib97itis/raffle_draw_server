const Ticket = require("../models/ticket");

class DB {
  tickets = [];

  buyTicket = (username, price) => {
    this.tickets.push(new Ticket(username, price));
  };
  getTickets = () => {
    return this.tickets;
  };
}

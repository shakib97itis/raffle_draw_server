const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });

class Ticket {
  constructor(username, price) {
    this.username = username;
    this.price = price;
  }
  id = uid.rnd();
  purchaseDate = new Date()
  updateDate = new Date()
}

module.exports = Ticket;

const router = require("express").Router();
const db = require("../db/ticketsDB");

/**
 * To draw tickets randomly
 */

router.get("/draw", (req, res) => {
  const tickets = db.draw();
  res.status(200).json(tickets);
});


/**
 * To sell a single ticket
 * @route POST /s/sell
 * @param {string} username - The username of the buyer
 * @param {number} price - The price of the ticket
 * @returns {Object} The purchased ticket
 */
router.post("/s/sell", (req, res) => {
  let { username, price } = req.body;
  price = Number(price);
  if (username && price) {
    const ticket = db.buySingleTicket(username, price);
    return res.status(200).json(ticket);
  }
  res.status(500).json({ error: "Invalid input" });
});

/**
 * To get a single ticket by ticket id
 * @route GET /s/:ticketId
 * @param {string} ticketId - The ID of the ticket
 * @returns {Object} The ticket object
 */
router.get("/s/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  if (ticketId) {
    const ticket = db.getSingleTicket(ticketId);
    return res.status(200).json(ticket);
  }
  res.status(500).json({ error: "Invalid ticket ID" });
});

/**
 * To update a single ticket
 * @route PATCH /s/:ticketId
 * @param {string} username - The new username
 * @param {string} ticketId - The ID of the ticket
 * @returns {Object} The updated ticket object
 */
router.patch("/s/:ticketId", (req, res) => {
  const { username } = req.body;
  const { ticketId } = req.params;

  if (username && ticketId) {
    const updatedTicket = db.updateSingleTicket(ticketId, username);
    return res.status(200).json(updatedTicket);
  }
  res.status(500).json({ error: "Invalid input" });
});

/**
 * To delete a single ticket
 * @route DELETE /s/:ticketId
 * @param {string} ticketId - The ID of the ticket
 * @returns {Object} A success message
 */
router.delete("/s/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  if (ticketId) {
    db.deleteSingleTicket(ticketId);
    return res.status(200).json({ message: "Deleted successfully" });
  }
  res.status(500).json({ error: "Invalid ticket ID" });
});

/**
 * To sell bulk tickets
 * @route POST /b/sell
 * @param {string} username - The username of the buyer
 * @param {number} price - The price of each ticket
 * @param {number} quantity - The number of tickets to buy
 * @returns {Array.<Object>} The purchased tickets
 */
router.post("/b/sell", (req, res) => {
  const { username, price, quantity } = req.body;
  if (username && price && quantity) {
    const tickets = db.BuyBulkTickets(username, price, quantity);
    return res.status(200).json(tickets);
  }
  res.status(500).json({ error: "Invalid input" });
});

/**
 * To get tickets by username
 * @route GET /b/:username
 * @param {string} username - The username to filter tickets by
 * @returns {Array.<Object>} The tickets for the given username
 */
router.get("/b/:username", (req, res) => {
  const { username } = req.params;
  if (username) {
    const tickets = db.getTicketsByUsername(username);
    return res.status(200).json(tickets);
  }
  res.status(500).json({ error: "Invalid username" });
});

/**
 * To update tickets by username
 * @route PATCH /b/:username
 * @param {string} oldUserName - The old username
 * @param {string} newUserName - The new username
 * @returns {Array.<Object>} The updated tickets
 */
router.patch("/b/:username", (req, res) => {
  const { oldUserName, newUserName } = req.body;
  if (oldUserName && newUserName) {
    const updatedTickets = db.updateBulkTickets(oldUserName, newUserName);
    return res.status(200).json(updatedTickets);
  }
  res.status(500).json({ error: "Invalid input" });
});

/**
 * To delete tickets by username
 * @route DELETE /b/:username
 * @param {string} username - The username to filter tickets by
 * @returns {Array.<Object>} The remaining tickets
 */
router.delete("/b/:username", (req, res) => {
  const { username } = req.params;
  if (username) {
    const remainingTickets = db.deleteBulkTickets(username);
    return res.status(200).json(remainingTickets);
  }
  res.status(500).json({ error: "Invalid username" });
});

/**
 * To get all tickets
 * @route GET /
 * @returns {Array.<Object>} All tickets
 */
router.get("/", (req, res) => {
  res.json(db.getAllTickets());
});

module.exports = router;

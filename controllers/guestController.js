const Guest = require("../models/Guest");
const createCrudController = require("./crudController");

module.exports = createCrudController(Guest, "guestId");

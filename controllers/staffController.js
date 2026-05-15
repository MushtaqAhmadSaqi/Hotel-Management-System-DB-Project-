const Staff = require("../models/Staff");
const createCrudController = require("./crudController");

module.exports = createCrudController(Staff, "staffId");

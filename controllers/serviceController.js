const Service = require("../models/Service");
const createCrudController = require("./crudController");

module.exports = createCrudController(Service, "serviceId");

const Payment = require("../models/Payment");
const createCrudController = require("./crudController");

module.exports = createCrudController(Payment, "paymentId");

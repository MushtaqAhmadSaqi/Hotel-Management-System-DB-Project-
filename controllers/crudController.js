const createCrudController = (Model, idField) => ({
  getAll: async (req, res) => {
    try {
      const records = await Model.find().sort({ createdAt: -1 });
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const record = await Model.findOne({ [idField]: req.params.id });

      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }

      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const record = await Model.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Duplicate value found. ID or unique field already exists.",
          field: error.keyValue
        });
      }

      res.status(400).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const record = await Model.findOneAndUpdate(
        { [idField]: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }

      res.status(200).json(record);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Duplicate value found. ID or unique field already exists.",
          field: error.keyValue
        });
      }

      res.status(400).json({ message: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const record = await Model.findOneAndDelete({ [idField]: req.params.id });

      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }

      res.status(200).json({
        message: "Record deleted successfully",
        deletedRecord: record
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = createCrudController;

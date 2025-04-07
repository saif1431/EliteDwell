const listing = require("../models/listing.model");


const CreateListing = async (req, res, next) => {
      try {
            const newListing = await listing.create(req.body);
            return res.status(201).json(newListing);
      } catch (error) {
            next(error);
      }
}


module.exports = CreateListing;
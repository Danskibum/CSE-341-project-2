const validator = require('../helpers/validate');

const saveInventory = (req, res, next) => {
  const validationRule = {
    make: 'required|string',
    model: 'required|string',
    year: 'required|number',
    color: 'required|string',
    mileage: 'required|number',
    new: 'boolean',
    used: 'boolean',
    location: 'required|string',
    cost: 'required|number',
    received: 'required|number'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveInventory
};
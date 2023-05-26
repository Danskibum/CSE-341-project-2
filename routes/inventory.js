const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/lesson2');
const validation = require('../middleware/validate');

router.get('/', inventoryController.getAll);

router.get('/:id', inventoryController.getSingle);

router.post('/', validation.saveInventory, inventoryController.createInventory);

router.put('/:id', validation.saveInventory, inventoryController.updateInventory);

router.delete('/:id', inventoryController.deleteInventory);


module.exports = router;
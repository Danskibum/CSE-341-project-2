const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('project2')
  .collection('inventory').find()
  .toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('project2')
    .collection('inventory')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createInventory = async (req, res) => {
    const inventory = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.Color,
      milage: req.body.milage,
      new: req.body.new,
      used: req.body.used,
      location: req.body.location,
      cost: req.body.cost,
      received: req.body.received
    };
    const response = await mongodb.getDb().db('project2')
    .collection('inventory').insertOne(inventory);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the inventory.');
    }
  };

  const updateInventory = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const inventory = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.Color,
        milage: req.body.milage,
        new: req.body.new,
        used: req.body.used,
        location: req.body.location,
        cost: req.body.cost,
        received: req.body.received
    };
    const response = await mongodb
      .getDb()
      .db('project2')
    .collection('inventory')
      .replaceOne({ _id: userId }, inventory);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the inventory.');
    }
  };
  
  const deleteInventory = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('project2')
    .collection('inventory').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the inventory.');
    }
  };
  
  module.exports = { getAll, getSingle, createInventory, updateInventory, deleteInventory };
  
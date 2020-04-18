//for the endpoints /api/cwk
const courseworkRouter = require('express').Router();
const db_accessor = require('../DB_interaction/db-accessor');
const dao = new db_accessor.DAO


module.exports = courseworkRouter

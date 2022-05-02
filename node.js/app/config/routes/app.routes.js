module.exports = app => {
    const app = require("../controllers/app.controller.js");
  
    var router = require("express").Router();
  
    // create new employee
    router.post("/", app.create);
  
    // Retrieve all employees
    router.get("/", app.findAll);
  
 
  };
  
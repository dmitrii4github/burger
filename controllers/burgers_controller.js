var express = require("express");
  
var router = express.Router();

var burgers = [];

var hbsObject = {burgers};


// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    /*hbsObject = {
       burgers: data
    };*/
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/api/burgers/:name", function(req, res) {
    var condition = "name = '" + req.params.name + "'";

    console.log("condition in router: ", condition);

    burger.selectOne(condition, function(data){
         burgerSelected = {
            burgers: data
          };

          console.log(burgerSelected.burgers[0]);
          
          hbsObject.burgers.push(burgerSelected.burgers[0]);
          
          console.log(hbsObject);

          //burgers.push(hbsObject);
          //console.log(burgers);
          res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      modifyGlobalObject(req.params.id);
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      
      res.status(200).end();
    }
  });
});

function modifyGlobalObject(id) {
    hbsObject.burgers.forEach(function(element) {
        if (element.id == id) {
            if (element.devoured == false) {
                console.log("flipping to true");
                element.devoured = true;
            } else {
                console.log("flipping to false");
                element.devoured = false;
            }
        }
    });

}

// Export routes for server.js to use.
module.exports = router;
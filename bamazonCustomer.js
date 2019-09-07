//npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");


//establish connection
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "julio",
    database: "bamazon"
});

//handle error
connection.connect(function (err) {
    if (err) throw err;

    return;
});

//function to show products
connection.query('SELECT * FROM `products`', function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    for (var i=0; i<results.length; i++) {
      console.log(results[i].item_id + " " + results[i].product_name + " [" + results[i].price + "]");
    }
    // Prompt user to select a product and enter desired quantity
    function buyPrompt() {
      inquirer.prompt( [{
        name: "itemId",
        type: "input",
        message: "Enter the id of the product you'd like to buy."
      }, {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
      }]).then(function(answer) {
        for (var i=0; i<results.length; i++) {
          if (results[i].item_id === parseInt(answer.itemId)) {
            // If order quantity is too high, notify user of insufficient stock
            if (results[i].stock_quantity < parseInt(answer.quantity)) {
              console.log("Insufficient stock!");
              buyPrompt();
            } else {
              // Calculate order total and remaining stock
              var total = parseFloat(answer.quantity*results[i].price).toFixed(2);
              var newStock = results[i].stock_quantity - answer.quantity;
  
              // Construct query to update stock
              var updateStock = 'UPDATE `products` SET `stock_quantity` = ' + newStock + ' WHERE `item_id` = ' + answer.itemId
              connection.query(updateStock, function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(result.affectedRows + " product updated");
                }
              });
  
              // Notify user of successful purchase
              console.log("You have purchased " + answer.quantity + " " + results[i].product_name);
              console.log("Your order total is " + total);
            }
          }
        }
      });
    }
    buyPrompt();
  });
 


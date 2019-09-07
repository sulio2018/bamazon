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
connection.query('SELECT * FROM `products`', function (err, res) {
    if (err) {
      console.log(err);
    }
    for (var i = 0; i < res.length; i++) {
      console.log("Item: " + res[i].item_id + " | Product: " + res[i].product_name + 
      " | Price: " + res[i].price + " | Quantity Available: " + res[i].stock_quantity);
    }

    //prompt customer for input
    function promptCustomer() {
      inquirer.prompt( [{
        name: "id",
        type: "input",
        message: "Enter the number to the item you want to buy."
      }, 
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"

      }])
      .then(function(answer) {
        for (var i=0; i<res.length; i++) {
          if (res[i].item_id === parseInt(answer.id)) {
            // If order quantity is too high, notify user of insufficient stock
            if (res[i].stock_quantity < parseInt(answer.quantity)) {
              console.log("Insufficient stock!");
              promptCustomer();
            } else {
              // Calculate order total and remaining stock
              var total = parseFloat(answer.quantity*res[i].price).toFixed(2);
              var newStock = res[i].stock_quantity - answer.quantity;
  
              // Construct query to update stock
              var updateStock = 'UPDATE `products` SET `stock_quantity` = ' + newStock + ' WHERE `item_id` = ' + answer.id
              connection.query(updateStock, function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(result.affectedRows + " product updated");
                }
              });
  
              // Notify user of successful purchase
              console.log("You have purchased " + answer.quantity + " " + res[i].product_name);
              console.log("Your order total is " + total);
            }
          }
        }
      });
    }
    promptCustomer();
  });
 


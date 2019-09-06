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

//handle error or show products
connection.connect(function (err) {
    if (err) throw err;

    displayItems();
});

//function to show products
var displayItems = function () {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            console.log("Item # " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);

        }

        promptCustomer();
    });
};

//function to ask customer for input
var promptCustomer = function () {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Please enter id # you would like to purchase.",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: "units",
        type: "input",
        message: "How many units would you like to purchase?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false
        }

    }]).then(function(response) {

    })
}

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});




// function which prompts the user for what action they should take
function start() {
    connection.query('SELECT * FROM products', function (err, res) {
        // All products for sale are listed
        console.log('Welcome to Bamazon!!');
        console.log('Here are all our products on sale: ');
        var table = [];
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].productName, res[i].departmentName, res[i].price.toFixed(2)]);
        }
        console.log(table);
        inquirer.prompt([{
            name: "itemID",
            type: "number",
            message: "What is the ID of the product you would like to buy?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: "quantity",
            type: "number",
            message: "How many units would you like to purchase?",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
        ])
            .then(function (answer) {
                // console.log(answer);
                var pickedItemId = answer.itemID - 1
                var pickedQuantity = answer.quantity
                // console.log(res[pickedItemId].price)
                var totalPrice = parseFloat(((res[pickedItemId].price) * pickedQuantity).toFixed(2));
                if (pickedQuantity < res[pickedItemId].stock) {
                    console.log("Your total for " + answer.quantity + " -- " + res[pickedItemId].productName + " is: $" + totalPrice + ".");
                    // console.log("HELLO", res[pickedItemId].item_id)
                    // console.log("TEST", res[pickedItemId].stock - pickedQuantity)
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock: res[pickedItemId].stock - pickedQuantity
                    }, {
                        item_id: res[pickedItemId].item_id

                    }], function (err, res) {
                        if (err) {
                            return console.log(err)
                        }
                        newOrder();
                    });
                }
                else {
                    console.log("Sorry, we don't have enough " + res[pickedItemId].productName + ". All we have is " + res[pickedItemId].stock + " in our stock.");
                    newOrder();                }
            })
    })
}


function newOrder() {
    inquirer.prompt([{
        name: "newOrder",
        type: "confirm",
        message: "Would you like to buy another product?",
        // validate: function (value) {
        //     if (isNaN(value) == false) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    }])
        .then(function (answerNewOrder) {
            if (answerNewOrder) {
                // newOrder == true,
                console.log("yeah.", answerNewOrder.newOrder)
                start();
            }
            
            else 
            {
               
                console.log(answerNewOrder.answer)
                console.log("Thank you for doing some business with us.");}
                // connection.end();
            
           
        })

    }

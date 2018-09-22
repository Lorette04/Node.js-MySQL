-- DROP DATABASE IF EXISTS bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT ,
  productName VARCHAR(100),
  departmentName VARCHAR(100),
  price DECIMAL(10,2),
  stock INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("Dome Tent - 9 persons", "Camping", 159.99, 250);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("Dome Tent - 10 persons", "Camping", 275.99, 100);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("Waterproof Sleeping bag", "Camping", 60.99, 300);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("Double sleeping bag", "Camping", 99.99, 125);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("Hockey Goal Set", "Hockey", 77, 135);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("Inline Skates Size:4", "Hockey", 179.99, 30);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("Ring Video Doorbell Pro", "IT", 249, 75);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("WiFi Video Doorbell", "IT", 79, 100);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("Malamine Set", "Dinnerware Set", 50, 500);

INSERT INTO products (productName, departmentName, price, stock)
VALUES ("Porcelaine Set", "Dinnerware Set", 300, 200);


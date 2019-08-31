CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('FIFA 2019', 'Electronics', 70, 25),
('NBA Street 2019', 'Electronics', 65, 35),
('Madden 2019', 'Electronics', 85, 60),
('Soccer cleats', 'Sports Apparell', 125, 10),
('Basketball jerseys', 'Sports Apparell', 150, 12),
('Football jerseys', 'Sports Apparell', 200, 5),
('Energy drinks', 'Groceries', 5.75, 24),
('Snack bars', 'Groceries', 3.5, 6),
('Deodorant', 'Cosmetics', 2.25, 10),
('Foot powder', 'Cosmetics', 5.5, 15);


const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

// solution for CORS
const corsOptions = {
    // origin: 'http://127.0.0.1:5501',
    // origin: "http://203.159.93.114:8031",
    credentials: true,
  };
app.use(cors(corsOptions));

// database ========================================
const mysql = require("mysql2");
var dbConn = mysql.createConnection({
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

dbConn.connect(function(err){
    if(err) throw err;
    console.log(`Connect DB: ${process.env.DB_NAME}`);
});
// end database =====================================

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Serve the frontend static files so frontend APIs work correctly via relative paths
app.use('/', express.static(path.join(__dirname, '../frontend')));

// ======================= (CHING) START: LOGIN PAGE =========================== //

// T E S T C A S E ! =========================================
/*
TEST 1: Testing Login to the Admin Page => Success (Ex.1/3)
method: PUT
URL: http://localhost:8131/signin || /api/signin
body: raw JSON
{
    "Login_Info": {
        "L_username": "Engaugsorn0001",
        "L_password": "0001"
    }
}

TEST 1: Testing Login to the Admin Page => Success (Ex.2/3)
method: PUT
URL: http://localhost:8131/signin || /api/signin
body: raw JSON
{
    "Login_Info": {
        "L_username": "Adrienna0008",
        "L_password": "0008"
    }
}

TEST 1: Testing Login to the Admin Page => Success (Ex.3/3)
URL: http://localhost:8131/signin || /api/signin
body: raw JSON
{
    "Login_Info": {
        "L_username": "Nonthanon0007",
        "L_password": "0007"
    }
}
*/
// -------------------------------------------------------------
router.put('/api/signin', function (req, res) {
    let loginInfo = req.body.Login_Info;
    if (!loginInfo || !loginInfo.L_username || !loginInfo.L_password) {
        return res.status(400).send({ error: true, message: 'Please provide correct account information' });
    }

    let username = loginInfo.L_username;
    let password = loginInfo.L_password;

    // NOW() => UTC = GMT+0
    let sql = `UPDATE Login_Info SET L_access = DATE_ADD(NOW(), INTERVAL 7 HOUR) WHERE L_username = ? AND L_password = ?`;
    dbConn.query(sql, [username, password], function (error, results) {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).send({ error: true, message: 'An error occurred while processing your request' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(401).send({ error: true, message: 'Invalid username or password' });
        }

        return res.send({ error: false, data: results, message: 'Login Successful' });
    });
});

// ============================ END: LOGIN PAGE =========================== //

// ===================== (CHING) START: PRODUCT MANAGEMENT =================== //

// T E S T C A S E ! =========================================
/*
TEST 13: Testing Get Some Product List By ProductID => Search with "1" (Ex.1/2)
method: GET
URL: http://localhost:8131/product?id=1 || /api/product?id=1

TEST 13: Testing Get Some Product List By ProductID => Search with "001" (Ex.2/2)
method: GET
URL: http://localhost:8131/product?id=001 || /api/product?id=001
*/
// -------------------------------------------------------------
// method: GET => Get search employee account list
router.get('/api/product', function (req, res) {
    let productId = req.query.id;
    if (!productId) {
        return res.status(400).send({ error: true, message: 'Please provide Product id.' });
    }

    dbConn.query('SELECT * FROM Product WHERE ProductID LIKE ?',  [`%${productId}%`], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Product retrieved' });
    });
});

// -------------------------------------------------------------
/*
TEST 2: Testing Insert a new Product => Success (Ex.1/3)
method: POST
URL: http://localhost:8131/postproduct || /api/postproduct
body: raw JSON
{
    ProductID: 'P1000',
    P_name: '(Tester) Lucky Piyao in Imperial Jade Bracelet – Lucky Life Manila',
    P_size: '4',
    P_quantity: '9',
    P_price: '12990',
    P_material: 'J',
    P_color: 'Yellow, Green',
    P_image: 'https://drive.google.com/file/d/1OqLI83FZG_aazwQcVIqe5FFBEuxC8zjT/view?usp=sharing',
    P_status: 'E',
    P_overview: 'Tester 1 (=v=)',
    P_description: 'Tester 1 (=v=)'
}

TEST 2: Testing Insert a new Product => Success (Ex.2/3)
method: POST
URL: http://localhost:8131/postproduct || /api/postproduct
body: raw JSON
{
    ProductID: 'P1001',
    P_name: ' (Tester) Rainbow Moonstone Bracelet 7MM',
    P_size: '4',
    P_quantity: '3',
    P_price: '21590',
    P_material: 'M',
    P_color: 'White, Blue',
    P_image: 'https://drive.google.com/file/d/1vAeG-ScC15DqB72dgC1LI4YuvvcJWRBe/view?usp=sharing',
    P_status: 'E',
    P_overview: 'Tester 2 Overview ',
    P_description: 'Tester 2 Description'
}

TEST 2: Testing Insert a new Product => Success (Ex.3/3)
method: POST
URL: http://localhost:8131/postproduct || /api/postproduct
body: raw JSON
{
    ProductID: 'P1002',
    P_name: '(Tester) 3-Layers-Button-Corn-Elastic-Braclet by Borneo Pearls',
    P_size: '4',
    P_quantity: '2',
    P_price: '32000',
    P_material: 'P',
    P_color: 'White, Pink, Yellow',
    P_image: 'https://drive.google.com/file/d/1jfIlahQzz6Z5z8ugQdtEV3i53NN9H61s/view?usp=drive_link',
    P_status: 'E',
    P_overview: 'Tester TvT',
    P_description: 'Tester Why my website is too slow.'
}
*/
// -------------------------------------------------------------
// // method: POST (Insert)
router.post('/api/postproduct', function (req, res) {
    let product = req.body; // Access the entire request body
    console.log(product);

    if (!product) {
        return res.status(400).send({ error: true, message: 'Please provide product information' });
    }
    
    // Extract individual values from the product object
    let { ProductID, P_name, P_size, P_description, P_image, P_price, P_quantity, P_material, P_status, P_overview, P_color } = product;

    // Prepare the SQL query with placeholders for values
    let sql = `INSERT INTO Product (ProductID, P_name, P_size, P_description, P_image, P_price, P_quantity, P_material, P_status, P_overall, P_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query with values
    dbConn.query(sql, [ProductID, P_name, P_size, P_description, P_image, P_price, P_quantity, P_material, P_status, P_overview, P_color], function (error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: true, message: 'Failed to insert product into the database' });
        }

        return res.status(200).send({ error: false, data: results.affectedRows, message: 'New product has been created successfully.' });
    });
});

// T E S T C A S E ! =========================================
/*
TEST 3: Testing Update a Product Information => Update size, price, overall, description (Ex.1/3)
method: POST
URL: http://localhost:8131/updateproduct?ProductID=P1000&P_size=6&P_price=9990&P_overall=Tester for Updating&P_description=Tester for Updating ToT

TEST 3: Testing Update a Product Information => Update quantity (Ex.2/3)
method: POST
URL: http://localhost:8131/updateproduct?ProductID=P1002&P_quantity=10 || /api/updateproduct?ProductID=P1002&P_quantity=10

TEST 3: Testing Update a Product Information => Uodate name (Ex.3/3)
method: POST
URL: http://localhost:8131/updateproduct?ProductID=P1002&P_name=(Tester%20Sudyod)%203-Layers-Button-Corn-Elastic-Braclet%20by%20Borneo%20Pearls || /api/updateproduct?ProductID=P1002&P_name=(Tester%20Sudyod)%203-Layers-Button-Corn-Elastic-Braclet%20by%20Borneo%20Pearls
*/
// -------------------------------------------------------------
// method: PUT (Update)
router.post('/api/updateproduct', function (req, res) {
    let productId = req.query.ProductID; // Extract product ID from query parameter
    let product = req.query; // Extract product details from query parameters

    // Construct SQL SET statement dynamically with only non-null fields
    let updateFields = Object.entries(product)
        .filter(([key, value]) => value !== null && key !== 'ProductID') // Filter out null fields and ProductID
        .map(([key, value]) => `${key} = '${value}'`)
        .join(', ');

    // Construct the SQL query
    let sql = `UPDATE Product SET ${updateFields} WHERE ProductID = '${productId}'`;

    // Execute the query
    dbConn.query(sql, function (error, results) {
        if (error) {
            console.error("Error updating product:", error);
            return res.status(500).send({ error: true, message: 'An error occurred while updating the product.' });
        } else {
            console.log("Product updated successfully.");
            return res.send({ error: false, data: results.affectedRows, message: 'Product has been updated successfully.' });
        }
    });
});

// T E S T C A S E ! =========================================
/*
TEST 4: Testing Delete a Product By ProductID => Success (Ex.1/3)
method: DELETE
URL: http://localhost:8131/deleteproduct/id=P1000 || /api/deleteproduct/id=P1000

TEST 4: Testing Delete a Product By ProductID => Success (Ex.2/3)
method: DELETE
URL: http://localhost:8131/deleteproduct/id=P1001 || /api/deleteproduct/id=P1001

TEST 4: Testing Delete a Product By ProductID => Success (Ex.3/3)
method: DELETE
URL: http://localhost:8131/deleteproduct/id=P1002 || /api/deleteproduct/id=P1002
*/
// -------------------------------------------------------------
// method: DELETE
router.delete('/api/deleteproduct/id=:id', function (req, res) {
    let product_id = req.params.id;
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide product id' });
    }
    dbConn.query('DELETE FROM Product WHERE ProductID = ?', [product_id], function (error, results){
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: `Product has been deleted successfully.` });
    });
}); 

// =============================== END: PRODUCT MANAGEMENT =========================== //

// ======================= (CHING) START: USER MANAGEMENT =========================== //
// T E S T C A S E ! =========================================
/*
TEST 5: Testing Get All Employee Accounts => Success (Ex.1/1)
method: GET
URL: http://localhost:8131/accounts || /api/deleteproduct/accounts
*/
// -------------------------------------------------------------
// method: GET (Select All User Accounts)
router.get('/api/accounts', function (req, res) {
    dbConn.query('SELECT * FROM Account a JOIN Login_Info l ON l.EmpID = a.EmpID', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Account list.' });
    });
}); 


// T E S T C A S E ! =========================================
/*
TEST 6: Testing Get Some Employee Accounts By EmpID => Search with "Emp" (Ex.1/2)
method: GET
URL: http://localhost:8131/account?id=Emp || /api/account?id=Emp

TEST 6: Testing Get Some Employee Accounts By EmpID => Search with "Emp101" (Ex.2/2)
method: GET
URL: http://localhost:8131/account?id=Emp101 || /api/account?id=Emp101
*/
// -------------------------------------------------------------
// method: GET => Get search employee account list
router.get('/api/account', function (req, res) {
    let emp_id = req.query.id;
    if (!emp_id) {
        return res.status(400).send({ error: true, message: 'Please provide employee id.' });
    }

    dbConn.query('SELECT * FROM Account a JOIN Login_Info l ON l.EmpID = a.EmpID where a.EmpID LIKE ?',  [`%${emp_id}%`], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Account retrieved' });
    });
});


// T E S T C A S E ! =========================================
/*
TEST 7: Testing Insert an Employee Account => Success (Ex.1/2)
method: POST
URL: http://localhost:8131/postaccount || /api/postaccount
body: raw JSON
{
    EmpID: 'Emp0000',
    A_contact: '098-0256128',
    A_gender: 'F',
    A_role: 'Manager',
    A_fname: 'Chayanid',
    A_lname: ' Termphaiboon',
    A_image: 'https://drive.google.com/file/d/1eWoSa5ln-JsJZsKUbL0dHt4JLn0-hRt3/view?usp=sharing',
    A_status: 'enable',
    A_email: 'ching18647@gmail.com',
    A_address: '298 Moo7 Lamae, Lamae, Chumphon, Thailand, 86170',
    L_username: 'Chayanid0000',
    L_password: '1234'
}

TEST 7: Testing Insert an Employee Account => Success (Ex.2/2)
method: POST
URL: http://localhost:8131/postaccount  || /api/postaccount
body: raw JSON
{
    EmpID: 'Emp3333',
    A_contact: '084-3921617',
    A_gender: 'M',
    A_role: 'Junior Admin',
    A_fname: 'Watphatho',
    A_lname: 'Rakchad',
    A_image: 'https://drive.google.com/file/d/1NZN2ZE7wZ43CpZHJ9o2sNtTMjW08ggSP/view?usp=sharing',
    A_status: 'enable',
    A_email: 'thai1617@gmail.com',
    A_address: '2 Sanam Chai Rd, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok 10200',
    L_username: 'Thai3333',
    L_password: '3333'
}
*/
// -------------------------------------------------------------
// method: POST (Insert) => Add new employee account
router.post('/api/postaccount', function (req, res) {
    let account = req.body;
    console.log(account);

    if (!account) {
        return res.status(400).send({ error: true, message: 'Please provide employee information' });
    }
    
    let { EmpID, A_fname, A_lname, A_contact, A_gender, A_role, A_image, A_status, A_email, A_address, L_username, L_password} = account;

    // Check if required fields are missing
    if (!EmpID || !A_fname || !A_lname || !A_contact || !A_gender || !A_role || !A_image || !A_status || !A_email || !A_address || !L_username) {
        return res.status(400).send({ error: true, message: 'Please provide all required employee information including a username' });
    }

    // Check if EmpID exists
    dbConn.query('SELECT EmpID FROM Account WHERE EmpID = ?', [EmpID], function (error, empIdResults) {
        if (error) {
            console.error("Error checking EmpID existence:", error);
            return res.status(500).send({ error: true, message: 'An error occurred while checking EmpID existence' });
        }

        // Check if L_username exists
        dbConn.query('SELECT L_username FROM Login_Info WHERE L_username = ?', [L_username], function (error, usernameResults) {
            if (error) {
                console.error("Error checking L_username existence:", error);
                return res.status(500).send({ error: true, message: 'An error occurred while checking username existence' });
            }

            if (empIdResults.length !== 0 || usernameResults.length !== 0) {
                return res.status(400).send({ error: true, message: 'The provided EmpID or username does not exist' });
            }

            // Both EmpID and username exist, proceed with insertion
            let sqlAccount = `INSERT INTO Account (EmpID, A_fname, A_lname, A_contact, A_gender, A_role, A_image, A_status, A_email, A_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            let sqlLoginInfo = `INSERT INTO Login_Info (L_username, L_password, L_access, EmpID) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 HOUR), ?)`;

            // Execute the queries
            dbConn.query(sqlAccount, [EmpID, A_fname, A_lname, A_contact, A_gender, A_role, A_image, A_status, A_email, A_address], function (error, accountResults) {
                if (error) {
                    console.error("Error inserting employee account:", error);
                    return res.status(500).send({ error: true, message: 'Failed to insert new employee account into the database' });
                }

                // Execute the Login_Info query
                dbConn.query(sqlLoginInfo, [L_username, L_password, EmpID], function (error, loginResults) {
                    if (error) {
                        console.error("Error inserting login info:", error);
                        // Rollback the Account insertion if Login_Info insertion fails
                        dbConn.query('DELETE FROM Account WHERE EmpID = ?', [EmpID], function (rollbackError, rollbackResults) {
                            if (rollbackError) {
                                console.error("Error rolling back Account insertion:", rollbackError);
                            }
                            return res.status(500).send({ error: true, message: 'Failed to insert login info into the database' });
                        });
                    }

                    return res.status(200).send({ error: false, data: { account: accountResults.affectedRows, loginInfo: loginResults.affectedRows }, message: 'New employee account has been created successfully.' });
                });
            });
        });
    });
});


// T E S T C A S E ! =========================================
/*
TEST 8: Testing Update an Employee Account By EmpID, Username => Update password, gender, contact (Ex.1/2)
method: PUT
URL: http://localhost:8131/updateaccount?EmpID=Emp3333&L_username=Thai3333&L_password=123456&A_gender=M&A_contact=069-1267355 || /api/updateaccount?EmpID=Emp3333&L_username=Thai3333&L_password=123456&A_gender=M&A_contact=069-1267355
TEST 8: Testing Update an Employee Account By EmpID,Username => Update gender (Ex.2/2)
method: PUT
URL: http://localhost:8131/updateaccount?EmpID=Emp3333&L_username=Thai3333&A_gender=F || /api/updateaccount?EmpID=Emp3333&L_username=Thai3333&A_gender=F
*/
// -------------------------------------------------------------
// method: PUT (Update)
router.put('/api/updateaccount', function (req, res) {
    let empId = req.query.EmpID;
    let account = req.query;

    let updateFields_account = Object.entries(account)
        .filter(([key, value]) => value !== null && key !== 'EmpID' && key !== 'L_username' && key !== 'L_password')
        .map(([key, value]) => `${key} = ?`) // Use parameterized queries
        .join(', ');

    let updateFields_loginInfo = Object.entries(account)
        .filter(([key, value]) => value !== null && key === 'L_password') // Only update L_password if provided
        .map(([key, value]) => `${key} = ?`) // Use parameterized queries
        .join(', ');

    // Prepare the SQL statements with placeholders
    let sql_account = `UPDATE Account SET ${updateFields_account} WHERE EmpID = ?`;
    let sql_loginInfo = `UPDATE Login_Info SET ${updateFields_loginInfo} WHERE EmpID = ? AND L_username = ?`;

    // Extract the values for parameterized queries
    let accountValues = Object.entries(account)
        .filter(([key, value]) => value !== null && key !== 'EmpID' && key !== 'L_username' && key !== 'L_password')
        .map(([key, value]) => value);
    let loginInfoValues = Object.entries(account)
        .filter(([key, value]) => value !== null && key === 'L_password')
        .map(([key, value]) => value);

    // Add EmpID and L_username to the values arrays
    accountValues.push(empId);
    loginInfoValues.push(empId);
    loginInfoValues.push(account.L_username);

    // Execute the queries with parameterized values
    dbConn.query('SELECT EmpID FROM Account WHERE EmpID = ?', [empId], function (error, empIdResults) {
        if (error) {
            console.error("Error checking EmpID existence:", error);
            return res.status(500).send({ error: true, message: 'An error occurred while checking EmpID existence' });
        }

        // Check if L_username exists
        dbConn.query('SELECT L_username FROM Login_Info WHERE L_username = ?', [account.L_username], function (error, usernameResults) {
            if (error) {
                console.error("Error checking L_username existence:", error);
                return res.status(500).send({ error: true, message: 'An error occurred while checking username existence' });
            }

            // Check if the provided EmpID and username exist
            if (empIdResults.length === 0 || usernameResults.length === 0) {
                return res.status(400).send({ error: true, message: 'The provided EmpID or username does not exist' });
            }

            // Both EmpID and username exist, proceed with updating
            dbConn.query(sql_account, accountValues, function (error, results) {
                if (error) {
                    console.error("Error updating employee information:", error);
                    return res.status(500).send({ error: true, message: 'An error occurred while updating the employee information.' });
                }

                console.log("Employee Information updated successfully.");

                // Check if L_password is being updated
                if (updateFields_loginInfo) {
                    dbConn.query(sql_loginInfo, loginInfoValues, function (error, results) {
                        if (error) {
                            console.error("Error updating employee's password:", error);
                            return res.status(500).send({ error: true, message: 'An error occurred while updating the password.' });
                        }

                        console.log("Employee password updated successfully.");
                        return res.send({ error: false, data: results.affectedRows, message: 'Employee information and password updated successfully.' });
                    });
                } else {
                    return res.send({ error: false, data: results.affectedRows, message: 'Employee information updated successfully.' });
                }
            });
        });
    });
});

// T E S T C A S E ! =========================================
/*
TEST 9: Testing Delete an Employee Account By EmpID => Delete "Emp3333" (Ex.1/2)
method: DELETE
URL: http://localhost:8131/deleteaccount/id=Emp3333 || /api/deleteaccount/id=Emp3333

TEST 9: Testing Delete an Employee Account By EmpID => Delete "Emp0000" (Ex.2/2)
method: DELETE
URL: http://localhost:8131/deleteaccount/id=Emp0000 || /api/deleteaccount/id=Emp0000
*/
// -------------------------------------------------------------
// method: DELETE
router.delete('/api/deleteaccount/id=:id', async function (req, res) {
    let emp_id = req.params.id;
    if (!emp_id) {
        return res.status(400).send({ error: true, message: 'Please provide EmpID' });
    }

    try {
        // Delete from Login_Info table
        const loginInfoDelete = await new Promise((resolve, reject) => {
            dbConn.query('DELETE FROM Login_Info WHERE EmpID = ?', [emp_id], function (error, results) {
                if (error) reject(error);
                resolve(results.affectedRows);
            });
        });

        // Delete from Account table
        const accountDelete = await new Promise((resolve, reject) => {
            dbConn.query('DELETE FROM Account WHERE EmpID = ?', [emp_id], function (error, results) {
                if (error) reject(error);
                resolve(results.affectedRows);
            });
        });

        // Check if any rows are affected
        if (loginInfoDelete === 0 && accountDelete === 0) {
            // No rows deleted, indicating that the EmpID does not exist
            return res.status(404).send({ error: true, message: `Employee with ID ${emp_id} does not exist.` });
        }

        // Send response after deletions are successful
        return res.send({
            error: false,
            data: {
                loginInfoDeletedRows: loginInfoDelete,
                accountDeletedRows: accountDelete
            },
            message: `Employee with ID ${emp_id} has been deleted from both tables successfully.`
        });
    } catch (error) {
        return res.status(500).send({ error: true, message: 'An error occurred while deleting the employee.', details: error.message });
    }
});


// ============================= END: USER MANAGEMENT =========================== //

// ======================= (CHING) START: OUR PRODUCT =========================== //

// T E S T C A S E ! =========================================
/*
TEST 10: Testing Get All Products => Success (Ex.1/1)
method: GET
URL: http://localhost:8131/products || /api/products
*/
// -------------------------------------------------------------
// method: GET (Select All Products)
router.get('/api/products', function (req, res) {
    dbConn.query('SELECT * FROM Product', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Product list.' });
    });
}); 
// ============================ END: OUR PRODUCT =========================== //

// ======================= (CHING) START: ADVANCED SEARCH =========================== //

// T E S T C A S E ! =========================================
/*
TEST 11: Testing Get Some Products By Product Name => Search with "P" (Ex.1/2)
method: GET
URL: http://localhost:8131/productsearch?name=P || /api/productsearch?name=P

TEST 11: Testing Get Some Products By Product Name => Search with "z" (Ex.2/2)
method: GET
URL: http://localhost:8131/productsearch?name=z || /api/productsearch?name=z
*/
// -------------------------------------------------------------
// method: GET (Select) => Searching by Product_Name
router.get('/api/productsearch', function (req, res) {
    let product_name = req.query.name;
    console.log(`Search the product name contains ${product_name}`);
    if (!product_name) {
        return res.status(400).send({ error: true, message: 'Please provide product name.' });
    }

    // Use parameterized query to prevent SQL injection
    dbConn.query('SELECT * FROM Product WHERE P_name LIKE ?', ['%' + product_name + '%'], function (error, results) {
        if (error) {
            console.error("Error searching for product:", error);
            return res.status(500).send({ error: true, message: 'An error occurred while searching for product.' });
        }
        return res.send({ error: false, data: results, message: 'Product retrieved' });
    });
});


// T E S T C A S E ! =========================================
/*
TEST 12: Testing Get Some Products By Product Name with Some Criterias => Search with "z", 
         sort by z-a, size, material, color (Ex.1/3)
method: GET
URL: http://localhost:8131/advancedSearchProduct?P_name=z&P_size=5&P_color=Pink&P_material=Q&sort=z-a || /api/advancedSearchProduct?P_name=z&P_size=5&P_color=Pink&P_material=Q&sort=z-a

TEST 12: Testing Get Some Products By Product Name with Some Criterias => Search with "g", 
         size, sort by price (high to low) (Ex.2/3)
method: GET
URL: http://localhost:8131/advancedSearchProduct?P_name=g&P_size=4&sort=h-l || /api/advancedSearchProduct?P_name=g&P_size=4&sort=h-l

TEST 12: Testing Get Some Products By Product Name with Some Criterias => Search with "A", material (Ex.3/3)
method: GET
URL: http://localhost:8131/advancedSearchProduct?P_name=A&P_material=J || /api/advancedSearchProduct?P_name=A&P_material=J
*/
// -------------------------------------------------------------
// method: GET (Select) => Advanced Search
router.get('/api/advancedSearchProduct', function (req, res) {
    let product_name = req.query.P_name;
    let product_size = req.query.P_size;
    let product_color = req.query.P_color;
    let product_material = req.query.P_material;
    let sort = req.query.sort;

    console.log(`Searching for products with name containing "${product_name}"`);

    // Start building the SQL query
    let sql = 'SELECT * FROM Product WHERE 1';

    // Add conditions for each parameter if provided
    if (product_name) {
        sql += ` AND P_name LIKE '%${product_name}%'`;
    }
    if (product_size) {
        // Split the size string into an array of individual sizes
        let sizes = product_size.split(',');
        sql += ` AND (`;
        sizes.forEach((size, index) => {
            if (index > 0) sql += ` OR`;
            sql += ` P_size LIKE '%${size}%'`;
        });
        sql += `)`;
    }
    if (product_color) {
        // Split the color string into an array of individual colors
        let colors = product_color.split(',');
        sql += ` AND (`;
        colors.forEach((color, index) => {
            if (index > 0) sql += ` OR`;
            sql += ` P_color LIKE '%${color}%'`;
        });
        sql += `)`;
    }
    if (product_material) {
        sql += ` AND P_material LIKE '%${product_material}%'`;
    }

    // Add sorting if provided
    if (sort) {
        if(sort === "a-z") sql += ` ORDER BY P_name ASC`;
        if(sort === "z-a") sql += ` ORDER BY P_name DESC`;
        if(sort === "h-l") sql += ` ORDER BY P_price DESC`;
        if(sort === "l-h") sql += ` ORDER BY P_price ASC`;
    }

    // Execute the SQL query
    dbConn.query(sql, function (error, results) {
        if (error) {
            console.error("Error searching for products:", error);
            return res.status(500).send({ error: true, message: 'An error occurred while searching for products.' });
        }
        return res.send({ error: false, data: results, message: 'Products retrieved' });
    });
});

// ======================= END: ADVANCED SEARCH =========================== //

const port = process.env.PORT || 8131;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});



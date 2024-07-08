const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const a = [
    {1: "mazhar", 2: "Reyaan"},
    {1: "hello", 2: "mazhar"}
];

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "Database@0786",//Your database password
    database: 'data',
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1); // Exit the process with an error code
    }
    console.log("Connected to the database");
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/Student.html');
});
// Handle form submission
app.post('/insert', (req, res) => {
    const { name, gender, phone, email,  class1, sub, demo_date, msg } = req.body;
    console.log('Data received:', { name, phone, email, class1, sub, demo_date,  msg });

    const sql = 'INSERT INTO studentData (name, gender, phone_no, email, class1, sub, demo_date, msg) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, gender, phone, email, class1, sub, demo_date,  msg], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('An error occurred while inserting data');
        } else {
            console.log('Inserted successfully');
            //return res.status(200).json({ msg: 'Inserted successfully', result });
res.status(500).send(json(a));
        }
    });
});

// Starting the server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

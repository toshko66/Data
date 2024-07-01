const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'trainingdb'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
app.post('/api/data', (req, res) => {
  const { obekt, materials } = req.body;
  const insertQuery = `INSERT INTO data (obekt, materials) VALUES (?, ?)`;
  
  connection.query(insertQuery, [obekt, materials], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send({ error: 'Error inserting data' });
      return;
    }
    
    console.log('Data inserted successfully');
    res.status(201).send({ message: 'Data inserted successfully' });
  });
});

const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

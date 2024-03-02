const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const db = require('./table');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    // Other CORS options if needed
  };
  
  app.use(cors(corsOptions));
// Define route to fetch data from the database
app.get('/', (req, res) => {
    db.query('SELECT * FROM customer', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Internal server error');
          return;
        }
        res.json({ message: result.rows});
      });
    // res.json({ message: 'Data from the server' });
});
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const cors = require('cors');
// const express = require('express');
// const path = require('path');
// const { Pool } = require('pg');
// const db = require('./table');
// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(cors());
// // Middleware
// app.use(express.json());

// // Routes
// app.use(express.static(path.join(__dirname, 'client', 'build')));

// // API routes or any other routes
// // Example route to serve data to the client
// app.get('/', (req, res) => {
//     db.query('SELECT * FROM customer', (err, result) => {
//         if (err) {
//           console.error('Error executing query', err);
//           res.status(500).send('Internal server error');
//           return;
//         }
//         res.json({ message:"hello from sever"});
//       });
//     // res.json({ message: 'Data from the server' });
// });

// // Catch-all route to serve React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });
    


// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

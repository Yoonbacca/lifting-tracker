const express = require('express');
const app = express();
const port = 3001;

// Define the home route
app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

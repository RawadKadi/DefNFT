const express = require('express');
const app = express();

app.get('/dashboard', (req, res) => {
    res.json({
    success: true,
    message: 'Successful GET request to /dashboard'
  });
});
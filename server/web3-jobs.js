const express = require('express');
const app = express();

app.get('/web3-jobs', (req, res) => {
    res.json({
    success: true,
    message: 'Successful GET request to /web3-jobs'
  });
});
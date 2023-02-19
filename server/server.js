// const express = require('express');
// const app = express();
// const router = express.Router();
// const favicon = require('serve-favicon');
// const helmet = require('helmet');
// // const path = require('path');
// // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// const cors = require('cors');

// app.use(cors());
// // app.get('/favicon.ico', (req, res) => res.status(204));
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       'style-src-elem': ["'self'", "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css", "https://fonts.googleapis.com"]
//     }
//   }));
// router.get('/web3-jobs', (req, res) => {
//     res.json({
//     success: true,
//     message: 'Successful GET request to /web3-jobs'
//   });
// });
// app.use('/', router);

// router.get('/dashboard', (req, res) => {
//     res.json({
//     success: true,
//     message: 'Successful GET request to /dashboard'
//   });
// });
// app.use('/', router);

// app.get('/submit-job-listing', (req, res) => {
//     // Your code to handle the submission of a job listing
//     // ...
//     res.send({
//     success: true,
//     message: "Job listing submitted successfully"
//   });
// });

// app.listen(3000, () => {
//     console.log('Server started on port 3001');
// });
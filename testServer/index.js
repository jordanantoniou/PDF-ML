const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
// var bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

app.use(cors());

app.post('/', upload.single('file'), (req, res) => {
  console.log('req.body ', req.body);
  console.log('req.file ', req.file);
  res.send('It worked!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

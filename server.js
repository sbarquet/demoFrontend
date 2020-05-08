const express = require('express');

const app = express();

app.use('/dist', express.static('dist'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000, () => console.log('Listening 3000 :3 '));

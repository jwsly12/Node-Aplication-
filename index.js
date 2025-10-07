// Servidor web com express
//
//

const express = require('express');
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


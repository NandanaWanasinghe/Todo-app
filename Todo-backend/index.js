const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//------------------------------------

const TodoRouter = require('./routes/TodoRoute');

//------------------------------------

const db = require('./models');

// Start the server
const port = process.env.PORT || 3000;

db.sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized successfully');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

app.use('/api/v1/todos', TodoRouter);

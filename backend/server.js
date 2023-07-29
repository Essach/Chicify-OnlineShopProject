const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const paymentsRoutes = require('./routes/payments');

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use('/products', productsRoutes);
server.use('/users', usersRoutes);
server.use('/payments', paymentsRoutes);

server.listen(8000, () => console.log('Server is started...'));

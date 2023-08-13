const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsRoutes = require('./routes/products.js');
const usersRoutes = require('./routes/users.js');
const paymentsRoutes = require('./routes/payments.js');
const sliderRoutes = require('./routes/slider.js');

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use('/products', productsRoutes);
server.use('/users', usersRoutes);
server.use('/payments', paymentsRoutes);
server.use('/images', express.static('images'));
server.use('/slider', sliderRoutes);

server.listen(8000, () => console.log('Server is started...'));

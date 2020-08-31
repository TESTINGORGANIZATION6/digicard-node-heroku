const express = require('express')
const app = express()
require('dotenv').config
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const port = process.env.PORT || 7001

//mongodb connection
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection has been made, now make fireworks...')
});

// middleware
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// define routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', require('./routes/email_routes'));
app.use('/api/v1', require('./routes/order_routes'));
app.use('/cron', require('./routes/cron_routes'));

app.listen(port, () =>  {
    console.log(`Server is running on port ${port}`)
})

module.exports = app

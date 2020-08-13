const express = require('express')
const app = express()
require('dotenv').config
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const port = process.env.PORT || 7000

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// define routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', require('./routes/email_routes'));

app.listen(port, () =>  {
    console.log(`Server is running on port ${port}`)
})

module.exports = app

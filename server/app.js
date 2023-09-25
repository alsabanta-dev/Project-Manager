const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

dotenv.config({ path: './config.env' });

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

module.exports = app
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')

dotenv.config({ path: './config.env' });


// Database
const DB = process.env.DATABASE
mongoose.connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
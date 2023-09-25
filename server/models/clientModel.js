const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  name: {type: String},
  email: {
    type: String,
    unique: [true, 'There are another user with the same email']
  },
  phone: {type: String},
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client
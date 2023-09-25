const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
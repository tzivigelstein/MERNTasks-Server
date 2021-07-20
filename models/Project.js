const mongoose = require('mongoose')
const getRandomColor = require('../helpers/getRandomColor')

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  colors: {
    type: Object,
    default: {},
  },

  icon: {
    type: String,
  },
})

module.exports = mongoose.model('Project', ProjectSchema)

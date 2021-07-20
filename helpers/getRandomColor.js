const colors = require('../colors')

function getRandomColor() {
  const random = Math.floor(Math.random() * 8)
  return colors[random]
}

module.exports = getRandomColor

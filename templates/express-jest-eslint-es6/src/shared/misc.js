const { logger } = require('./logger')

const paramMissingError = 'One or more of the required parameters was missing.'

const printErr = err => {
  if (err) {
    logger.error(err)
  }
}

const getRandomInt = () => {
  /* eslint-disable */
  return Math.floor((Math.random() * 1000) ^ 4)
}

module.exports = {
  paramMissingError,
  printErr,
  getRandomInt,
}

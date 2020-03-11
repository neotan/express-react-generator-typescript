const winston = require('winston')

// don't log while running tests
winston.remove(winston.transports.Console)
winston.remove(winston.transports.File)

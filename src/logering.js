/* eslint-disable require-jsdoc */
/* eslint-disable max-lines-per-function */
/* eslint-disable node/no-unpublished-require */

const path = require('path')
const Core = require('./core')
const colors = require('../resources/colors.js').defaults

// const {
// 	createLogger,
// 	format,
// 	transports,
// } = require('winston')
// const defaults = require('../resources/defaults.json')
// Reset = '\x1b[0m'
// Bright = '\x1b[1m'
// Dim = '\x1b[2m'
// Underscore = '\x1b[4m'
// Blink = '\x1b[5m'
// Reverse = '\x1b[7m'
// Hidden = '\x1b[8m'

// FgBlack = '\x1b[30m'
// FgRed = '\x1b[31m'
// FgGreen = '\x1b[32m'
// FgYellow = '\x1b[33m'
// FgBlue = '\x1b[34m'
// FgMagenta = '\x1b[35m'
// FgCyan = '\x1b[36m'
// FgWhite = '\x1b[37m'

// BgBlack = '\x1b[40m'
// BgRed = '\x1b[41m'
// BgGreen = '\x1b[42m'
// BgYellow = '\x1b[43m'
// BgBlue = '\x1b[44m'
// BgMagenta = '\x1b[45m'
// BgCyan = '\x1b[46m'
// BgWhite = '\x1b[47m'

class Logering extends Core {

	// constructor(options) {
	// 	super(options)
	// this.colorizer = format.colorize()

	// const alignedWithTime = format.combine(format.align(),
	// 	format.printf((info) => `${Date.now()
	// 		.toString()}\t${moment()
	// 		.tz('America/Los_Angeles')
	// 		.format('YYYY-MM-DDTHH:mm:ss.SSS')}\t${module}\t${info.level}\t${info.message}`))

	// this.logger = createLogger({
	// 	level: 'debug',
	// 	format: alignedWithTime,
	// 	transports: [
	// 		new transports.File({
	// 			filename: path.join('logs', 'error.log'),
	// 			level: 'error',
	// 			format: alignedWithTime,
	// 		}),
	// 		new transports.File({ filename: path.join('logs', 'combined.log') }),
	// 		new transports.File({ filename: path.join('logs', `${module}.log`) }),
	// 	],
	// })

	// if (process.env.NODE_ENV === 'DEVELOPMENT') {
	// 	this.logger.add(new transports.Console({
	// 		level: 'debug',
	// 		format: format.printf((msg) => this.colorizer.colorize(msg.level, `${Date.now()
	// 			.toString()}\t${moment()
	// 			.tz('America/Los_Angeles')
	// 			.format('YYYY-MM-DDTHH:mm:ss.SSS')}\t${module}\t${msg.message}`)),
	// 	}))
	// } else {
	// 	this.logger.add(new transports.Console({
	// 		level: 'info',
	// 		format: format.printf((msg) => this.colorizer.colorize(msg.level, `${Date.now()
	// 			.toString()}\t${moment()
	// 			.tz('America/Los_Angeles')
	// 			.format('YYYY-MM-DDTHH:mm:ss.SSS')}\t${module}\t${msg.message}`)),
	// 	}))
	// }
	// }

	debug(msg) {
		return this.log(colors.DEBUG, msg, 'debug')
		// console.log('\x1b[36m%s\x1b[0m', 'I am cyan') // cyan
		// console.log('\x1b[33m%s\x1b[0m', 'I am yellow') // yellow
	}

	info(msg) {
		return this.log(colors.INFO, msg, 'info')
		// console.log('\x1b[36m%s\x1b[0m', 'I am cyan') // cyan
		// console.log('\x1b[33m%s\x1b[0m', 'I am yellow') // yellow
	}

	warn(msg) {
		return this.log(colors.WARN, msg, 'warn')
		// console.log('\x1b[36m%s\x1b[0m', 'I am cyan') // cyan
		// console.log('\x1b[33m%s\x1b[0m', 'I am yellow') // yellow
	}

	error(msg) {
		return this.log(colors.ERROR, msg, 'error')
		// console.log('\x1b[36m%s\x1b[0m', 'I am cyan') // cyan
		// console.log('\x1b[33m%s\x1b[0m', 'I am yellow') // yellow
	}

	// get() {
	// 	return this.logger
	// }

}

module.exports = Logering

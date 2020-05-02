/* eslint-disable require-jsdoc */
/* eslint-disable max-lines-per-function */
/* eslint-disable node/no-unpublished-require */
const moment = require('moment-timezone')
const path = require('path')
const {
	createLogger,
	format,
	transports,
} = require('winston')
// const defaults = require('../resources/defaults.json')

class Logering {

	constructor(module) {
		this.colorizer = format.colorize()

		const alignedWithTime = format.combine(format.align(),
			format.printf((info) => `${Date.now()
				.toString()}\t${moment()
				.tz('America/Los_Angeles')
				.format('YYYY-MM-DDTHH:mm:ss.SSS')}\t${module}\t${info.level}\t${info.message}`))

		this.logger = createLogger({
			level: 'debug',
			format: alignedWithTime,
			transports: [
				new transports.File({
					filename: path.join('logs', 'error.log'),
					level: 'error',
					format: alignedWithTime,
				}),
				new transports.File({ filename: path.join('logs', 'combined.log') }),
				new transports.File({ filename: path.join('logs', `${module}.log`) }),
			],
		})

		if (process.env.NODE_ENV === 'DEVELOPMENT') {
			this.logger.add(new transports.Console({
				level: 'debug',
				format: format.printf((msg) => this.colorizer.colorize(msg.level, `${Date.now()
					.toString()}\t${moment()
					.tz('America/Los_Angeles')
					.format('YYYY-MM-DDTHH:mm:ss.SSS')}\t${module}\t${msg.message}`)),
			}))
		} else {
			this.logger.add(new transports.Console({
				level: 'info',
				format: format.printf((msg) => this.colorizer.colorize(msg.level, `${Date.now()
					.toString()}\t${moment()
					.tz('America/Los_Angeles')
					.format('YYYY-MM-DDTHH:mm:ss.SSS')}\t${module}\t${msg.message}`)),
			}))
		}
	}

	get() {
		return this.logger
	}

}

module.exports = Logering

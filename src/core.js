/* eslint-disable complexity */
/* eslint-disable require-jsdoc */
// const moment = require('moment-timezone')
const fs = require('fs')

class Core {

	constructor(options) {
		this.options = options
	}

	log(color, rawMsg, type) {
		try {
			const msgArray = []
			const date = new Date()
			const dateIsoString = date.toISOString()

			if (this.options.logId) msgArray.push(date.getTime())
			if (this.options.date) msgArray.push(dateIsoString)

			msgArray.push(`${type}${(type === 'info' || type === 'warn') ? ' ' : ''}`)
			if (this.options.module) msgArray.push(`${this.options.module}`)
			msgArray.push(rawMsg)

			if (this.options.logFilePath) fs.appendFileSync(this.options.logFilePath, `${msgArray.join('\t')}\n`)

			console.log(color, msgArray.join(' | '))

			return true
		} catch (err) {
			console.log('Error occurred on core log function')

			return false
		}
	}

}

module.exports = Core

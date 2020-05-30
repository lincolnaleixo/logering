/* eslint-disable complexity */
/* eslint-disable require-jsdoc */
// const moment = require('moment-timezone')
const fs = require('fs')
require('dotenv').config()

class Core {

	constructor(module) {
		this.module = module
	}

	log(color, rawMsg, type) {
		try {
			const msgArray = []
			const date = new Date()
			const dateIsoString = date.toISOString()

			if (process.env.LOGERING_LOG_ID) msgArray.push(date.getTime())
			if (process.env.LOGERING_DATE) msgArray.push(dateIsoString)

			msgArray.push(`${type}${(type === 'info' || type === 'warn') ? ' ' : ''}`)
			if (this.module) msgArray.push(`${this.module}`)
			msgArray.push(rawMsg)

			if (process.env.LOGERING_FILE_PATH) fs.appendFileSync(process.env.LOGERING_FILE_PATH, `${msgArray.join('\t')}\n`)

			console.log(color, msgArray.join(' | '))

			return true
		} catch (err) {
			console.log('Error occurred on core log function')

			return false
		}
	}

}

module.exports = Core

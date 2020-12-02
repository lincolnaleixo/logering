/* eslint-disable require-jsdoc */
const fs = require('fs')
const path = require('path')
const Sentry = require('@sentry/node')
const jsonfile = require('jsonfile')
const appRoot = require('app-root-path')

class Core {

	constructor(module, config) {
		this.Sentry = Sentry
		this.sentryConfig = config
		const packageFilePath = path.join(appRoot.path, 'package.json')
		// let releaseVersion = 'null'
		// if (fs.existsSync(packageFilePath)) releaseVersion = jsonfile.readFileSync(packageFilePath).version

		if (this.sentryConfig.SENTRY_ENABLED.toLowerCase() === 'true' && process.env.NODE_ENV === 'PRODUCTION') {
			this.Sentry.init({
				dsn: this.sentryConfig.SENTRY_DSN,
				environment: process.env.NODE_ENV.toLowerCase(),
				maxBreadcrumbs: 50,
				release: fs.existsSync(packageFilePath) ? jsonfile.readFileSync(packageFilePath).version : 'N/A',
			})
		}
		this.module = module
	}

	// eslint-disable-next-line complexity
	log(color, rawMsg, type) {
		try {
			const msgArray = []
			this.date = new Date()

			msgArray.push(this.date.getTime())
			msgArray.push(this.date.toISOString())
			msgArray.push(`${type}${(type === 'info' || type === 'warn') ? ' ' : ''}`)
			if (this.module) msgArray.push(`${this.module}`)
			msgArray.push(rawMsg)

			if (this.sentryConfig.FILE_PATH) fs.appendFileSync(this.sentryConfig.FILE_PATH, `${msgArray.join('\t')}\n`)

			if (type === 'debug') {
				if (process.env.NODE_ENV === 'DEBUG' || process.env.NODE_ENV === 'DEVELOPMENT') {
					console.log(color, msgArray.join(' | '))
				}
			} else {
				console.log(color, msgArray.join(' | '))
			}

			this.setSentryInfo(type, rawMsg)
		} catch (err) {
			this.sendSentryException(`Error occurred on core log function: ${err}`)
			throw new Error(`Error occurred on core log function: ${err}`)
		}
	}

	setSentryInfo(type, rawMsg) {
		if (this.sentryConfig.SENTRY_ENABLED.toLowerCase() === 'true' && process.env.NODE_ENV === 'PRODUCTION') {
			const sentryType = type === 'warn' ? 'warning' : type
			// Sentry.configureScope((scope) => {
			// 	scope.setTag('page_locale', 'de-at')
			// })

			this.Sentry.setTags({
				module: this.module,
				node: process.version,
				platform: process.platform,
				v8: process.versions.v8,
				id: this.date.getTime().toString(),
			})

			this.Sentry.setUser({ email: this.sentryConfig.SENTRY_USERNAME })

			this.Sentry.captureMessage(rawMsg, sentryType)
		}
	}

	sendSentryException(message) {
		if (this.sentryConfig.SENTRY_ENABLED.toLowerCase() === 'true' && process.env.NODE_ENV === 'PRODUCTION') {
			Sentry.captureException(message)
		}
	}

}

module.exports = Core

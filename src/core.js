/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
/* eslint-disable require-jsdoc */
// const moment = require('moment-timezone')
const fs = require('fs')
require('dotenv').config()
// const googleapis = require('googleapis')
const Sentry = require('@sentry/node')

class Core {

	constructor(module) {
		this.Sentry = Sentry
		if (process.env.LOGERING_SENTRY === 'true'
		&& process.env.NODE_ENV === 'PRODUCTION') {
			this.Sentry.init({
				dsn: process.env.LOGERING_SENTRY_DSN,
				environment: process.env.NODE_ENV.toLowerCase(),
				maxBreadcrumbs: 50,
				release: JSON.parse(fs.readFileSync('./package.json').toString()).version,
				// release: `logering@${process.env.npm_package_version}`,
			})
		}
		this.module = module
		// this.clientSecret = JSON
		// 	.parse(fs.readFileSync(process.env.LOGERING_GOOGLE_CLIENT_SECRET_PATH).toString())
		// 	.installed
		// this.gDriveToken = JSON
		// 	.parse(fs.readFileSync(process.env.LOGERING_GOOGLE_GDRIVE_SECRET_PATH).toString())
		// this.oauth2Client = new googleapis.google.auth.OAuth2(this.clientSecret.client_id,
		// 	this.clientSecret.client_secret,
		// 	this.clientSecret.redirect_uris[0])
		// this.oauth2Client.forceRefreshOnFailure = true
		// this.oauth2Client.setCredentials(this.gDriveToken)

		// this.sheetsApi = googleapis.google.sheets('v4')
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

			if (process.env.LOGERING_FILE_PATH !== undefined
				&& process.env.LOGERING_FILE_PATH !== ''
				&& process.env.LOGERING_FILE_PATH !== 'undefined') fs.appendFileSync(process.env.LOGERING_FILE_PATH, `${msgArray.join('\t')}\n`)

			// if (process.env.LOGERING_GSHEETS === 'true') {
			// 	const values = [ [] ]
			// 	msgArray.forEach((item) => values[0].push(item))
			// 	const request = {
			// 		spreadsheetId: process.env.LOGERING_SPREADSHEET_ID,
			// 		range: 'A1',
			// 		valueInputOption: 'USER_ENTERED',
			// 		resource: {
			// 			values,
			// 			majorDimension: 'ROWS',
			// 		},
			// 		auth: this.oauth2Client,
			// 	}
			// 	this.sheetsApi.spreadsheets.values.append(request)
			if (type === 'debug') {
				if (process.env.NODE_ENV === 'DEBUG' || process.env.NODE_ENV === 'DEVELOPMENT') console.log(color, msgArray.join(' | '))
			} else console.log(color, msgArray.join(' | '))

			const sentryType = type === 'warn' ? 'warning' : type
			if (process.env.LOGERING_SENTRY === 'true'
			&& process.env.NODE_ENV === 'PRODUCTION') {
				// Sentry.configureScope((scope) => {
				// 	scope.setTag('page_locale', 'de-at')
				// })

				this.Sentry.setTags({
					module: this.module,
					node: process.version,
					platform: process.platform,
					v8: process.versions.v8,
				})

				this.Sentry.setUser({ email: process.env.LOGERING_SENTRY_USERNAME })

				this.Sentry.captureMessage(msgArray.join(' | '), sentryType)
			}

			return true
		} catch (err) {
			console.log(`Error occurred on core log function: ${err}`)
			this.sendSentryException(`Error occurred on core log function: ${err}`)

			return false
		}
	}

	sendSentryException(message) {
		if (process.env.LOGERING_SENTRY === 'true'
			&& process.env.NODE_ENV === 'PRODUCTION') {
			Sentry.captureException(message)
		}
	}

}

module.exports = Core

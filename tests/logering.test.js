/* eslint-disable max-lines-per-function */
const Logering = require('../src/logering');

(async () => {
	const log = new Logering('test')
	if (require.main === module) {
		process.env.LOGERING_FILE_PATH = process.env.LOGERING_FILE_PATH_BACKUP
		log.debug('this is a debug message')
		log.info('this is a info message')
		log.warn('this is a warning message')
		log.error('this is a error message')
	} else {
		test('log debug type', () => {
			expect(log.debug('this is a debug message')).toBe(true)
		})
		test('log info type', () => {
			expect(log.info('this is a info message')).toBe(true)
		})
		test('log warn type', () => {
			expect(log.warn('this is a warn message')).toBe(true)
		})
		test('log error type', () => {
			expect(log.error('this is a error message')).toBe(true)
			process.env.LOGERING_FILE_PATH = 'logs/log.log'
		})

		test('log debug type on file', () => {
			expect(log.debug('this is a debug message')).toBe(true)
		})
		test('log info type on file', () => {
			expect(log.info('this is a info message')).toBe(true)
		})
		test('log warn type on file', () => {
			expect(log.warn('this is a warn message')).toBe(true)
		})
		test('log error type on file', () => {
			expect(log.error('this is a error message')).toBe(true)
		})
	}
})()

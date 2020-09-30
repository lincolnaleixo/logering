const jsonfile = require('jsonfile')
const Logering = require('../src/logering.js');

(async () => {
	process.env.NODE_ENV = 'PRODUCTION'
	const logger = new Logering('test', jsonfile.readFileSync('tests/config.json').LOGERING)
	logger.fatal('testing info fatal')
})()

const express = require('express');
// const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const prisma = require('../db/prisma.js');
const { CreateChannel } = require('./utils');

const StartServer = async () => {
	const app = express();
	const PORT = 8001;

	await databaseConnection();

	// const channel = await CreateChannel();

	await expressApp(app);

	app
		.listen(PORT, () => {
			console.log(`listening to port ${PORT}`);
		})
		.on('error', (err) => {
			console.log(err);
			process.exit();
		});
	// .on('close', () => {
	// 	channel.close();
	// });
};

StartServer();

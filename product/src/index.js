const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

const StartServer = async () => {
	const app = express();

	await databaseConnection();

	await expressApp(app);

	app
		.listen(8002, () => {
			console.log(`listening to port 80022`);
		})
		.on('error', (err) => {
			console.log(err);
			process.exit();
		});
};

StartServer();

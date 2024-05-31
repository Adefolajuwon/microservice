import express from 'express';
import dotenv from 'dotenv';
import { expressApp } from './express.js';

dotenv.config();
const StartServer = async () => {
	const app = express();
	const PORT = process.env.PORT || 3000;
	// const PORT = 8001;

	await expressApp(app);
	app
		.listen(8001, () => {
			console.log(`---server listning on port ${PORT}---`);
		})
		.on('error', (err) => {
			console.log(err);
			process.exit();
		})
		.on('close', () => {
			channel.close();
		});
};
StartServer();

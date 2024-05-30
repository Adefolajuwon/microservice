import express from 'express';
import dotenv from 'dotenv';
import expressApp from '../customer/src/express-app';

dotenv.config();
const StartServer = async () => {
	const app = express();
	const PORT = process.env.PORT || 3000;
	await expressApp(app);
	app
		.listen(PORT, () => {
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

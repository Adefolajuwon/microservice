import express from 'express';
import cors from 'cors';
import walletRouter from './src/api/routes/wallet-routes.js';

export const expressApp = (app) => {
	app.use(cors());
	app.use(express.json());

	app.use('/wallet', walletRouter);
};

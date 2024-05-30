import express from 'express';
import cors from 'cors';

export const expressApp = (app) => {
	app.use(cors());
	app.use(express.json());
};

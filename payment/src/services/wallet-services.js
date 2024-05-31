// index.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// const prisma = new PrismaClient();

export class Wallet {
	constructor() {
		this.prisma = new PrismaClient();
	}
	async createWallet() {
		const userId = 1;
		const wallet = await this.prisma.create({
			userId: userId,
		});
		return wallet;
	}
}

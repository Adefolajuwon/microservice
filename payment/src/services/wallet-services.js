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
	createWallet = async () => {
		try {
			const userId = 15; // Replace with dynamic userId as needed
			const wallet = await this.prisma.wallet.create({
				data: {
					userId: userId,
				},
				select: {
					userId: true,
				},
			});
			return wallet;
		} catch (error) {
			console.error('Error creating wallet:', error);
			throw error;
		}
	};

	getBalance = async () => {
		try {
			const userId = 12; // Replace with dynamic userId as needed

			const wallet = await this.prisma.wallet.findUnique({
				where: { userId: userId },
				select: {
					id: true,
					balance: true,
				},
			});
			if (!wallet) {
				return;
			}
			return wallet; // Ensure to return the retrieved wallet
		} catch (error) {
			console.error('Error retrieving balance:', error);
			throw error;
		}
	};
}

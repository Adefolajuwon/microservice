import { wallets } from './wallet.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	for (let wallet of wallets) {
		await prisma.wallet.create({
			data: wallet,
		});
	}
}

main()
	.catch((e) => {
		console.log(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});

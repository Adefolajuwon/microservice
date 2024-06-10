import { Wallet } from '../../services/wallet-services.js';
import express from 'express';
const walletRouter = express.Router();

const wallet = new Wallet();
walletRouter.get('/balance', wallet.getBalance);
walletRouter.post('/', wallet.createWallet);

export default walletRouter;

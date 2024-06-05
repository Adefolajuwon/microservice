import Wallet from '../../api/routes/wallet-routes.js';
import { Express } from 'express';
const Router = express.Router();

Router.get('/balance', Wallet.getBalance());
export default Router;

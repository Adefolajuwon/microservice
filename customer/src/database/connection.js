const mongoose = require('mongoose');
const { DB_URL } = require('../config');
const dotEnv = require('dotenv');
dotEnv.config();
const uri = process.env.MONGODB_URI;
module.exports = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('Db Connected');
	} catch (error) {
		console.error('Error ============ ON DB Connection');
		console.log(error);
	}
};

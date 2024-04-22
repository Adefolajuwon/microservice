const { CustomerRepository } = require('../database');
const {
	FormateData,
	GeneratePassword,
	GenerateSalt,
	GenerateSignature,
	ValidatePassword,
} = require('../utils');
const { Prisma, PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// All Business logic will be here
class CustomerService {
	constructor() {
		this.repository = new CustomerRepository();
	}

	async SignIn(userInputs) {
		const { email, password } = userInputs;

		const existingCustomer = await prisma.user.findUnique({
			where: { email },
		});

		if (existingCustomer) {
			const validPassword = await ValidatePassword(
				password,
				existingCustomer.password,
				existingCustomer.salt
			);
			if (validPassword) {
				const token = await GenerateSignature({
					email: existingCustomer.email,
					id: existingCustomer.id, // Use id instead of _id
				});
				return FormateData({ id: existingCustomer.id, token });
			}
		}

		return FormateData(null);
	}

	async SignUp(userInputs) {
		const { email, password, phone } = userInputs;

		// create salt
		let salt = await GenerateSalt();

		let userPassword = await GeneratePassword(password, salt);

		const newCustomer = await prisma.user.create({
			data: {
				email,
				password: userPassword,
				phone,
				salt,
			},
		});

		const token = await GenerateSignature({
			email: email,
			id: newCustomer.id, // Use id instead of _id
		});
		return FormateData({ id: newCustomer.id, token });
	}

	async AddNewAddress(id, userInputs) {
		const { street, postalCode, city, country } = userInputs;

		const addressResult = await prisma.user.update({
			where: { id },
			data: {
				addresses: {
					create: {
						street,
						postalCode,
						city,
						country,
					},
				},
			},
		});

		// Return the updated user object with the new address
		return FormateData(addressResult);
	}

	async GetProfile(id) {
		const existingCustomer = await prisma.user.findUnique({
			where: { id },
		});
		return FormateData(existingCustomer);
	}

	async GetShopingDetails(id) {
		const existingCustomer = await prisma.user.findUnique({
			where: { id },
			include: {
				orders: true, // Include orders relation if needed
			},
		});

		return FormateData(existingCustomer); // Might need error handling
	}

	async GetWishList(customerId) {
		const wishListItems = await prisma.user.findUnique({
			where: { id: customerId },
			include: {
				wishList: {
					// Assuming wishlist is a one-to-many relation
					select: { product: true }, // Select only the product information
				},
			},
		}).wishList; // Access wishlist items directly

		return FormateData(wishListItems);
	}

	async AddToWishlist(customerId, product) {
		// Assuming wishlist is a one-to-many relation with Product model
		const wishlistResult = await prisma.user.update({
			where: { id: customerId },
			data: {
				wishList: {
					create: {
						productId: product, // Assuming product is stored as a foreign key
					},
				},
			},
		});

		// Return the updated user object with the new wishlist item
		return FormateData(wishlistResult);
	}

	async ManageCart(customerId, product, qty, isRemove) {
		const cartResult = await this.repository.AddCartItem(
			customerId,
			product,
			qty,
			isRemove
		);
		return FormateData(cartResult);
	}

	async ManageOrder(customerId, order) {
		const orderResult = await this.repository.AddOrderToProfile(
			customerId,
			order
		);
		return FormateData(orderResult);
	}

	async SubscribeEvents(payload) {
		console.log('Triggering.... Customer Events');

		payload = JSON.parse(payload);

		const { event, data } = payload;

		const { userId, product, order, qty } = data;

		switch (event) {
			case 'ADD_TO_WISHLIST':
			case 'REMOVE_FROM_WISHLIST':
				this.AddToWishlist(userId, product);
				break;
			case 'ADD_TO_CART':
				this.ManageCart(userId, product, qty, false);
				break;
			case 'REMOVE_FROM_CART':
				this.ManageCart(userId, product, qty, true);
				break;
			case 'CREATE_ORDER':
				this.ManageOrder(userId, order);
				break;
			default:
				break;
		}
	}
}

module.exports = CustomerService;

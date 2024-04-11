export const URL_API = "https://ecommerce-be-gqhu.onrender.com";

export type ResponseAuth = {
	jwt: string;
	user: User;
};

export type ResponseError = {
	data: string;
	error: {
		status: number;
		name: string;
		message: string;
		details: {};
	};
};

export type User = {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: Date;
	updatedAt: Date;
	phone: string;
};

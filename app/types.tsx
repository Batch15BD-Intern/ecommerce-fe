export const URL_API = "https://ecommerce-be-gqhu.onrender.com";

export type ResponseAuth = {
	jwt: string;
	user: User;
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

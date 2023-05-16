export interface UserProps {
	id: string;
	createdAt?: string;
	name: string;
	email: string;
	password?: string | null;
	role: "USER" | "ADMIN";
	avatar: string;
	token: string;
}

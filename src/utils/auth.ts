import bcrypt from "bcryptjs";
import { z } from "zod";

export const signUpSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 12;
	return bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (
	password: string,
	hashedPassword: string,
): Promise<boolean> => {
	return bcrypt.compare(password, hashedPassword);
};

export const validateSignUp = (data: unknown) => {
	return signUpSchema.safeParse(data);
};

export const validateSignIn = (data: unknown) => {
	return signInSchema.safeParse(data);
};

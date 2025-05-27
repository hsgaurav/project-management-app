import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import { hashPassword, validateSignUp } from "@/utils/auth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		const validation = validateSignUp(req.body);

		if (!validation.success) {
			return res.status(400).json({
				message: "Validation error",
				errors: validation.error.format(),
			});
		}

		const { name, email, password } = validation.data;

		const existingUser = await db.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return res.status(400).json({
				message: "User with this email already exists",
			});
		}

		const hashedPassword = await hashPassword(password);

		const user = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
			},
		});

		res.status(201).json({
			message: "User created successfully",
			user,
		});
	} catch (error) {
		console.error("Signup error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

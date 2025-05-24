import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	BarChart3,
	User,
	Building,
} from "lucide-react";
import { authOptions } from "@/server/auth";

export default function Signup() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		company: "",
		role: "team_member",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match.");
			setIsLoading(false);
			return;
		}

		if (formData.password.length < 8) {
			setError("Password must be at least 8 characters long.");
			setIsLoading(false);
			return;
		}

		try {
			console.log("Signup data:", formData);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			
			window.location.href = "/auth/login?message=account-created";
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Create Account - ProjectHub</title>
				<meta name="description" content="Create your ProjectHub account" />
			</Head>

			<div className="flex min-h-screen flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<div className="flex justify-center">
						<div className="bg-coral-500 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
							<BarChart3 className="h-6 w-6 text-white" />
						</div>
					</div>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
						Create your account
					</h2>
					<p className="mt-2 text-center text-base text-gray-500">
						Join ProjectHub and start managing your projects
					</p>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="shadow-card border border-gray-100 bg-white px-6 py-8 sm:rounded-2xl sm:px-10">
						{error && (
							<div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
								<p className="text-sm font-medium text-red-600">{error}</p>
							</div>
						)}

						<form className="space-y-6" onSubmit={handleSubmit}>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
										First Name
									</label>
									<div className="relative">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
											<User className="h-5 w-5 text-gray-400" />
										</div>
										<input
											id="firstName"
											name="firstName"
											type="text"
											required
											value={formData.firstName}
											onChange={handleChange}
											className="focus:ring-coral-500 focus:border-coral-500 block w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2"
											placeholder="John"
										/>
									</div>
								</div>

								<div>
									<label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
										Last Name
									</label>
									<div className="relative">
										<input
											id="lastName"
											name="lastName"
											type="text"
											required
											value={formData.lastName}
											onChange={handleChange}
											className="focus:ring-coral-500 focus:border-coral-500 block w-full rounded-xl border border-gray-300 py-3 px-4 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2"
											placeholder="Doe"
										/>
									</div>
								</div>
							</div>

							<div>
								<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
									Email
								</label>
								<div className="relative">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
										<Mail className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={formData.email}
										onChange={handleChange}
										className="focus:ring-coral-500 focus:border-coral-500 block w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2"
										placeholder="john@company.com"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
									Company
								</label>
								<div className="relative">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
										<Building className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="company"
										name="company"
										type="text"
										required
										value={formData.company}
										onChange={handleChange}
										className="focus:ring-coral-500 focus:border-coral-500 block w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2"
										placeholder="Your Company"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="role" className="mb-2 block text-sm font-medium text-gray-700">
									Role
								</label>
								<select
									id="role"
									name="role"
									value={formData.role}
									onChange={handleChange}
									className="focus:ring-coral-500 focus:border-coral-500 block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2"
								>
									<option value="team_member">Team Member</option>
									<option value="project_manager">Project Manager</option>
									<option value="team_lead">Team Lead</option>
								</select>
							</div>

							<div>
								<label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
									Password
								</label>
								<div className="relative">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										autoComplete="new-password"
										required
										value={formData.password}
										onChange={handleChange}
										className="focus:ring-coral-500 focus:border-coral-500 block w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2"
										placeholder="Create a strong password"
									/>
									<button
										type="button"
										className="absolute inset-y-0 right-0 flex items-center pr-4"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5 text-gray-400 transition-colors hover:text-gray-600" />
										) : (
											<Eye className="h-5 w-5 text-gray-400 transition-colors hover:text-gray-600" />
										)}
									</button>
								</div>
							</div>

							<div>
								<label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
									Confirm Password
								</label>
								<div className="relative">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="confirmPassword"
										name="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										autoComplete="new-password"
										required
										value={formData.confirmPassword}
										onChange={handleChange}
										className="focus:ring-coral-500 focus:border-coral-500 block w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2"
										placeholder="Confirm your password"
									/>
									<button
										type="button"
										className="absolute inset-y-0 right-0 flex items-center pr-4"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? (
											<EyeOff className="h-5 w-5 text-gray-400 transition-colors hover:text-gray-600" />
										) : (
											<Eye className="h-5 w-5 text-gray-400 transition-colors hover:text-gray-600" />
										)}
									</button>
								</div>
							</div>

							<div>
								<button
									type="submit"
									disabled={isLoading}
									className="bg-coral-500 hover:bg-coral-600 focus:ring-coral-500 flex w-full justify-center rounded-xl border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								>
									{isLoading ? (
										<div className="flex items-center">
											<div className="-ml-1 mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
											Creating account...
										</div>
									) : (
										"Create account"
									)}
								</button>
							</div>
						</form>

						<div className="mt-8">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-200" />
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="bg-white px-4 font-medium text-gray-500">
										Already have an account?
									</span>
								</div>
							</div>

							<div className="mt-6 text-center">
								<Link
									href="/auth/login"
									className="focus:ring-coral-500 inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
								>
									Sign in
								</Link>
							</div>
						</div>
					</div>

					<div className="mt-8 text-center">
						<p className="text-xs text-gray-500">
							By creating an account, you agree to our{" "}
							<Link href="/terms" className="text-coral-500 hover:text-coral-600 font-medium">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link href="/privacy" className="text-coral-500 hover:text-coral-600 font-medium">
								Privacy Policy
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (session) {
		return { redirect: { destination: "/", permanent: false } };
	}

	return { props: {} };
} 
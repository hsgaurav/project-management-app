import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { signIn, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, BarChart3 } from "lucide-react";
import { authOptions } from "@/server/auth";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError("Invalid credentials. Please try again.");
			} else {
				window.location.href = "/dashboard";
			}
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Sign In - ProjectHub</title>
				<meta name="description" content="Sign in to your ProjectHub account" />
			</Head>

			<div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<div className="flex justify-center">
						<div className="w-12 h-12 bg-coral-500 rounded-xl flex items-center justify-center shadow-lg">
							<BarChart3 className="w-6 h-6 text-white" />
						</div>
					</div>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
						Welcome back
					</h2>
					<p className="mt-2 text-center text-base text-gray-500">
						Sign in to continue to ProjectHub
					</p>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-6 shadow-card sm:rounded-2xl sm:px-10 border border-gray-100">
						{error && (
							<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
								<p className="text-sm text-red-600 font-medium">{error}</p>
							</div>
						)}

						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
									Email
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
										<Mail className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-all duration-200 text-base"
										placeholder="Enter your email"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										autoComplete="current-password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-all duration-200 text-base"
										placeholder="Enter your password"
									/>
									<button
										type="button"
										className="absolute inset-y-0 right-0 pr-4 flex items-center"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
										) : (
											<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
										)}
									</button>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 text-coral-500 focus:ring-coral-500 border-gray-300 rounded"
									/>
									<label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
										Remember me
									</label>
								</div>

								<div className="text-sm">
									<Link
										href="/auth/forgot-password"
										className="font-medium text-coral-500 hover:text-coral-600 transition-colors"
									>
										Forgot password?
									</Link>
								</div>
							</div>

							<div>
								<button
									type="submit"
									disabled={isLoading}
									className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
								>
									{isLoading ? (
										<div className="flex items-center">
											<div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
											Signing in...
										</div>
									) : (
										'Sign in'
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
									<span className="px-4 bg-white text-gray-500 font-medium">New to ProjectHub?</span>
								</div>
							</div>

							<div className="mt-6 text-center">
								<Link
									href="/auth/signup"
									className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all duration-200 hover:shadow-md"
								>
									Create an account
								</Link>
							</div>
						</div>
					</div>

					<div className="mt-8 text-center">
						<p className="text-xs text-gray-500">
							By signing in, you agree to our{" "}
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
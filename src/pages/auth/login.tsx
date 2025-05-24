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

			<div className="flex min-h-screen flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<div className="flex justify-center">
						<div className="bg-coral-500 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
							<BarChart3 className="h-6 w-6 text-white" />
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
					<div className="shadow-card border border-gray-100 bg-white px-6 py-8 sm:rounded-2xl sm:px-10">
						{error && (
							<div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
								<p className="text-sm font-medium text-red-600">{error}</p>
							</div>
						)}

						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-medium text-gray-700"
								>
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
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="focus:ring-coral-500 focus:border-coral-500 block w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2"
										placeholder="Enter your email"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="mb-2 block text-sm font-medium text-gray-700"
								>
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
										autoComplete="current-password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="focus:ring-coral-500 focus:border-coral-500 block w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2"
										placeholder="Enter your password"
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

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="text-coral-500 focus:ring-coral-500 h-4 w-4 rounded border-gray-300"
									/>
									<label
										htmlFor="remember-me"
										className="ml-3 block text-sm text-gray-700"
									>
										Remember me
									</label>
								</div>

								<div className="text-sm">
									<Link
										href="/auth/forgot-password"
										className="text-coral-500 hover:text-coral-600 font-medium transition-colors"
									>
										Forgot password?
									</Link>
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
											Signing in...
										</div>
									) : (
										"Sign in"
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
										New to ProjectHub?
									</span>
								</div>
							</div>

							<div className="mt-6 text-center">
								<Link
									href="/auth/signup"
									className="focus:ring-coral-500 inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
								>
									Create an account
								</Link>
							</div>
						</div>
					</div>

					<div className="mt-8 text-center">
						<p className="text-xs text-gray-500">
							By signing in, you agree to our{" "}
							<Link
								href="/terms"
								className="text-coral-500 hover:text-coral-600 font-medium"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="text-coral-500 hover:text-coral-600 font-medium"
							>
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

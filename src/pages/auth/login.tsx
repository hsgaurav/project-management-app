import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { signIn, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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

	const containerStyles = {
		minHeight: "100vh",
		background: "linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "1rem",
		position: "relative" as const,
		overflow: "hidden",
	};

	const backgroundPatternStyles = {
		position: "absolute" as const,
		inset: "0",
		background: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%239333ea' fill-opacity='0.1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
	};

	const cardStyles = {
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		backdropFilter: "blur(20px)",
		border: "1px solid rgba(255, 255, 255, 0.1)",
		borderRadius: "1rem",
		padding: "2rem",
		width: "100%",
		maxWidth: "400px",
		boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
		zIndex: 10,
		position: "relative" as const,
	};

	const inputStyles = {
		width: "100%",
		padding: "0.75rem 1rem",
		paddingLeft: "2.5rem",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		border: "1px solid rgba(255, 255, 255, 0.2)",
		borderRadius: "0.5rem",
		color: "white",
		fontSize: "1rem",
		transition: "all 0.2s ease",
	};

	const buttonStyles = {
		width: "100%",
		padding: "0.75rem 1rem",
		backgroundColor: "#7c3aed",
		color: "white",
		border: "none",
		borderRadius: "0.5rem",
		fontSize: "1rem",
		fontWeight: "600",
		cursor: "pointer",
		transition: "all 0.2s ease",
		background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
	};

	return (
		<>
			<Head>
				<title>Sign In - Project Management</title>
				<meta name="description" content="Sign in to your account" />
			</Head>

			<div style={containerStyles} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
				<div style={backgroundPatternStyles} className="absolute inset-0 bg-grid-white/10"></div>
				
				<div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

				<div style={cardStyles} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 w-full max-w-md shadow-2xl relative z-10">
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
							<div className="w-8 h-8 bg-white rounded-lg"></div>
						</div>
						<h1 className="text-3xl font-bold text-white mb-2" style={{ color: "white", fontSize: "1.875rem", fontWeight: "700", marginBottom: "0.5rem" }}>
							Welcome Back
						</h1>
						<p className="text-gray-300" style={{ color: "#d1d5db" }}>
							Sign in to continue to your dashboard
						</p>
					</div>

					{error && (
						<div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", width: "1.25rem", height: "1.25rem" }} />
							<input
								type="email"
								placeholder="Enter your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								style={inputStyles}
								className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
								onFocus={(e) => {
									e.target.style.borderColor = "#8b5cf6";
									e.target.style.boxShadow = "0 0 0 2px rgba(139, 92, 246, 0.2)";
								}}
								onBlur={(e) => {
									e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
									e.target.style.boxShadow = "none";
								}}
							/>
						</div>

						<div className="relative">
							<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", width: "1.25rem", height: "1.25rem" }} />
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								style={{...inputStyles, paddingRight: "2.5rem"}}
								className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
								onFocus={(e) => {
									e.target.style.borderColor = "#8b5cf6";
									e.target.style.boxShadow = "0 0 0 2px rgba(139, 92, 246, 0.2)";
								}}
								onBlur={(e) => {
									e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
									e.target.style.boxShadow = "none";
								}}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
								style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5" style={{ width: "1.25rem", height: "1.25rem" }} />
								) : (
									<Eye className="w-5 h-5" style={{ width: "1.25rem", height: "1.25rem" }} />
								)}
							</button>
						</div>

						<div className="flex items-center justify-between text-sm">
							<label className="flex items-center text-gray-300">
								<input type="checkbox" className="mr-2 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500" />
								Remember me
							</label>
							<Link href="/auth/forgot-password" className="text-purple-400 hover:text-purple-300 transition-colors">
								Forgot password?
							</Link>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							style={buttonStyles}
							className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
							onMouseEnter={(e) => {
								if (!isLoading) {
									e.currentTarget.style.background = "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)";
									e.currentTarget.style.transform = "translateY(-1px)";
								}
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)";
								e.currentTarget.style.transform = "translateY(0)";
							}}
						>
							{isLoading ? "Signing in..." : "Sign In"}
						</button>
					</form>

					<div className="mt-8 text-center">
						<p className="text-gray-400 text-sm">
							Don't have an account?{" "}
							<Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
								Create one now
							</Link>
						</p>
					</div>

					<div className="mt-6 text-center text-xs text-gray-500">
						By signing in, you agree to our{" "}
						<Link href="/terms" className="text-purple-400 hover:text-purple-300">
							Terms
						</Link>{" "}
						and{" "}
						<Link href="/privacy" className="text-purple-400 hover:text-purple-300">
							Privacy Policy
						</Link>
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
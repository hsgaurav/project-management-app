import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { BarChart3, LogOut, User } from "lucide-react";
import { authOptions } from "@/server/auth";

export default function Dashboard() {
	const { data: session } = useSession();

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/login" });
	};

	return (
		<>
			<Head>
				<title>Dashboard - ProjectHub</title>
				<meta name="description" content="Your ProjectHub dashboard" />
			</Head>

			<div className="min-h-screen bg-gray-50">
				<nav className="border-b border-gray-200 bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex items-center">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-500">
									<BarChart3 className="h-5 w-5 text-white" />
								</div>
								<span className="ml-2 text-xl font-bold text-gray-900">
									ProjectHub
								</span>
							</div>

							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<User className="h-5 w-5 text-gray-400" />
									<span className="text-sm font-medium text-gray-700">
										{session?.user?.name || session?.user?.email}
									</span>
								</div>
								<button
									onClick={handleSignOut}
									className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
								>
									<LogOut className="h-4 w-4" />
									<span>Sign out</span>
								</button>
							</div>
						</div>
					</div>
				</nav>

				<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900">
							Welcome back, {session?.user?.name?.split(" ")[0] || "User"}!
						</h1>
						<p className="mt-2 text-gray-600">
							Here&apos;s what&apos;s happening with your projects today.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
							<h3 className="text-lg font-medium text-gray-900">
								Authentication Status
							</h3>
							<div className="mt-4 space-y-2">
								<p className="text-sm text-gray-600">
									<span className="font-medium">Status:</span>{" "}
									<span className="text-green-600">✅ Authenticated</span>
								</p>
								<p className="text-sm text-gray-600">
									<span className="font-medium">User ID:</span>{" "}
									{session?.user?.id}
								</p>
								<p className="text-sm text-gray-600">
									<span className="font-medium">Email:</span>{" "}
									{session?.user?.email}
								</p>
								<p className="text-sm text-gray-600">
									<span className="font-medium">Name:</span>{" "}
									{session?.user?.name}
								</p>
							</div>
						</div>

						<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
							<h3 className="text-lg font-medium text-gray-900">Projects</h3>
							<p className="mt-2 text-sm text-gray-600">
								Your project management features will be implemented here.
							</p>
							<div className="mt-4">
								<div className="text-2xl font-bold text-coral-500">0</div>
								<p className="text-sm text-gray-500">Active Projects</p>
							</div>
						</div>

						<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
							<h3 className="text-lg font-medium text-gray-900">Tasks</h3>
							<p className="mt-2 text-sm text-gray-600">
								Your task management features will be implemented here.
							</p>
							<div className="mt-4">
								<div className="text-2xl font-bold text-coral-500">0</div>
								<p className="text-sm text-gray-500">Pending Tasks</p>
							</div>
						</div>
					</div>

					<div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h3 className="text-lg font-medium text-gray-900">
							🎉 Authentication Setup Complete!
						</h3>
						<div className="mt-4 space-y-2 text-sm text-gray-600">
							<p>✅ Email/password authentication with NextAuth.js</p>
							<p>✅ Secure password hashing with bcryptjs</p>
							<p>✅ User registration and login functionality</p>
							<p>✅ Session management with JWT</p>
							<p>✅ Protected routes and server-side authentication</p>
							<p>✅ Database integration with Prisma</p>
						</div>
						<div className="mt-4 rounded-lg bg-green-50 p-4">
							<p className="text-sm font-medium text-green-800">
								Your authentication system is now ready! You can start building
								your project management features.
							</p>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

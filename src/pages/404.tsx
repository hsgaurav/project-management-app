import Head from "next/head";
import { useRouter } from "next/router";
import { BarChart3 } from "lucide-react";

export default function Custom404() {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Page Not Found - ProjectHub</title>
				<meta
					name="description"
					content="The page you're looking for doesn't exist"
				/>
			</Head>

			<div className="flex min-h-screen items-center justify-center bg-white px-6">
				<div className="text-center">
					<div className="mb-8 flex justify-center">
						<div className="bg-coral-500 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg">
							<BarChart3 className="h-8 w-8 text-white" />
						</div>
					</div>

					<h1 className="mb-4 text-8xl font-bold text-gray-200">404</h1>
					<h2 className="mb-4 text-2xl font-semibold text-gray-700">
						Page not found
					</h2>
					<p className="mb-8 max-w-sm text-gray-500">
						The page you&apos;re looking for doesn&apos;t exist.
					</p>

					<button
						onClick={() => router.push("/")}
						className="bg-coral-500 hover:bg-coral-600 focus:ring-coral-500 inline-flex items-center rounded-xl px-6 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
					>
						Go Home
					</button>
				</div>
			</div>
		</>
	);
}

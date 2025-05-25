import { type NextPage, type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { authOptions } from "@/server/auth";

const Home: NextPage = () => {
	const hello = api.post.hello.useQuery({ text: "from tRPC" });

	return (
		<>
			<Head>
				<title>Project Management App</title>
				<meta
					name="description"
					content="A modern project management application"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						Project <span className="text-[hsl(280,100%,70%)]">Management</span>{" "}
						App
					</h1>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
						<Link
							className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
							href="/auth/signup"
						>
							<h3 className="text-2xl font-bold">Get Started →</h3>
							<div className="text-lg">
								Create your account and start managing your projects with our
								powerful tools.
							</div>
						</Link>
						<Link
							className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
							href="/auth/login"
						>
							<h3 className="text-2xl font-bold">Sign In →</h3>
							<div className="text-lg">
								Already have an account? Sign in to access your dashboard and
								projects.
							</div>
						</Link>
					</div>
					<div className="flex flex-col items-center gap-2">
						<p className="text-2xl text-white">
							{hello.data ? hello.data.greeting : "Loading tRPC query..."}
						</p>
						<AuthShowcase />
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;

const AuthShowcase: React.FC = () => {
	const { data: sessionData } = useSession();

	const { data: secretMessage } = api.post.getSecretMessage.useQuery(
		undefined, // no input
		{ enabled: sessionData?.user !== undefined },
	);

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<p className="text-center text-2xl text-white">
				{sessionData && <span>Logged in as {sessionData.user?.name}</span>}
				{secretMessage && <span> - {secretMessage}</span>}
			</p>
			<button
				className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
				onClick={sessionData ? () => void signOut() : () => void signIn()}
			>
				{sessionData ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (session) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

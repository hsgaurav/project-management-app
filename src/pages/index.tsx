import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";

const Home = () => {
	return null;
};

export default Home;

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

	// Check if user has completed onboarding
	const user = await db.user.findUnique({
		where: { id: session.user.id },
		select: { onboardingCompleted: true },
	});

	if (!user?.onboardingCompleted) {
		return {
			redirect: {
				destination: "/onboarding",
				permanent: false,
			},
		};
	}

	return {
		redirect: {
			destination: "/dashboard",
			permanent: false,
		},
	};
}

import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";

const Home = () => {
	return null;
};

export default Home;

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
		redirect: {
			destination: "/login",
			permanent: false,
		},
	};
}

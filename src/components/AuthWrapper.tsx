import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, type ReactNode } from "react";
import { api } from "@/utils/api";

interface AuthWrapperProps {
	readonly children: ReactNode;
}

const publicRoutes = ["/login", "/signup", "/404"];

export function AuthWrapper({ children }: AuthWrapperProps) {
	const { data: session, status } = useSession();
	const router = useRouter();

	const { data: onboardingCompleted } = api.user.getOnboardingStatus.useQuery(
		undefined,
		{
			enabled: !!session,
		},
	);

	useEffect(() => {
		const currentPath = router.pathname;
		const isPublicRoute = publicRoutes.includes(currentPath);

		if (status === "loading") {
			return;
		}

		if (!session && !isPublicRoute) {
			void router.replace("/login");
			return;
		}

		if (session && (currentPath === "/login" || currentPath === "/signup")) {
			void router.replace("/");
			return;
		}

		if (session && onboardingCompleted !== undefined && !onboardingCompleted) {
			if (currentPath !== "/onboarding") {
				void router.replace("/onboarding");
				return;
			}
		}

		if (session && onboardingCompleted && currentPath === "/onboarding") {
			void router.replace("/dashboard");
			return;
		}

		if (session && onboardingCompleted && currentPath === "/") {
			void router.replace("/dashboard");
			return;
		}
	}, [session, status, router, onboardingCompleted]);

	if (status === "loading" || (session && onboardingCompleted === undefined)) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<div className="text-center">
					<div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-coral-500 border-t-transparent"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	const currentPath = router.pathname;
	const isPublicRoute = publicRoutes.includes(currentPath);

	if (!session && !isPublicRoute) {
		return null;
	}

	return <>{children}</>;
}

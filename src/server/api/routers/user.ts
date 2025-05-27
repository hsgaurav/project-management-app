import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
	completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
		return ctx.db.user.update({
			where: { id: ctx.session!.user.id },
			data: { onboardingCompleted: true },
		});
	}),

	getOnboardingStatus: protectedProcedure.query(async ({ ctx }) => {
		const user = await ctx.db.user.findUnique({
			where: { id: ctx.session!.user.id },
			select: { onboardingCompleted: true },
		});
		return user?.onboardingCompleted ?? false;
	}),
});

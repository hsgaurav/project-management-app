import { postRouter } from "@/server/api/routers/post";
import { userRouter } from "@/server/api/routers/user";
import { projectRouter } from "@/server/api/routers/project";
import { taskRouter } from "@/server/api/routers/task";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	post: postRouter,
	user: userRouter,
	project: projectRouter,
	task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

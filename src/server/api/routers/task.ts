import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const createTaskSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title too long"),
	description: z.string().optional(),
	status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
	priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
	projectId: z.string().min(1, "Project ID is required"),
	assigneeId: z.string().optional(),
	dueDate: z.date().optional(),
});

const updateTaskSchema = z.object({
	id: z.string().min(1, "Task ID is required"),
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title too long")
		.optional(),
	description: z.string().optional(),
	status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
	priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
	assigneeId: z.string().nullable().optional(),
	dueDate: z.date().nullable().optional(),
});

export const taskRouter = createTRPCRouter({
	create: protectedProcedure
		.input(createTaskSchema)
		.mutation(async ({ ctx, input }) => {
			const userProjects = await ctx.db.project.findMany({
				where: {
					members: {
						some: {
							userId: ctx.session.user.id,
						},
					},
				},
				select: { id: true },
			});

			const isUserInProject = userProjects.some(
				(p) => p.id === input.projectId,
			);
			if (!isUserInProject) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "You don't have permission to create tasks in this project",
				});
			}

			if (input.assigneeId) {
				const assigneeInProject = await ctx.db.projectMember.findFirst({
					where: {
						projectId: input.projectId,
						userId: input.assigneeId,
					},
				});

				if (!assigneeInProject) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Assignee is not a member of this project",
					});
				}
			}

			return ctx.db.task.create({
				data: {
					...input,
					createdById: ctx.session.user.id,
				},
				include: {
					project: {
						select: {
							id: true,
							name: true,
						},
					},
					createdBy: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					assignee: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
			});
		}),

	update: protectedProcedure
		.input(updateTaskSchema)
		.mutation(async ({ ctx, input }) => {
			const { id, ...updateData } = input;

			const existingTask = await ctx.db.task.findFirst({
				where: {
					id,
					project: {
						members: {
							some: {
								userId: ctx.session.user.id,
							},
						},
					},
				},
				include: {
					project: true,
				},
			});

			if (!existingTask) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Task not found or you don't have permission to update it",
				});
			}

			if (
				updateData.assigneeId !== undefined &&
				updateData.assigneeId !== null
			) {
				const assigneeInProject = await ctx.db.projectMember.findFirst({
					where: {
						projectId: existingTask.projectId,
						userId: updateData.assigneeId,
					},
				});

				if (!assigneeInProject) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Assignee is not a member of this project",
					});
				}
			}

			return ctx.db.task.update({
				where: { id },
				data: updateData,
				include: {
					project: {
						select: {
							id: true,
							name: true,
						},
					},
					createdBy: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					assignee: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
			});
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.string().min(1, "Task ID is required") }))
		.mutation(async ({ ctx, input }) => {
			const existingTask = await ctx.db.task.findFirst({
				where: {
					id: input.id,
					project: {
						members: {
							some: {
								userId: ctx.session.user.id,
							},
						},
					},
				},
			});

			if (!existingTask) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Task not found or you don't have permission to delete it",
				});
			}

			return ctx.db.task.delete({
				where: { id: input.id },
			});
		}),

	getById: protectedProcedure
		.input(z.object({ id: z.string().min(1, "Task ID is required") }))
		.query(async ({ ctx, input }) => {
			const task = await ctx.db.task.findFirst({
				where: {
					id: input.id,
					project: {
						members: {
							some: {
								userId: ctx.session.user.id,
							},
						},
					},
				},
				include: {
					project: {
						select: {
							id: true,
							name: true,
						},
					},
					createdBy: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					assignee: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
			});

			if (!task) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Task not found or you don't have permission to view it",
				});
			}

			return task;
		}),

	getByProject: protectedProcedure
		.input(
			z.object({
				projectId: z.string().min(1, "Project ID is required"),
				status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const userProjects = await ctx.db.project.findMany({
				where: {
					members: {
						some: {
							userId: ctx.session.user.id,
						},
					},
				},
				select: { id: true },
			});

			const isUserInProject = userProjects.some(
				(p) => p.id === input.projectId,
			);
			if (!isUserInProject) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "You don't have permission to view tasks in this project",
				});
			}

			return ctx.db.task.findMany({
				where: {
					projectId: input.projectId,
					...(input.status && { status: input.status }),
				},
				include: {
					project: {
						select: {
							id: true,
							name: true,
						},
					},
					createdBy: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					assignee: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
				orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
			});
		}),

	getMyTasks: protectedProcedure
		.input(
			z.object({
				status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
				projectId: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const userProjects = await ctx.db.project.findMany({
				where: {
					members: {
						some: {
							userId: ctx.session.user.id,
						},
					},
				},
				select: { id: true },
			});

			const projectIds = userProjects.map((p) => p.id);

			return ctx.db.task.findMany({
				where: {
					AND: [
						{
							OR: [
								{ assigneeId: ctx.session.user.id },
								{ createdById: ctx.session.user.id },
							],
						},
						{ projectId: { in: projectIds } },
						...(input.status ? [{ status: input.status }] : []),
						...(input.projectId ? [{ projectId: input.projectId }] : []),
					],
				},
				include: {
					project: {
						select: {
							id: true,
							name: true,
						},
					},
					createdBy: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					assignee: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
				orderBy: [
					{ priority: "desc" },
					{ dueDate: "asc" },
					{ createdAt: "desc" },
				],
			});
		}),
});

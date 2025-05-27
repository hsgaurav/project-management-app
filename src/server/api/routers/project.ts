import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ProjectRole } from "@prisma/client";

export const projectRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
				description: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const project = await ctx.db.project.create({
				data: {
					name: input.name,
					description: input.description,
					creatorId: ctx.session!.user.id,
					members: {
						create: {
							userId: ctx.session!.user.id,
							role: ProjectRole.OWNER,
						},
					},
				},
			});
			return project;
		}),

	joinByCode: protectedProcedure
		.input(
			z.object({
				inviteCode: z.string().min(1),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			// For now, we'll implement a simple join by project ID
			// In a real app, you'd have proper invite codes
			const project = await ctx.db.project.findFirst({
				where: { id: input.inviteCode },
			});

			if (!project) {
				throw new Error("Invalid invite code");
			}

			// Check if user is already a member
			const existingMember = await ctx.db.projectMember.findUnique({
				where: {
					projectId_userId: {
						projectId: project.id,
						userId: ctx.session!.user.id,
					},
				},
			});

			if (existingMember) {
				throw new Error("You are already a member of this project");
			}

			// Add user as member
			await ctx.db.projectMember.create({
				data: {
					projectId: project.id,
					userId: ctx.session!.user.id,
					role: ProjectRole.MEMBER,
				},
			});

			return project;
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const projects = await ctx.db.project.findMany({
			where: {
				members: {
					some: {
						userId: ctx.session!.user.id,
					},
				},
			},
			include: {
				members: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								email: true,
							},
						},
					},
				},
				tasks: {
					select: {
						id: true,
						status: true,
					},
				},
				_count: {
					select: {
						members: true,
						tasks: true,
					},
				},
			},
		});

		return projects.map((project) => ({
			id: project.id,
			name: project.name,
			description: project.description,
			taskCount: project._count.tasks,
			memberCount: project._count.members,
			createdAt: project.createdAt,
		}));
	}),

	getTasks: protectedProcedure
		.input(z.object({ projectId: z.string().optional() }))
		.query(async ({ ctx, input }) => {
			const where = input.projectId
				? {
						projectId: input.projectId,
					}
				: {
						project: {
							members: {
								some: {
									userId: ctx.session!.user.id,
								},
							},
						},
					};

			const tasks = await ctx.db.task.findMany({
				where,
				include: {
					assignee: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					project: {
						select: {
							id: true,
							name: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			});

			return tasks;
		}),

	getMembers: protectedProcedure
		.input(z.object({ projectId: z.string() }))
		.query(async ({ ctx, input }) => {
			const project = await ctx.db.project.findFirst({
				where: {
					id: input.projectId,
					members: {
						some: {
							userId: ctx.session!.user.id,
						},
					},
				},
			});

			if (!project) {
				throw new Error("Project not found or access denied");
			}

			const members = await ctx.db.projectMember.findMany({
				where: {
					projectId: input.projectId,
				},
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
				orderBy: {
					role: "asc",
				},
			});

			return members;
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(1),
				description: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const project = await ctx.db.project.findFirst({
				where: {
					id: input.id,
					members: {
						some: {
							userId: ctx.session!.user.id,
							role: {
								in: [ProjectRole.OWNER, ProjectRole.ADMIN],
							},
						},
					},
				},
			});

			if (!project) {
				throw new Error("Project not found or insufficient permissions");
			}

			const updatedProject = await ctx.db.project.update({
				where: { id: input.id },
				data: {
					name: input.name,
					description: input.description,
				},
			});

			return updatedProject;
		}),

	addMember: protectedProcedure
		.input(
			z.object({
				projectId: z.string(),
				email: z.string().email(),
				role: z.enum([ProjectRole.MEMBER, ProjectRole.ADMIN]),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const project = await ctx.db.project.findFirst({
				where: {
					id: input.projectId,
					members: {
						some: {
							userId: ctx.session!.user.id,
							role: {
								in: [ProjectRole.OWNER, ProjectRole.ADMIN],
							},
						},
					},
				},
			});

			if (!project) {
				throw new Error("Project not found or insufficient permissions");
			}

			const user = await ctx.db.user.findUnique({
				where: { email: input.email },
			});

			if (!user) {
				throw new Error("User not found");
			}

			const existingMember = await ctx.db.projectMember.findUnique({
				where: {
					projectId_userId: {
						projectId: input.projectId,
						userId: user.id,
					},
				},
			});

			if (existingMember) {
				throw new Error("User is already a member of this project");
			}

			const member = await ctx.db.projectMember.create({
				data: {
					projectId: input.projectId,
					userId: user.id,
					role: input.role,
				},
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
			});

			return member;
		}),

	removeMember: protectedProcedure
		.input(
			z.object({
				projectId: z.string(),
				memberId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const project = await ctx.db.project.findFirst({
				where: {
					id: input.projectId,
					members: {
						some: {
							userId: ctx.session!.user.id,
							role: {
								in: [ProjectRole.OWNER, ProjectRole.ADMIN],
							},
						},
					},
				},
			});

			if (!project) {
				throw new Error("Project not found or insufficient permissions");
			}

			const memberToRemove = await ctx.db.projectMember.findUnique({
				where: { id: input.memberId },
			});

			if (!memberToRemove || memberToRemove.projectId !== input.projectId) {
				throw new Error("Member not found");
			}

			if (memberToRemove.role === ProjectRole.OWNER) {
				throw new Error("Cannot remove project owner");
			}

			await ctx.db.projectMember.delete({
				where: { id: input.memberId },
			});

			return { success: true };
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const project = await ctx.db.project.findFirst({
				where: {
					id: input.id,
					members: {
						some: {
							userId: ctx.session!.user.id,
							role: ProjectRole.OWNER,
						},
					},
				},
			});

			if (!project) {
				throw new Error(
					"Project not found or insufficient permissions (only owners can delete)",
				);
			}

			await ctx.db.project.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Start seeding...");

	const demoUser = await prisma.user.create({
		data: {
			id: "demo-user-id",
			name: "Demo User",
			email: "demo@example.com",
		},
	});

	const demoProject = await prisma.project.create({
		data: {
			name: "Demo Project",
			description: "A sample project for demonstration",
			creatorId: demoUser.id,
		},
	});

	await prisma.projectMember.create({
		data: {
			userId: demoUser.id,
			projectId: demoProject.id,
			role: "OWNER",
		},
	});

	const demoTasks = await Promise.all([
		prisma.task.create({
			data: {
				title: "Setup development environment",
				description: "Install and configure all necessary tools",
				status: "DONE",
				priority: "HIGH",
				projectId: demoProject.id,
				assigneeId: demoUser.id,
				createdById: demoUser.id,
				dueDate: new Date("2024-01-15"),
			},
		}),
		prisma.task.create({
			data: {
				title: "Design database schema",
				description: "Create ERD and define table relationships",
				status: "IN_PROGRESS",
				priority: "HIGH",
				projectId: demoProject.id,
				assigneeId: demoUser.id,
				createdById: demoUser.id,
				dueDate: new Date("2024-01-20"),
			},
		}),
		prisma.task.create({
			data: {
				title: "Implement user authentication",
				description: "Set up NextAuth.js with email/password authentication",
				status: "TODO",
				priority: "MEDIUM",
				projectId: demoProject.id,
				assigneeId: demoUser.id,
				createdById: demoUser.id,
				dueDate: new Date("2024-01-25"),
			},
		}),
		prisma.task.create({
			data: {
				title: "Create project dashboard",
				description: "Build main dashboard with project overview",
				status: "TODO",
				priority: "MEDIUM",
				projectId: demoProject.id,
				assigneeId: demoUser.id,
				createdById: demoUser.id,
				dueDate: new Date("2024-02-01"),
			},
		}),
		prisma.task.create({
			data: {
				title: "Deploy to production",
				description: "Set up CI/CD pipeline and deploy to AWS",
				status: "TODO",
				priority: "LOW",
				projectId: demoProject.id,
				createdById: demoUser.id,
				dueDate: new Date("2024-02-10"),
			},
		}),
	]);

	console.log("Seeding completed successfully!");
	console.log({
		user: demoUser,
		project: demoProject,
		tasks: demoTasks.length,
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

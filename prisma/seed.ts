import {
	PrismaClient,
	Priority,
	TaskStatus,
	ProjectRole,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting seed...");

	// Clear existing data in reverse order of dependencies
	await prisma.task.deleteMany();
	await prisma.projectMember.deleteMany();
	await prisma.project.deleteMany();
	await prisma.account.deleteMany();
	await prisma.session.deleteMany();
	await prisma.user.deleteMany();

	console.log("🧹 Cleared existing data");

	// Create users
	const hashedPassword = await bcrypt.hash("password123", 12);

	const john = await prisma.user.create({
		data: {
			name: "John Doe",
			email: "john@example.com",
			password: hashedPassword,
			onboardingCompleted: true,
		},
	});

	const jane = await prisma.user.create({
		data: {
			name: "Jane Smith",
			email: "jane@example.com",
			password: hashedPassword,
			onboardingCompleted: true,
		},
	});

	const bob = await prisma.user.create({
		data: {
			name: "Bob Johnson",
			email: "bob@example.com",
			password: hashedPassword,
			onboardingCompleted: true,
		},
	});

	const alice = await prisma.user.create({
		data: {
			name: "Alice Brown",
			email: "alice@example.com",
			password: hashedPassword,
			onboardingCompleted: true,
		},
	});

	const mike = await prisma.user.create({
		data: {
			name: "Mike Wilson",
			email: "mike@example.com",
			password: hashedPassword,
			onboardingCompleted: true,
		},
	});

	console.log("👥 Created users");

	// Create projects
	const websiteProject = await prisma.project.create({
		data: {
			name: "Website Redesign",
			description: "Complete redesign of the company website with modern UI/UX",
			creatorId: john.id,
		},
	});

	const mobileProject = await prisma.project.create({
		data: {
			name: "Mobile App Development",
			description: "Native mobile app for iOS and Android platforms",
			creatorId: jane.id,
		},
	});

	const marketingProject = await prisma.project.create({
		data: {
			name: "Q4 Marketing Campaign",
			description: "Comprehensive marketing campaign for Q4 product launch",
			creatorId: bob.id,
		},
	});

	console.log("📁 Created projects");

	// Add project members
	await prisma.projectMember.createMany({
		data: [
			// Website Redesign members
			{
				projectId: websiteProject.id,
				userId: john.id,
				role: ProjectRole.OWNER,
			},
			{
				projectId: websiteProject.id,
				userId: jane.id,
				role: ProjectRole.ADMIN,
			},
			{
				projectId: websiteProject.id,
				userId: bob.id,
				role: ProjectRole.MEMBER,
			},
			{
				projectId: websiteProject.id,
				userId: alice.id,
				role: ProjectRole.MEMBER,
			},

			// Mobile App members
			{ projectId: mobileProject.id, userId: jane.id, role: ProjectRole.OWNER },
			{ projectId: mobileProject.id, userId: bob.id, role: ProjectRole.ADMIN },
			{
				projectId: mobileProject.id,
				userId: alice.id,
				role: ProjectRole.MEMBER,
			},

			// Marketing Campaign members
			{
				projectId: marketingProject.id,
				userId: bob.id,
				role: ProjectRole.OWNER,
			},
			{
				projectId: marketingProject.id,
				userId: alice.id,
				role: ProjectRole.ADMIN,
			},
			{
				projectId: marketingProject.id,
				userId: mike.id,
				role: ProjectRole.MEMBER,
			},
			{
				projectId: marketingProject.id,
				userId: john.id,
				role: ProjectRole.MEMBER,
			},
		],
	});

	console.log("👥 Added project members");

	// Create tasks
	await prisma.task.createMany({
		data: [
			// Website Redesign tasks
			{
				title: "Design login page",
				description: "Create mockups and designs for the new login page",
				status: TaskStatus.TODO,
				priority: Priority.HIGH,
				projectId: websiteProject.id,
				assigneeId: john.id,
				createdById: jane.id,
				dueDate: new Date("2024-03-15"),
			},
			{
				title: "Implement user authentication",
				description: "Set up NextAuth.js with email/password authentication",
				status: TaskStatus.IN_PROGRESS,
				priority: Priority.HIGH,
				projectId: websiteProject.id,
				assigneeId: jane.id,
				createdById: john.id,
				dueDate: new Date("2024-03-10"),
			},
			{
				title: "Setup responsive layout",
				description: "Implement responsive design for mobile and tablet",
				status: TaskStatus.TODO,
				priority: Priority.MEDIUM,
				projectId: websiteProject.id,
				assigneeId: bob.id,
				createdById: john.id,
				dueDate: new Date("2024-03-20"),
			},
			{
				title: "Deploy to production",
				description: "Deploy the application to production environment",
				status: TaskStatus.DONE,
				priority: Priority.LOW,
				projectId: websiteProject.id,
				assigneeId: alice.id,
				createdById: jane.id,
				completedAt: new Date("2024-02-28"),
			},

			// Mobile App tasks
			{
				title: "Create API endpoints",
				description: "Build REST API endpoints for user management",
				status: TaskStatus.IN_PROGRESS,
				priority: Priority.HIGH,
				projectId: mobileProject.id,
				assigneeId: bob.id,
				createdById: jane.id,
				dueDate: new Date("2024-03-25"),
			},
			{
				title: "Design app UI/UX",
				description: "Create mobile app interface designs",
				status: TaskStatus.TODO,
				priority: Priority.MEDIUM,
				projectId: mobileProject.id,
				assigneeId: alice.id,
				createdById: jane.id,
				dueDate: new Date("2024-04-01"),
			},
			{
				title: "Setup push notifications",
				description: "Implement push notification system",
				status: TaskStatus.TODO,
				priority: Priority.LOW,
				projectId: mobileProject.id,
				assigneeId: jane.id,
				createdById: bob.id,
				dueDate: new Date("2024-04-10"),
			},
			{
				title: "App store submission",
				description: "Submit app to iOS App Store and Google Play",
				status: TaskStatus.TODO,
				priority: Priority.MEDIUM,
				projectId: mobileProject.id,
				assigneeId: jane.id,
				createdById: bob.id,
				dueDate: new Date("2024-04-30"),
			},

			// Marketing Campaign tasks
			{
				title: "Create campaign content",
				description: "Develop content for Q4 marketing campaign",
				status: TaskStatus.IN_PROGRESS,
				priority: Priority.HIGH,
				projectId: marketingProject.id,
				assigneeId: alice.id,
				createdById: bob.id,
				dueDate: new Date("2024-03-30"),
			},
			{
				title: "Social media strategy",
				description: "Plan social media posting schedule and content",
				status: TaskStatus.TODO,
				priority: Priority.MEDIUM,
				projectId: marketingProject.id,
				assigneeId: mike.id,
				createdById: bob.id,
				dueDate: new Date("2024-04-05"),
			},
			{
				title: "Email campaign setup",
				description: "Configure email marketing automation",
				status: TaskStatus.DONE,
				priority: Priority.LOW,
				projectId: marketingProject.id,
				assigneeId: alice.id,
				createdById: bob.id,
				completedAt: new Date("2024-02-25"),
			},
			{
				title: "Analytics tracking",
				description: "Setup campaign performance tracking",
				status: TaskStatus.TODO,
				priority: Priority.MEDIUM,
				projectId: marketingProject.id,
				assigneeId: john.id,
				createdById: alice.id,
				dueDate: new Date("2024-04-15"),
			},
		],
	});

	console.log("✅ Created tasks");

	// Get counts for summary
	const userCount = await prisma.user.count();
	const projectCount = await prisma.project.count();
	const taskCount = await prisma.task.count();

	console.log(`
🎉 Seed completed successfully!
   📊 Summary:
   - ${userCount} users created
   - ${projectCount} projects created
   - ${taskCount} tasks created
   
   🔐 Login credentials (password: password123):
   - john@example.com
   - jane@example.com
   - bob@example.com
   - alice@example.com
   - mike@example.com
  `);
}

main()
	.catch((e) => {
		console.error("❌ Seed failed:");
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      email: "john@example.com",
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "jane@example.com" },
    update: {},
    create: {
      email: "jane@example.com",
      name: "Jane Smith",
      image: "https://github.com/shadcn.png",
    },
  });

  // Create projects
  const project1 = await prisma.project.upsert({
    where: { id: "seed-project-1" },
    update: {},
    create: {
      id: "seed-project-1",
      name: "Project Management System",
      description: "A comprehensive project management system built with Next.js and Prisma",
      creatorId: user1.id,
      members: {
        create: [
          {
            userId: user1.id,
            role: "OWNER",
          },
          {
            userId: user2.id,
            role: "ADMIN",
          },
        ],
      },
    },
  });

  // Create tasks
  await prisma.task.createMany({
    data: [
      {
        id: "seed-task-1",
        title: "Setup Database Schema",
        description: "Create and migrate the initial database schema using Prisma",
        status: "DONE",
        priority: "HIGH",
        projectId: project1.id,
        assigneeId: user1.id,
        creatorId: user1.id,
        completedAt: new Date(),
      },
      {
        id: "seed-task-2",
        title: "Implement Authentication",
        description: "Set up NextAuth.js with Discord provider",
        status: "IN_PROGRESS",
        priority: "HIGH",
        projectId: project1.id,
        assigneeId: user2.id,
        creatorId: user1.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: "seed-task-3",
        title: "Create Project Dashboard",
        description: "Build a responsive dashboard for project overview",
        status: "TODO",
        priority: "MEDIUM",
        projectId: project1.id,
        assigneeId: user1.id,
        creatorId: user2.id,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
  console.log("📊 Created:");
  console.log("  - 2 users");
  console.log("  - 1 project");
  console.log("  - 2 project members");
  console.log("  - 3 tasks");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
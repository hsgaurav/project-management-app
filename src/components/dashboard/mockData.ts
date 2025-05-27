import type { Project, Task } from "./types";

export const mockProjects: Project[] = [
	{
		id: "1",
		name: "Website Redesign",
		description: "Complete redesign of company website",
		taskCount: 12,
		memberCount: 5,
	},
	{
		id: "2",
		name: "Mobile App",
		description: "iOS and Android mobile application",
		taskCount: 8,
		memberCount: 3,
	},
	{
		id: "3",
		name: "Marketing Campaign",
		description: "Q4 marketing campaign launch",
		taskCount: 6,
		memberCount: 4,
	},
];

export const mockTasks: Task[] = [
	{
		id: "1",
		title: "Design login page",
		description: "Create mockups and designs for the new login page",
		status: "TODO",
		priority: "HIGH",
		assignee: { name: "John Doe", email: "john@example.com" },
		dueDate: "2024-02-15",
		project: { name: "Website Redesign" },
	},
	{
		id: "2",
		title: "Implement user authentication",
		description: "Set up NextAuth.js with email/password authentication",
		status: "IN_PROGRESS",
		priority: "URGENT",
		assignee: { name: "Jane Smith", email: "jane@example.com" },
		dueDate: "2024-02-10",
		project: { name: "Website Redesign" },
	},
	{
		id: "3",
		title: "Create API endpoints",
		description: "Build REST API endpoints for user management",
		status: "IN_REVIEW",
		priority: "MEDIUM",
		assignee: { name: "Bob Wilson", email: "bob@example.com" },
		dueDate: "2024-02-20",
		project: { name: "Mobile App" },
	},
	{
		id: "4",
		title: "Deploy to production",
		description: "Deploy the application to production environment",
		status: "DONE",
		priority: "LOW",
		assignee: { name: "Alice Brown", email: "alice@example.com" },
		project: { name: "Website Redesign" },
	},
];

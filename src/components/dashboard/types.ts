export type Task = {
	id: string;
	title: string;
	description?: string;
	status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
	priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
	assignee?: { name: string; email: string };
	dueDate?: string;
	project: { name: string };
};

export type Project = {
	id: string;
	name: string;
	description?: string;
	taskCount: number;
	memberCount: number;
};

export type TasksByStatus = {
	TODO: Task[];
	IN_PROGRESS: Task[];
	IN_REVIEW: Task[];
	DONE: Task[];
};

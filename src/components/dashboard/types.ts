export type Task = {
	id: string;
	title: string;
	description: string | null;
	status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
	priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
	assignee?: { name: string | null; email: string | null; id: string } | null;
	dueDate?: Date | null;
	project: { name: string; id: string };
};

export type Project = {
	id: string;
	name: string;
	description: string | null;
	taskCount: number;
	memberCount: number;
	createdAt: Date;
};

export type TasksByStatus = {
	TODO: Task[];
	IN_PROGRESS: Task[];
	IN_REVIEW: Task[];
	DONE: Task[];
};

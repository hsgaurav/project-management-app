import type { inferRouterOutputs, inferRouterInputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type User = RouterOutputs["user"]["getProfile"];
export type Project = RouterOutputs["project"]["getAll"][number];
export type Task = RouterOutputs["task"]["getById"];
export type ProjectTasks = RouterOutputs["project"]["getTasks"];

export type CreateTaskInput = RouterInputs["task"]["create"];
export type UpdateTaskInput = RouterInputs["task"]["update"];
export type CreateProjectInput = RouterInputs["project"]["create"];

export const TaskStatus = {
	TODO: "TODO",
	IN_PROGRESS: "IN_PROGRESS",
	DONE: "DONE",
} as const;

export const TaskPriority = {
	LOW: "LOW",
	MEDIUM: "MEDIUM",
	HIGH: "HIGH",
} as const;

export const ProjectRole = {
	OWNER: "OWNER",
	ADMIN: "ADMIN",
	MEMBER: "MEMBER",
} as const;

export type TaskStatusType = keyof typeof TaskStatus;
export type TaskPriorityType = keyof typeof TaskPriority;
export type ProjectRoleType = keyof typeof ProjectRole;

export const taskStatusOptions = [
	{ value: TaskStatus.TODO, label: "To Do", color: "gray" },
	{ value: TaskStatus.IN_PROGRESS, label: "In Progress", color: "blue" },
	{ value: TaskStatus.DONE, label: "Done", color: "green" },
] as const;

export const taskPriorityOptions = [
	{ value: TaskPriority.LOW, label: "Low", color: "green" },
	{ value: TaskPriority.MEDIUM, label: "Medium", color: "yellow" },
	{ value: TaskPriority.HIGH, label: "High", color: "red" },
] as const;

export const getTaskStatusLabel = (status: string) => {
	return (
		taskStatusOptions.find((option) => option.value === status)?.label ?? status
	);
};

export const getTaskPriorityLabel = (priority: string) => {
	return (
		taskPriorityOptions.find((option) => option.value === priority)?.label ??
		priority
	);
};

export const getTaskStatusColor = (status: string) => {
	return (
		taskStatusOptions.find((option) => option.value === status)?.color ?? "gray"
	);
};

export const getTaskPriorityColor = (priority: string) => {
	return (
		taskPriorityOptions.find((option) => option.value === priority)?.color ??
		"gray"
	);
};

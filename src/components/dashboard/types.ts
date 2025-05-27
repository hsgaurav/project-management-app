import type { RouterOutputs } from "@/utils/api";

export type Task = RouterOutputs["task"]["getByProject"][number];

export type Project = RouterOutputs["project"]["getAll"][number];

export type TasksByStatus = {
	TODO: Task[];
	IN_PROGRESS: Task[];
	DONE: Task[];
};

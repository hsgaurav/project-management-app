import { Calendar, MoreHorizontal } from "lucide-react";
import type { Task } from "./types";
import { priorityColors, statusIcons, statusColors } from "./constants";

interface TaskCardProps {
	readonly task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
	const StatusIcon = statusIcons[task.status];

	return (
		<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
			<div className="mb-3 flex items-start justify-between">
				<h4 className="font-medium text-gray-900 line-clamp-2">{task.title}</h4>
				<button className="text-gray-400 hover:text-gray-600">
					<MoreHorizontal className="h-4 w-4" />
				</button>
			</div>

			{task.description && (
				<p className="mb-3 text-sm text-gray-600 line-clamp-2">
					{task.description}
				</p>
			)}

			<div className="mb-3 flex items-center gap-2">
				<span
					className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
						priorityColors[task.priority]
					}`}
				>
					{task.priority}
				</span>
				<span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
					{task.project.name}
				</span>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<StatusIcon className={`h-4 w-4 ${statusColors[task.status]}`} />
					<span className="text-xs text-gray-500">
						{task.status.replace("_", " ")}
					</span>
				</div>

				{task.assignee?.name && (
					<div className="flex items-center gap-1">
						<div className="flex h-6 w-6 items-center justify-center rounded-full bg-coral-500">
							<span className="text-xs font-medium text-white">
								{task.assignee.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</span>
						</div>
					</div>
				)}
			</div>

			{task.dueDate && (
				<div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
					<Calendar className="h-3 w-3" />
					{task.dueDate instanceof Date
						? task.dueDate.toLocaleDateString()
						: new Date(task.dueDate).toLocaleDateString()}
				</div>
			)}
		</div>
	);
}

import { Circle } from "lucide-react";
import { TaskCard } from "./TaskCard";
import type { TasksByStatus } from "./types";

interface KanbanBoardProps {
	tasksByStatus: TasksByStatus;
}

export function KanbanBoard({ tasksByStatus }: KanbanBoardProps) {
	return (
		<div className="grid grid-cols-4 gap-6">
			{Object.entries(tasksByStatus).map(([status, tasks]) => (
				<div
					key={status}
					className="rounded-xl border border-gray-200 bg-white"
				>
					<div className="border-b border-gray-200 p-4">
						<div className="flex items-center justify-between">
							<h3 className="font-medium text-gray-900">
								{status.replace("_", " ")}
							</h3>
							<span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
								{tasks.length}
							</span>
						</div>
					</div>

					<div className="max-h-96 space-y-3 overflow-y-auto p-4">
						{tasks.map((task) => (
							<TaskCard key={task.id} task={task} />
						))}

						{tasks.length === 0 && (
							<div className="py-8 text-center">
								<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
									<Circle className="h-6 w-6 text-gray-400" />
								</div>
								<p className="text-sm text-gray-500">
									No tasks in {status.toLowerCase().replace("_", " ")}
								</p>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

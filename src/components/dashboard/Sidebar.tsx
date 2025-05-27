import { BarChart3, Users, Clock, CheckCircle2 } from "lucide-react";
import type { Project, TasksByStatus } from "./types";

interface SidebarProps {
	readonly projects: Project[];
	readonly selectedProject: string | null;
	readonly tasksByStatus: TasksByStatus;
	readonly onProjectSelect: (projectId: string | null) => void;
}

export function Sidebar({
	projects,
	selectedProject,
	tasksByStatus,
	onProjectSelect,
}: SidebarProps) {
	const todoCount = tasksByStatus.TODO.length;
	const inProgressCount = tasksByStatus.IN_PROGRESS.length;
	const doneCount = tasksByStatus.DONE.length;
	const totalTasks = todoCount + inProgressCount + doneCount;

	return (
		<aside className="w-80 bg-white shadow-sm">
			<div className="border-b border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900">Projects</h2>
			</div>

			<div className="p-6">
				<div className="mb-6 space-y-2">
					<button
						onClick={() => onProjectSelect(null)}
						className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
							selectedProject === null
								? "bg-coral-50 text-coral-600"
								: "text-gray-600 hover:bg-gray-50"
						}`}
					>
						All Projects
					</button>
					{projects.map((project) => (
						<button
							key={project.id}
							onClick={() => onProjectSelect(project.id)}
							className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
								selectedProject === project.id
									? "bg-coral-50 text-coral-600"
									: "text-gray-600 hover:bg-gray-50"
							}`}
						>
							{project.name}
						</button>
					))}
				</div>

				<div className="space-y-4 rounded-lg bg-gray-50 p-4">
					<div className="flex items-center gap-3">
						<BarChart3 className="h-5 w-5 text-gray-500" />
						<span className="text-sm font-medium text-gray-700">
							Task Overview
						</span>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-gray-400" />
								<span className="text-sm text-gray-600">To Do</span>
							</div>
							<span className="text-sm font-medium text-gray-900">
								{todoCount}
							</span>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-blue-400" />
								<span className="text-sm text-gray-600">In Progress</span>
							</div>
							<span className="text-sm font-medium text-gray-900">
								{inProgressCount}
							</span>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="h-4 w-4 text-green-400" />
								<span className="text-sm text-gray-600">Done</span>
							</div>
							<span className="text-sm font-medium text-gray-900">
								{doneCount}
							</span>
						</div>

						<div className="border-t border-gray-200 pt-2">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-700">Total</span>
								<span className="text-sm font-semibold text-gray-900">
									{totalTasks}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}

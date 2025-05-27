import { Plus, Folder } from "lucide-react";
import type { Project, TasksByStatus } from "./types";

interface SidebarProps {
	projects: Project[];
	selectedProject: string | null;
	tasksByStatus: TasksByStatus;
	onProjectSelect: (projectId: string) => void;
}

export function Sidebar({
	projects,
	selectedProject,
	tasksByStatus,
	onProjectSelect,
}: SidebarProps) {
	const activeTasksCount =
		tasksByStatus.TODO.length + tasksByStatus.IN_PROGRESS.length;
	const inReviewCount = tasksByStatus.IN_REVIEW.length;
	const completedCount = tasksByStatus.DONE.length;

	return (
		<aside className="w-64 border-r border-gray-200 bg-white">
			<div className="p-6">
				<div className="mb-6">
					<h3 className="mb-3 text-sm font-medium text-gray-900">
						Quick Stats
					</h3>
					<div className="space-y-3">
						<div className="rounded-lg bg-coral-50 p-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Active Tasks</span>
								<span className="font-semibold text-coral-600">
									{activeTasksCount}
								</span>
							</div>
						</div>
						<div className="rounded-lg bg-blue-50 p-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">In Review</span>
								<span className="font-semibold text-blue-600">
									{inReviewCount}
								</span>
							</div>
						</div>
						<div className="rounded-lg bg-green-50 p-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Completed</span>
								<span className="font-semibold text-green-600">
									{completedCount}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div>
					<div className="mb-3 flex items-center justify-between">
						<h3 className="text-sm font-medium text-gray-900">Projects</h3>
						<button className="text-coral-500 hover:text-coral-600">
							<Plus className="h-4 w-4" />
						</button>
					</div>
					<div className="space-y-2">
						{projects.map((project) => (
							<button
								key={project.id}
								onClick={() => onProjectSelect(project.id)}
								className={`w-full rounded-lg p-3 text-left transition-colors ${
									selectedProject === project.id
										? "bg-coral-50 text-coral-900"
										: "hover:bg-gray-50"
								}`}
							>
								<div className="flex items-center gap-3">
									<Folder className="h-4 w-4 text-gray-400" />
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium text-gray-900">
											{project.name}
										</p>
										<div className="mt-1 flex items-center gap-3">
											<span className="text-xs text-gray-500">
												{project.taskCount} tasks
											</span>
											<span className="text-xs text-gray-500">
												{project.memberCount} members
											</span>
										</div>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</aside>
	);
}

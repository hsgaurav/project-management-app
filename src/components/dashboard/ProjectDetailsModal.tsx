import { X, Users, Calendar, CheckCircle2, User } from "lucide-react";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";

type Project = RouterOutputs["project"]["getAll"][number];
type ProjectMember = RouterOutputs["project"]["getMembers"][number];

interface ProjectDetailsModalProps {
	readonly project: Project | null;
	readonly isOpen: boolean;
	readonly onClose: () => void;
}

export function ProjectDetailsModal({
	project,
	isOpen,
	onClose,
}: ProjectDetailsModalProps) {
	const { data: members = [] } = api.project.getMembers.useQuery(
		{ projectId: project?.id ?? "" },
		{ enabled: !!project?.id && isOpen },
	);

	const { data: tasks = [] } = api.task.getByProject.useQuery(
		{ projectId: project?.id ?? "" },
		{ enabled: !!project?.id && isOpen },
	);

	if (!isOpen || !project) return null;

	const tasksByStatus = {
		TODO: tasks.filter((task) => task.status === "TODO"),
		IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
		DONE: tasks.filter((task) => task.status === "DONE"),
	};

	const formatDate = (date: Date | string) => {
		const d = typeof date === "string" ? new Date(date) : date;
		return d.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	const completionRate =
		tasks.length > 0
			? Math.round((tasksByStatus.DONE.length / tasks.length) * 100)
			: 0;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl">
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold text-gray-900">
							{project.name}
						</h2>
						<button
							onClick={onClose}
							className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
				</div>

				<div className="p-6 space-y-6">
					{project.description && (
						<div>
							<h3 className="text-sm font-medium text-gray-700 mb-2">
								Description
							</h3>
							<p className="text-gray-600">{project.description}</p>
						</div>
					)}

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-gray-50 rounded-lg p-4">
							<div className="flex items-center gap-2 mb-2">
								<CheckCircle2 className="h-4 w-4 text-green-500" />
								<span className="text-sm font-medium text-gray-700">
									Completion
								</span>
							</div>
							<div className="text-2xl font-bold text-gray-900">
								{completionRate}%
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2 mt-2">
								<div
									className="bg-green-500 h-2 rounded-full transition-all"
									style={{ width: `${completionRate}%` }}
								/>
							</div>
						</div>

						<div className="bg-gray-50 rounded-lg p-4">
							<div className="flex items-center gap-2 mb-2">
								<Users className="h-4 w-4 text-blue-500" />
								<span className="text-sm font-medium text-gray-700">
									Team Members
								</span>
							</div>
							<div className="text-2xl font-bold text-gray-900">
								{project.memberCount}
							</div>
						</div>

						<div className="bg-gray-50 rounded-lg p-4">
							<div className="flex items-center gap-2 mb-2">
								<Calendar className="h-4 w-4 text-purple-500" />
								<span className="text-sm font-medium text-gray-700">
									Created
								</span>
							</div>
							<div className="text-sm text-gray-900">
								{formatDate(project.createdAt)}
							</div>
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-700 mb-3">
							Task Overview
						</h3>
						<div className="grid grid-cols-3 gap-4">
							<div className="text-center">
								<div className="text-lg font-semibold text-gray-500">
									{tasksByStatus.TODO.length}
								</div>
								<div className="text-xs text-gray-500">To Do</div>
							</div>
							<div className="text-center">
								<div className="text-lg font-semibold text-amber-600">
									{tasksByStatus.IN_PROGRESS.length}
								</div>
								<div className="text-xs text-gray-500">In Progress</div>
							</div>
							<div className="text-center">
								<div className="text-lg font-semibold text-green-600">
									{tasksByStatus.DONE.length}
								</div>
								<div className="text-xs text-gray-500">Done</div>
							</div>
						</div>
					</div>

					{members.length > 0 && (
						<div>
							<h3 className="text-sm font-medium text-gray-700 mb-3">
								Team Members
							</h3>
							<div className="space-y-2">
								{members.map((member: ProjectMember) => (
									<div
										key={member.id}
										className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
									>
										<div className="flex items-center gap-3">
											<div className="h-8 w-8 bg-coral-100 rounded-full flex items-center justify-center">
												<User className="h-4 w-4 text-coral-600" />
											</div>
											<div>
												<div className="text-sm font-medium text-gray-900">
													{member.user.name || member.user.email}
												</div>
												<div className="text-xs text-gray-500">
													{member.user.email}
												</div>
											</div>
										</div>
										<span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
											{member.role}
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
					<button
						onClick={onClose}
						className="w-full rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

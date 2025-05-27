import { useState } from "react";
import { Users, Calendar, Plus, FolderOpen, CheckCircle2 } from "lucide-react";
import { api } from "@/utils/api";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { EditProjectModal } from "./EditProjectModal";
import { ManageMembersModal } from "./ManageMembersModal";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { ProjectActionsMenu } from "./ProjectActionsMenu";
import type { RouterOutputs } from "@/utils/api";

type Project = RouterOutputs["project"]["getAll"][number];

interface ProjectsViewProps {
	readonly searchTerm: string;
	readonly onCreateProject: () => void;
}

export function ProjectsView({
	searchTerm,
	onCreateProject,
}: ProjectsViewProps) {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [detailsModalOpen, setDetailsModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [membersModalOpen, setMembersModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const { data: projects = [], isLoading } = api.project.getAll.useQuery();

	const filteredProjects = projects.filter(
		(project) =>
			project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-coral-500 border-t-transparent"></div>
					<p className="mt-2 text-sm text-gray-600">Loading projects...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Projects</h1>
					<p className="text-gray-600">
						Manage and track your project portfolio
					</p>
				</div>
				<button
					onClick={onCreateProject}
					className="flex items-center gap-2 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600"
				>
					<Plus className="h-4 w-4" />
					New Project
				</button>
			</div>

			{filteredProjects.length === 0 ? (
				<div className="py-12 text-center">
					<FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-4 text-lg font-medium text-gray-900">
						{searchTerm ? "No projects found" : "No projects yet"}
					</h3>
					<p className="mt-2 text-sm text-gray-600">
						{searchTerm
							? "Try adjusting your search terms"
							: "Get started by creating your first project"}
					</p>
					{!searchTerm && (
						<button
							onClick={onCreateProject}
							className="mt-4 inline-flex items-center gap-2 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600"
						>
							<Plus className="h-4 w-4" />
							Create Project
						</button>
					)}
				</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredProjects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							onViewDetails={(project) => {
								setSelectedProject(project);
								setDetailsModalOpen(true);
							}}
							onEdit={(project) => {
								setSelectedProject(project);
								setEditModalOpen(true);
							}}
							onManageMembers={(project) => {
								setSelectedProject(project);
								setMembersModalOpen(true);
							}}
							onDelete={(project) => {
								setSelectedProject(project);
								setDeleteModalOpen(true);
							}}
						/>
					))}
				</div>
			)}

			<ProjectDetailsModal
				project={selectedProject}
				isOpen={detailsModalOpen}
				onClose={() => setDetailsModalOpen(false)}
			/>
			<EditProjectModal
				project={selectedProject}
				isOpen={editModalOpen}
				onClose={() => setEditModalOpen(false)}
				onSuccess={() => {}}
			/>
			<ManageMembersModal
				project={selectedProject}
				isOpen={membersModalOpen}
				onClose={() => setMembersModalOpen(false)}
			/>
			<DeleteProjectModal
				project={selectedProject}
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onSuccess={() => {}}
			/>
		</div>
	);
}

interface ProjectCardProps {
	readonly project: Project;
	readonly onViewDetails: (project: Project) => void;
	readonly onEdit: (project: Project) => void;
	readonly onManageMembers: (project: Project) => void;
	readonly onDelete: (project: Project) => void;
}

function ProjectCard({
	project,
	onViewDetails,
	onEdit,
	onManageMembers,
	onDelete,
}: ProjectCardProps) {
	const formatDate = (date: Date | string) => {
		const d = typeof date === "string" ? new Date(date) : date;
		return d.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-gray-900 group-hover:text-coral-600 transition-colors">
						{project.name}
					</h3>
					{project.description && (
						<p className="mt-1 text-sm text-gray-600 line-clamp-2">
							{project.description}
						</p>
					)}
				</div>
				<ProjectActionsMenu
					project={project}
					onViewDetails={() => onViewDetails(project)}
					onEdit={() => onEdit(project)}
					onManageMembers={() => onManageMembers(project)}
					onDelete={() => onDelete(project)}
				/>
			</div>

			<div className="mt-4 space-y-3">
				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center gap-2">
						<Users className="h-4 w-4 text-gray-400" />
						<span className="text-sm text-gray-600">
							{project.memberCount}{" "}
							{project.memberCount === 1 ? "member" : "members"}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<CheckCircle2 className="h-4 w-4 text-gray-400" />
						<span className="text-sm text-gray-600">
							{project.taskCount} {project.taskCount === 1 ? "task" : "tasks"}
						</span>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Calendar className="h-4 w-4 text-gray-400" />
					<span className="text-sm text-gray-600">
						Created {formatDate(project.createdAt)}
					</span>
				</div>
			</div>

			<div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
				<div className="flex items-center gap-2">
					<div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
						<div className="h-2 w-2 rounded-full bg-green-500"></div>
					</div>
					<span className="text-xs text-gray-600">Active</span>
				</div>
				<button className="text-sm font-medium text-coral-600 hover:text-coral-700">
					View Project →
				</button>
			</div>
		</div>
	);
}

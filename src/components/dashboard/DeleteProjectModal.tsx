import { useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";

type Project = RouterOutputs["project"]["getAll"][number];

interface DeleteProjectModalProps {
	readonly project: Project | null;
	readonly isOpen: boolean;
	readonly onClose: () => void;
	readonly onSuccess: () => void;
}

export function DeleteProjectModal({
	project,
	isOpen,
	onClose,
	onSuccess,
}: DeleteProjectModalProps) {
	const [confirmText, setConfirmText] = useState("");

	const utils = api.useUtils();

	const deleteProjectMutation = api.project.delete.useMutation({
		onSuccess: () => {
			utils.project.getAll.invalidate();
			onSuccess();
			onClose();
		},
		onError: (error) => {
			console.error("Failed to delete project:", error);
		},
	});

	const handleDelete = () => {
		if (!project?.id || confirmText !== project.name) return;
		deleteProjectMutation.mutate({ id: project.id });
	};

	const handleClose = () => {
		setConfirmText("");
		onClose();
	};

	const isDeleteEnabled =
		confirmText === project?.name && !deleteProjectMutation.isLoading;

	if (!isOpen || !project) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-full max-w-md rounded-xl bg-white shadow-xl">
				<div className="border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-red-100 p-2">
								<AlertTriangle className="h-5 w-5 text-red-600" />
							</div>
							<h2 className="text-xl font-semibold text-gray-900">
								Delete Project
							</h2>
						</div>
						<button
							onClick={handleClose}
							className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
				</div>

				<div className="p-6 space-y-4">
					<div className="text-sm text-gray-700">
						<p className="mb-3">
							This action cannot be undone. This will permanently delete the{" "}
							<span className="font-semibold">{project.name}</span> project and
							remove all associated tasks and data.
						</p>
						<p className="mb-4">
							Please type <span className="font-semibold">{project.name}</span>{" "}
							to confirm.
						</p>
					</div>

					<input
						type="text"
						value={confirmText}
						onChange={(e) => setConfirmText(e.target.value)}
						className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
						placeholder={project.name}
					/>

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={handleClose}
							className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
						>
							Cancel
						</button>
						<button
							onClick={handleDelete}
							disabled={!isDeleteEnabled}
							className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{deleteProjectMutation.isLoading ? (
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
							) : (
								<Trash2 className="h-4 w-4" />
							)}
							{deleteProjectMutation.isLoading
								? "Deleting..."
								: "Delete Project"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

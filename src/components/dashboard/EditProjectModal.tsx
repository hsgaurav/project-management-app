import { useState } from "react";
import { X, Save } from "lucide-react";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";

type Project = RouterOutputs["project"]["getAll"][number];

interface EditProjectModalProps {
	readonly project: Project | null;
	readonly isOpen: boolean;
	readonly onClose: () => void;
	readonly onSuccess: () => void;
}

export function EditProjectModal({
	project,
	isOpen,
	onClose,
	onSuccess,
}: EditProjectModalProps) {
	const [name, setName] = useState(project?.name || "");
	const [description, setDescription] = useState(project?.description || "");

	const utils = api.useUtils();

	const updateProjectMutation = api.project.update.useMutation({
		onSuccess: () => {
			utils.project.getAll.invalidate();
			onSuccess();
			onClose();
		},
		onError: (error) => {
			console.error("Failed to update project:", error);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!project?.id || !name.trim()) return;

		updateProjectMutation.mutate({
			id: project.id,
			name: name.trim(),
			description: description.trim() || undefined,
		});
	};

	const handleClose = () => {
		setName(project?.name || "");
		setDescription(project?.description || "");
		onClose();
	};

	if (!isOpen || !project) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-full max-w-md rounded-xl bg-white shadow-xl">
				<div className="border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold text-gray-900">
							Edit Project
						</h2>
						<button
							onClick={handleClose}
							className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Project Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-1 focus:ring-coral-500"
							placeholder="Enter project name"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Description
						</label>
						<textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-1 focus:ring-coral-500"
							placeholder="Enter project description (optional)"
						/>
					</div>

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={handleClose}
							className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={!name.trim() || updateProjectMutation.isLoading}
							className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{updateProjectMutation.isLoading ? (
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
							) : (
								<Save className="h-4 w-4" />
							)}
							{updateProjectMutation.isLoading ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

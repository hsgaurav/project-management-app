import { useState } from "react";
import { X } from "lucide-react";
import { api } from "@/utils/api";

interface CreateProjectModalProps {
	readonly isOpen: boolean;
	readonly onClose: () => void;
}

export function CreateProjectModal({
	isOpen,
	onClose,
}: CreateProjectModalProps) {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});

	const utils = api.useUtils();

	const createProjectMutation = api.project.create.useMutation({
		onSuccess: () => {
			void utils.project.getAll.invalidate();
			setFormData({
				name: "",
				description: "",
			});
			onClose();
		},
		onError: (error) => {
			console.error("Failed to create project:", error);
		},
	});

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.name.trim()) {
			return;
		}

		createProjectMutation.mutate({
			name: formData.name.trim(),
			description: formData.description.trim() || undefined,
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleClose = () => {
		if (!createProjectMutation.isLoading) {
			setFormData({ name: "", description: "" });
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-900">
						Create New Project
					</h2>
					<button
						onClick={handleClose}
						disabled={createProjectMutation.isLoading}
						className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Project Name <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							placeholder="Enter project name..."
							required
							disabled={createProjectMutation.isLoading}
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows={4}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							placeholder="Enter project description..."
							disabled={createProjectMutation.isLoading}
						/>
					</div>

					{createProjectMutation.error && (
						<div className="rounded-lg bg-red-50 p-3">
							<p className="text-sm text-red-600">
								{createProjectMutation.error.message}
							</p>
						</div>
					)}

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={handleClose}
							disabled={createProjectMutation.isLoading}
							className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={
								!formData.name.trim() || createProjectMutation.isLoading
							}
							className="flex-1 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{createProjectMutation.isLoading
								? "Creating..."
								: "Create Project"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

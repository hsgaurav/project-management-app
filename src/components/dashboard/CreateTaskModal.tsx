import { useState } from "react";
import { api } from "@/utils/api";

interface CreateTaskModalProps {
	readonly isOpen: boolean;
	readonly onClose: () => void;
}

export function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		priority: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH",
		dueDate: "",
		projectId: "",
	});

	const { data: projects = [] } = api.project.getAll.useQuery();
	const utils = api.useUtils();

	const createTaskMutation = api.task.create.useMutation({
		onSuccess: () => {
			void utils.task.getMyTasks.invalidate();
			void utils.task.getByProject.invalidate();
			setFormData({
				title: "",
				description: "",
				priority: "MEDIUM",
				dueDate: "",
				projectId: "",
			});
			onClose();
		},
		onError: (error) => {
			console.error("Failed to create task:", error);
		},
	});

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.title.trim() || !formData.projectId) {
			return;
		}

		createTaskMutation.mutate({
			title: formData.title.trim(),
			description: formData.description.trim() || undefined,
			priority: formData.priority,
			projectId: formData.projectId,
			dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
		});
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
				<h2 className="mb-4 text-lg font-semibold text-gray-900">
					Create New Task
				</h2>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Project
						</label>
						<select
							name="projectId"
							value={formData.projectId}
							onChange={handleChange}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							required
						>
							<option value="">Select a project</option>
							{projects.map((project) => (
								<option key={project.id} value={project.id}>
									{project.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Task Title
						</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							placeholder="Enter task title..."
							required
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
							rows={3}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							placeholder="Enter task description..."
						/>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">
								Priority
							</label>
							<select
								name="priority"
								value={formData.priority}
								onChange={handleChange}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							>
								<option value="LOW">Low</option>
								<option value="MEDIUM">Medium</option>
								<option value="HIGH">High</option>
							</select>
						</div>
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">
								Due Date
							</label>
							<input
								type="date"
								name="dueDate"
								value={formData.dueDate}
								onChange={handleChange}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							/>
						</div>
					</div>
					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
							disabled={createTaskMutation.isLoading}
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={
								!formData.title.trim() ||
								!formData.projectId ||
								createTaskMutation.isLoading
							}
							className="flex-1 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{createTaskMutation.isLoading ? "Creating..." : "Create Task"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

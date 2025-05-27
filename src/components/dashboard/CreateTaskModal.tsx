interface CreateTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission here
		onClose();
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
							Task Title
						</label>
						<input
							type="text"
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							placeholder="Enter task title..."
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
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
							<select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500">
								<option>LOW</option>
								<option>MEDIUM</option>
								<option>HIGH</option>
								<option>URGENT</option>
							</select>
						</div>
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">
								Due Date
							</label>
							<input
								type="date"
								className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							/>
						</div>
					</div>
					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600"
						>
							Create Task
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

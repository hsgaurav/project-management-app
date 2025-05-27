import { useState } from "react";
import { MoreVertical, Eye, Edit, Users, Trash2 } from "lucide-react";
import type { RouterOutputs } from "@/utils/api";

type Project = RouterOutputs["project"]["getAll"][number];

interface ProjectActionsMenuProps {
	readonly project: Project;
	readonly onViewDetails: () => void;
	readonly onEdit: () => void;
	readonly onManageMembers: () => void;
	readonly onDelete: () => void;
}

export function ProjectActionsMenu({
	onViewDetails,
	onEdit,
	onManageMembers,
	onDelete,
}: ProjectActionsMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleAction = (action: () => void) => {
		action();
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
			>
				<MoreVertical className="h-5 w-5" />
			</button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute right-0 z-20 mt-1 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
						<button
							onClick={() => handleAction(onViewDetails)}
							className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							<Eye className="h-4 w-4" />
							View Details
						</button>
						<button
							onClick={() => handleAction(onEdit)}
							className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							<Edit className="h-4 w-4" />
							Edit Project
						</button>
						<button
							onClick={() => handleAction(onManageMembers)}
							className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							<Users className="h-4 w-4" />
							Manage Members
						</button>
						<hr className="my-1" />
						<button
							onClick={() => handleAction(onDelete)}
							className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
						>
							<Trash2 className="h-4 w-4" />
							Delete Project
						</button>
					</div>
				</>
			)}
		</div>
	);
}

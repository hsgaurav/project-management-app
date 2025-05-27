import { useState } from "react";
import { X, UserPlus, User, Trash2 } from "lucide-react";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";

type Project = RouterOutputs["project"]["getAll"][number];
type ProjectMember = RouterOutputs["project"]["getMembers"][number];

interface ManageMembersModalProps {
	readonly project: Project | null;
	readonly isOpen: boolean;
	readonly onClose: () => void;
}

export function ManageMembersModal({
	project,
	isOpen,
	onClose,
}: ManageMembersModalProps) {
	const [email, setEmail] = useState("");
	const [role, setRole] = useState<"MEMBER" | "ADMIN">("MEMBER");

	const utils = api.useUtils();

	const { data: members = [] } = api.project.getMembers.useQuery(
		{ projectId: project?.id ?? "" },
		{ enabled: !!project?.id && isOpen },
	);

	const addMemberMutation = api.project.addMember.useMutation({
		onSuccess: () => {
			utils.project.getMembers.invalidate({ projectId: project?.id });
			utils.project.getAll.invalidate();
			setEmail("");
		},
		onError: (error) => {
			console.error("Failed to add member:", error);
		},
	});

	const removeMemberMutation = api.project.removeMember.useMutation({
		onSuccess: () => {
			utils.project.getMembers.invalidate({ projectId: project?.id });
			utils.project.getAll.invalidate();
		},
		onError: (error) => {
			console.error("Failed to remove member:", error);
		},
	});

	const handleAddMember = (e: React.FormEvent) => {
		e.preventDefault();
		if (!project?.id || !email.trim()) return;

		addMemberMutation.mutate({
			projectId: project.id,
			email: email.trim(),
			role,
		});
	};

	const handleRemoveMember = (memberId: string) => {
		if (!project?.id) return;
		removeMemberMutation.mutate({
			projectId: project.id,
			memberId,
		});
	};

	const canRemoveMember = (member: ProjectMember) => {
		return member.role !== "OWNER";
	};

	if (!isOpen || !project) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl">
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold text-gray-900">
							Manage Members - {project.name}
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
					<form onSubmit={handleAddMember} className="space-y-4">
						<h3 className="text-lg font-medium text-gray-900">
							Add New Member
						</h3>

						<div className="grid grid-cols-3 gap-3">
							<div className="col-span-2">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-1 focus:ring-coral-500"
									placeholder="Enter email address"
									required
								/>
							</div>
							<select
								value={role}
								onChange={(e) => setRole(e.target.value as "MEMBER" | "ADMIN")}
								className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-coral-500 focus:outline-none focus:ring-1 focus:ring-coral-500"
							>
								<option value="MEMBER">Member</option>
								<option value="ADMIN">Admin</option>
							</select>
						</div>

						<button
							type="submit"
							disabled={!email.trim() || addMemberMutation.isLoading}
							className="flex items-center gap-2 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{addMemberMutation.isLoading ? (
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
							) : (
								<UserPlus className="h-4 w-4" />
							)}
							{addMemberMutation.isLoading ? "Adding..." : "Add Member"}
						</button>
					</form>

					<div>
						<h3 className="text-lg font-medium text-gray-900 mb-4">
							Current Members
						</h3>
						<div className="space-y-3">
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
									<div className="flex items-center gap-2">
										<span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
											{member.role}
										</span>
										{canRemoveMember(member) && (
											<button
												onClick={() => handleRemoveMember(member.id)}
												disabled={removeMemberMutation.isLoading}
												className="rounded-lg p-1 text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
												title="Remove member"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
					<button
						onClick={onClose}
						className="w-full rounded-lg bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

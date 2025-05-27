import { signOut } from "next-auth/react";
import {
	BarChart3,
	LogOut,
	User,
	Plus,
	Search,
	ChevronDown,
} from "lucide-react";

interface NavigationProps {
	userName?: string | null;
	userEmail?: string | null;
	searchTerm: string;
	onSearchChange: (value: string) => void;
	onCreateTask: () => void;
}

export function Navigation({
	userName,
	userEmail,
	searchTerm,
	onSearchChange,
	onCreateTask,
}: NavigationProps) {
	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/login" });
	};

	return (
		<nav className="border-b border-gray-200 bg-white shadow-sm">
			<div className="min-w-[-webkit-fill-available] max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 justify-between">
					<div className="flex items-center gap-8">
						<div className="flex items-center">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-500">
								<BarChart3 className="h-5 w-5 text-white" />
							</div>
							<span className="ml-2 text-xl font-bold text-gray-900">
								ProjectHub
							</span>
						</div>

						<div className="hidden md:flex items-center gap-6">
							<button className="text-sm font-medium text-gray-700 hover:text-coral-600">
								Projects
							</button>
							<button className="text-sm font-medium text-gray-700 hover:text-coral-600">
								Tasks
							</button>
							<button className="text-sm font-medium text-gray-700 hover:text-coral-600">
								Teams
							</button>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search tasks..."
								value={searchTerm}
								onChange={(e) => onSearchChange(e.target.value)}
								className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
							/>
						</div>

						<button
							onClick={onCreateTask}
							className="flex items-center gap-2 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600"
						>
							<Plus className="h-4 w-4" />
							Create Task
						</button>

						<div className="flex items-center gap-2">
							<User className="h-5 w-5 text-gray-400" />
							<span className="text-sm font-medium text-gray-700">
								{userName || userEmail}
							</span>
							<button className="text-gray-400 hover:text-gray-600">
								<ChevronDown className="h-4 w-4" />
							</button>
						</div>

						<button
							onClick={handleSignOut}
							className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
						>
							<LogOut className="h-4 w-4" />
							Sign out
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

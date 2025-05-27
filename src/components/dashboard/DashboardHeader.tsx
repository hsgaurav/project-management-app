import { Filter, Settings } from "lucide-react";

interface DashboardHeaderProps {
	userName?: string | null;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
	return (
		<div className="mb-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Welcome back, {userName?.split(" ")[0] || "User"}!
					</h1>
					<p className="text-gray-600">
						Here&apos;s what&apos;s happening with your projects today.
					</p>
				</div>

				<div className="flex items-center gap-3">
					<button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
						<Filter className="h-4 w-4" />
						Filter
					</button>
					<button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
						<Settings className="h-4 w-4" />
						View Options
					</button>
				</div>
			</div>
		</div>
	);
}

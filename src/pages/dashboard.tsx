import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import {
	Navigation,
	Sidebar,
	KanbanBoard,
	CreateTaskModal,
	DashboardHeader,
	type TasksByStatus,
} from "@/components/dashboard";
import { api } from "@/utils/api";

export default function Dashboard() {
	const { data: session } = useSession();
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [showCreateTask, setShowCreateTask] = useState(false);

	const { data: projects = [] } = api.project.getAll.useQuery();

	const { data: allTasks = [] } = api.task.getByProject.useQuery(
		{ projectId: selectedProject! },
		{ enabled: !!selectedProject },
	);

	const { data: myTasks = [] } = api.task.getMyTasks.useQuery(
		{ projectId: selectedProject ?? undefined },
		{ enabled: !selectedProject },
	);

	const tasksToShow = selectedProject ? allTasks : myTasks;

	const filteredTasks = tasksToShow.filter(
		(task) =>
			task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			task.description?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const tasksByStatus: TasksByStatus = {
		TODO: filteredTasks.filter((task) => task.status === "TODO"),
		IN_PROGRESS: filteredTasks.filter((task) => task.status === "IN_PROGRESS"),
		DONE: filteredTasks.filter((task) => task.status === "DONE"),
	};

	return (
		<>
			<Head>
				<title>Dashboard - ProjectHub</title>
				<meta name="description" content="Your ProjectHub dashboard" />
			</Head>

			<div className="min-h-screen bg-gray-50">
				<Navigation
					userName={session?.user?.name}
					userEmail={session?.user?.email}
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
					onCreateTask={() => setShowCreateTask(true)}
				/>

				<div className="flex">
					<Sidebar
						projects={projects}
						selectedProject={selectedProject}
						tasksByStatus={tasksByStatus}
						onProjectSelect={setSelectedProject}
					/>

					<main className="flex-1 p-6">
						<DashboardHeader userName={session?.user?.name} />
						<KanbanBoard tasksByStatus={tasksByStatus} />
					</main>
				</div>

				<CreateTaskModal
					isOpen={showCreateTask}
					onClose={() => setShowCreateTask(false)}
				/>
			</div>
		</>
	);
}

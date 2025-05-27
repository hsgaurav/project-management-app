import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { authOptions } from "@/server/auth";
import {
	Navigation,
	Sidebar,
	KanbanBoard,
	CreateTaskModal,
	DashboardHeader,
	mockProjects,
	mockTasks,
	type TasksByStatus,
} from "@/components/dashboard";

export default function Dashboard() {
	const { data: session } = useSession();
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [showCreateTask, setShowCreateTask] = useState(false);

	const filteredTasks = mockTasks.filter(
		(task) =>
			task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			task.description?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const tasksByStatus: TasksByStatus = {
		TODO: filteredTasks.filter((task) => task.status === "TODO"),
		IN_PROGRESS: filteredTasks.filter((task) => task.status === "IN_PROGRESS"),
		IN_REVIEW: filteredTasks.filter((task) => task.status === "IN_REVIEW"),
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
						projects={mockProjects}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

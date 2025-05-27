import { Circle, PlayCircle, EyeIcon, CheckCircle } from "lucide-react";

export const priorityColors = {
	LOW: "bg-blue-100 text-blue-800",
	MEDIUM: "bg-yellow-100 text-yellow-800",
	HIGH: "bg-orange-100 text-orange-800",
	URGENT: "bg-red-100 text-red-800",
};

export const statusIcons = {
	TODO: Circle,
	IN_PROGRESS: PlayCircle,
	IN_REVIEW: EyeIcon,
	DONE: CheckCircle,
};

export const statusColors = {
	TODO: "text-gray-500",
	IN_PROGRESS: "text-blue-500",
	IN_REVIEW: "text-yellow-500",
	DONE: "text-green-500",
};

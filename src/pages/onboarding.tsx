import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import {
	Check,
	ArrowRight,
	Building,
	UserPlus,
	FolderPlus,
} from "lucide-react";
import { api } from "@/utils/api";

type OnboardingStep =
	| "welcome"
	| "join-or-create"
	| "project-setup"
	| "completed";

export default function Onboarding() {
	const { data: session } = useSession();
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
	const [selectedOption, setSelectedOption] = useState<
		"join" | "create" | null
	>(null);
	const [formData, setFormData] = useState({
		projectName: "",
		projectDescription: "",
		inviteCode: "",
	});

	const completeOnboardingMutation = api.user.completeOnboarding.useMutation({
		onSuccess: () => {
			void router.push("/dashboard");
		},
	});

	const createProjectMutation = api.project.create.useMutation({
		onSuccess: () => {
			completeOnboardingMutation.mutate();
		},
	});

	const joinProjectMutation = api.project.joinByCode.useMutation({
		onSuccess: () => {
			completeOnboardingMutation.mutate();
		},
	});

	const handleNext = () => {
		if (currentStep === "welcome") {
			setCurrentStep("join-or-create");
		} else if (currentStep === "join-or-create" && selectedOption) {
			setCurrentStep("project-setup");
		}
	};

	const handleComplete = () => {
		if (selectedOption === "create") {
			createProjectMutation.mutate({
				name: formData.projectName,
				description: formData.projectDescription,
			});
		} else if (selectedOption === "join") {
			joinProjectMutation.mutate({
				inviteCode: formData.inviteCode,
			});
		}
	};

	const handleSkip = () => {
		completeOnboardingMutation.mutate();
	};

	return (
		<>
			<Head>
				<title>Welcome to ProjectHub</title>
				<meta name="description" content="Get started with ProjectHub" />
			</Head>

			<div className="min-h-screen bg-gradient-to-br from-coral-50 to-orange-50 flex items-center justify-center p-4">
				<div className="w-full max-w-2xl">
					<div className="bg-white rounded-2xl shadow-xl p-8">
						{/* Progress Bar */}
						<div className="mb-8">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-gray-600">
									{currentStep === "welcome" && "Step 1 of 3"}
									{currentStep === "join-or-create" && "Step 2 of 3"}
									{currentStep === "project-setup" && "Step 3 of 3"}
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-coral-500 h-2 rounded-full transition-all duration-300"
									style={{
										width:
											currentStep === "welcome"
												? "33%"
												: currentStep === "join-or-create"
													? "66%"
													: "100%",
									}}
								/>
							</div>
						</div>

						{/* Welcome Step */}
						{currentStep === "welcome" && (
							<div className="text-center">
								<div className="mx-auto w-16 h-16 bg-coral-500 rounded-full flex items-center justify-center mb-6">
									<Building className="w-8 h-8 text-white" />
								</div>
								<h1 className="text-3xl font-bold text-gray-900 mb-4">
									Welcome to ProjectHub!
								</h1>
								<p className="text-lg text-gray-600 mb-8">
									Hello {session?.user?.name}! Let&apos;s get you set up with
									your first project.
								</p>
								<button
									onClick={handleNext}
									className="inline-flex items-center gap-2 bg-coral-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-coral-600 transition-colors"
								>
									Get Started
									<ArrowRight className="w-4 h-4" />
								</button>
							</div>
						)}

						{/* Join or Create Step */}
						{currentStep === "join-or-create" && (
							<div>
								<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
									How would you like to start?
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
									<button
										onClick={() => setSelectedOption("join")}
										className={`p-6 rounded-xl border-2 transition-all ${
											selectedOption === "join"
												? "border-coral-500 bg-coral-50"
												: "border-gray-200 hover:border-gray-300"
										}`}
									>
										<UserPlus className="w-8 h-8 text-coral-500 mb-4" />
										<h3 className="text-lg font-semibold text-gray-900 mb-2">
											Join a Team
										</h3>
										<p className="text-gray-600">
											Have an invite code? Join an existing project team.
										</p>
									</button>

									<button
										onClick={() => setSelectedOption("create")}
										className={`p-6 rounded-xl border-2 transition-all ${
											selectedOption === "create"
												? "border-coral-500 bg-coral-50"
												: "border-gray-200 hover:border-gray-300"
										}`}
									>
										<FolderPlus className="w-8 h-8 text-coral-500 mb-4" />
										<h3 className="text-lg font-semibold text-gray-900 mb-2">
											Create a Project
										</h3>
										<p className="text-gray-600">
											Start fresh with your own project and invite team members.
										</p>
									</button>
								</div>

								<div className="flex justify-between">
									<button
										onClick={handleSkip}
										className="text-gray-500 hover:text-gray-700 transition-colors"
									>
										Skip for now
									</button>
									<button
										onClick={handleNext}
										disabled={!selectedOption}
										className="inline-flex items-center gap-2 bg-coral-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-coral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Continue
										<ArrowRight className="w-4 h-4" />
									</button>
								</div>
							</div>
						)}

						{/* Project Setup Step */}
						{currentStep === "project-setup" && (
							<div>
								{selectedOption === "create" && (
									<div>
										<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
											Create Your Project
										</h2>
										<div className="space-y-6">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Project Name
												</label>
												<input
													type="text"
													value={formData.projectName}
													onChange={(e) =>
														setFormData((prev) => ({
															...prev,
															projectName: e.target.value,
														}))
													}
													className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
													placeholder="Enter your project name"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Description (Optional)
												</label>
												<textarea
													value={formData.projectDescription}
													onChange={(e) =>
														setFormData((prev) => ({
															...prev,
															projectDescription: e.target.value,
														}))
													}
													rows={3}
													className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
													placeholder="What's this project about?"
												/>
											</div>
										</div>
									</div>
								)}

								{selectedOption === "join" && (
									<div>
										<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
											Join a Project
										</h2>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Invite Code
											</label>
											<input
												type="text"
												value={formData.inviteCode}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														inviteCode: e.target.value,
													}))
												}
												className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
												placeholder="Enter the invite code"
											/>
											<p className="text-sm text-gray-500 mt-2">
												Ask your team lead for the project invite code.
											</p>
										</div>
									</div>
								)}

								<div className="flex justify-between mt-8">
									<button
										onClick={() => setCurrentStep("join-or-create")}
										className="text-gray-500 hover:text-gray-700 transition-colors"
									>
										Back
									</button>
									<button
										onClick={handleComplete}
										disabled={
											(selectedOption === "create" && !formData.projectName) ||
											(selectedOption === "join" && !formData.inviteCode) ||
											createProjectMutation.isLoading ||
											joinProjectMutation.isLoading
										}
										className="inline-flex items-center gap-2 bg-coral-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-coral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{createProjectMutation.isLoading ||
										joinProjectMutation.isLoading ? (
											"Loading..."
										) : (
											<>
												Complete Setup
												<Check className="w-4 h-4" />
											</>
										)}
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

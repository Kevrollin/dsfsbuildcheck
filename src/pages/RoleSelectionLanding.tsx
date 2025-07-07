import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, HeartHandshake, ShieldCheck } from "lucide-react";

const roles = [
	{
		key: "student",
		label: "Student",
		icon: <User className="h-8 w-8" />,
		color: "from-indigo-500 to-blue-500",
		next: "/student-signup",
	},
	{
		key: "donor",
		label: "Donor",
		icon: <HeartHandshake className="h-8 w-8" />,
		color: "from-blue-500 to-cyan-500",
		next: "/donor-signup",
	},
	{
		key: "admin",
		label: "Admin",
		icon: <ShieldCheck className="h-8 w-8" />,
		color: "from-gray-400 to-gray-500",
		next: "#",
		disabled: true,
	},
];

const cardVariants = {
	initial: {
		scale: 1,
		rotateX: 0,
		rotateY: 0,
		boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
	},
	hover: {
		scale: 1.04,
		boxShadow: "0 8px 32px 0 rgba(99,102,241,0.18)",
		zIndex: 2,
	},
	tap: { scale: 0.97 },
	selected: {
		scale: 1.08,
		boxShadow: "0 12px 40px 0 rgba(99,102,241,0.22)",
		zIndex: 3,
	},
};

const RoleSelectionLanding: React.FC = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState<string | null>(null);

	// 3D tilt effect handler
	const handleMouseMove = (e: React.MouseEvent, idx: number) => {
		const card = e.currentTarget as HTMLDivElement;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const rotateX = ((y / rect.height) - 0.5) * 12;
		const rotateY = ((x / rect.width) - 0.5) * -12;
		card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${selected === roles[idx].key ? 1.08 : 1.04})`;
	};
	const handleMouseLeave = (e: React.MouseEvent) => {
		const card = e.currentTarget as HTMLDivElement;
		card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
	};

	return (
		<div className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-400 dark:from-gray-950 dark:via-indigo-950 dark:to-blue-900">
			{/* Animated floating particles */}
			<motion.div
				className="absolute inset-0 pointer-events-none z-0"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				{Array.from({ length: 18 }).map((_, i) => (
					<motion.div
						key={i}
						className="absolute rounded-full bg-gradient-to-br from-indigo-400/30 to-blue-400/20 blur-2xl"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							width: `${Math.random() * 80 + 40}px`,
							height: `${Math.random() * 80 + 40}px`,
							opacity: Math.random() * 0.3 + 0.1,
						}}
						animate={{
							y: [0, Math.random() * 40 - 20, 0],
							x: [0, Math.random() * 40 - 20, 0],
						}}
						transition={{
							duration: 8 + Math.random() * 4,
							repeat: Infinity,
							repeatType: "mirror",
						}}
					/>
				))}
			</motion.div>
			<div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center px-4 py-12">
				<motion.h1
					className="text-3xl md:text-4xl font-extrabold text-indigo-700 dark:text-white mb-4 text-center drop-shadow-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					Welcome to DSFS
				</motion.h1>
				<motion.p
					className="mb-10 text-gray-700 dark:text-gray-200 text-center text-lg max-w-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
				>
					Select your role to continue
				</motion.p>
				<div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
					{roles.map((role, idx) => (
						<motion.div
							key={role.key}
							className={`group w-full md:w-56 rounded-2xl p-6 cursor-pointer select-none bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-xl flex flex-col items-center transition-all duration-300 ${
								role.disabled
									? "opacity-60 cursor-not-allowed"
									: "hover:shadow-2xl"
							} ${selected === role.key ? "ring-4 ring-indigo-400 dark:ring-blue-500" : ""}`}
							variants={cardVariants}
							initial="initial"
							whileHover={!role.disabled ? "hover" : undefined}
							whileTap={!role.disabled ? "tap" : undefined}
							animate={selected === role.key ? "selected" : "initial"}
							onMouseMove={(e) => !role.disabled && handleMouseMove(e, idx)}
							onMouseLeave={handleMouseLeave}
							onClick={() => !role.disabled && setSelected(role.key)}
							style={{
								background:
									selected === role.key
										? `linear-gradient(135deg, var(--tw-gradient-stops)), #fff`
										: undefined,
								boxShadow:
									selected === role.key
										? "0 12px 40px 0 rgba(99,102,241,0.22)"
										: undefined,
							}}
						>
							<div className={`mb-3 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${role.color} shadow-lg group-hover:scale-110 transition-transform duration-300 ${selected === role.key ? "scale-110" : ""}`}>
								{role.icon}
							</div>
							<span className="text-xl font-bold text-gray-800 dark:text-white mb-1 tracking-tight">
								{role.label}
							</span>
							<span className="text-xs text-gray-500 dark:text-gray-300">
								{role.disabled ? "Coming soon" : `Sign up as a ${role.label}`}
							</span>
						</motion.div>
					))}
				</div>
				<AnimatePresence>
					{selected && (
						<motion.button
							key="continue"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.4 }}
							className="mt-10 px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold text-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-200"
							whileTap={{ scale: 0.96 }}
							onClick={() => {
								const next = roles.find((r) => r.key === selected)?.next;
								if (next && next !== "#") navigate(next);
							}}
						>
							Continue
						</motion.button>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default RoleSelectionLanding;

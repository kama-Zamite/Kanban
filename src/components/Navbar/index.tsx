import {
	ChevronDown,
	NotificationsOutline,
	PersonCircle,
	SearchOutline,
	SettingsOutline,
	ShareSocialOutline,
} from "react-ionicons";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const [search, setSearch] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [boardName, setBoardName] = useState("Board Name");
	const navigate = useNavigate();

	// Handlers
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Busca personalizada
		navigate(`/busca?query=${encodeURIComponent(search)}`);
	};
	const handleProfileClick = () => {
		setDropdownOpen((prev) => !prev);
	};
	const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBoardName(e.target.value);
	};
	const handleSettings = () => {
		navigate("/configuracoes");
	};
	const handleNotifications = () => {
		navigate("/notificacoes");
	};
	const handleShare = () => {
		navigate("/compartilhar");
	};
	const handleProfile = () => {
		navigate("/meu-perfil");
		setDropdownOpen(false);
	};
	const handleLogout = () => {
		// Exemplo: limpar token e redirecionar
		localStorage.removeItem("token");
		navigate("/sair");
		setDropdownOpen(false);
	};

	return (
		<div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
			<div className="flex items-center gap-3 relative">
				<div className="cursor-pointer" onClick={handleProfileClick}>
					<PersonCircle color="#fb923c" width={"28px"} height={"28px"} />
				</div>
				<input
					value={boardName}
					onChange={handleBoardNameChange}
					className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap bg-transparent border-none outline-none"
					style={{ width: "120px" }}
				/>
				<ChevronDown
					color="#fb923c"
					width={"16px"}
					height={"16px"}
					style={{ cursor: 'pointer' }}
					onClick={handleProfileClick}
				/>
				{dropdownOpen && (
				  <div className="absolute top-10 left-0 bg-white border rounded shadow-md p-2 z-10">
				    <div className="py-1 px-2 cursor-pointer hover:bg-gray-100" onClick={handleProfile}>Perfil</div>
				    <div className="py-1 px-2 cursor-pointer hover:bg-gray-100" onClick={handleLogout}>Sair</div>
				  </div>
				)}
			</div>
			<form
				className="md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-3 py-[10px] flex items-center gap-2"
				onSubmit={handleSearchSubmit}
			>
				<SearchOutline color={"#999"} />
				<input
					type="text"
					placeholder="Search"
					className="w-full bg-gray-100 outline-none text-[15px]"
					value={search}
					onChange={handleSearchChange}
				/>
			</form>
			<div className="md:flex hidden items-center gap-4">
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer" onClick={handleShare}>
					<ShareSocialOutline color={"#444"} />
				</div>
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer" onClick={handleSettings}>
					<SettingsOutline color={"#444"} />
				</div>
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer" onClick={handleNotifications}>
					<NotificationsOutline color={"#444"} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;

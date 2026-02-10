/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Board } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import TaskModal from "../../components/Modals/TaskModal";

const Home = () => {
	const [columns, setColumns] = useState<Columns>(() => {
		const saved = localStorage.getItem('board');
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch (e) {
				console.error('Failed to parse board from localStorage', e);
			}
		}
		return Board;
	});

	// Handler to add a new column
	const handleAddColumn = (columnId: string, columnName: string) => {
		if (!columnId || !columnName) return;
		const newBoard = { ...columns };
		if (newBoard[columnId]) return; // Prevent overwrite
		newBoard[columnId] = { name: columnName, items: [] };
		setColumns(newBoard);
		localStorage.setItem('board', JSON.stringify(newBoard));
	};

	// Handler to remove a column
	const handleRemoveColumn = (columnId: string) => {
		if (!columnId) return;
		const newBoard = { ...columns };
		if (!newBoard[columnId]) return;
		delete newBoard[columnId];
		setColumns(newBoard);
		localStorage.setItem('board', JSON.stringify(newBoard));
	};
		// Board agora é apenas local, não busca mais do backend
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedColumn, setSelectedColumn] = useState("");
	const [detailOpen, setDetailOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<any>(null);

	const openModal = (columnId: any) => {
		setSelectedColumn(columnId);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const openDetailModal = (task: any, columnId?: string) => {
		setSelectedTask(task);
		if (columnId) setSelectedColumn(columnId);
		setDetailOpen(true);
	};

	const handleEditTask = (updated: any) => {
		console.debug("handleEditTask called", { updated, selectedColumn });

		const newBoard = { ...columns };
		let found = false;
		for (const [colId, col] of Object.entries(newBoard)) {
			newBoard[colId].items = col.items.map((t: any) => {
				if (t.id === updated.id) {
					found = true;
					return updated;
				}
				return t;
			});
		}
		if (found) {
			setColumns(newBoard);
			localStorage.setItem('board', JSON.stringify(newBoard));
		} else {
			console.warn('Edited task id not found in any column', updated.id);
		}
	};

	const handleDeleteTask = (id: string) => {
		console.debug("handleDeleteTask called", { id, selectedColumn });

		const newBoard = { ...columns };
		let removed = false;
		for (const [colId, col] of Object.entries(newBoard)) {
			const before = col.items.length;
			newBoard[colId].items = col.items.filter((t: any) => t.id !== id);
			if (newBoard[colId].items.length < before) removed = true;
		}
		if (removed) {
			setColumns(newBoard);
			localStorage.setItem('board', JSON.stringify(newBoard));
		} else {
			console.warn('Deleted task id not found in any column', id);
		}
	};

	const closeDetailModal = () => {
		setDetailOpen(false);
		setSelectedTask(null);
	};

	const handleAddTask = (taskData: any) => {
		const newBoard = { ...columns };
		newBoard[selectedColumn].items.push(taskData);
		setColumns(newBoard);
		localStorage.setItem('board', JSON.stringify(newBoard));
	};

	return (
		<>
			<DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
				<div className="w-full flex items-start px-5 pb-8 gap-6 overflow-x-auto md:justify-between">
					{Object.entries(columns).map(([columnId, column]: any) => (
						<div
							className="flex-shrink-0 flex flex-col gap-0"
							key={columnId}
						>
							<Droppable
								droppableId={columnId}
								key={columnId}
							>
								{(provided: any) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="flex flex-col min-w-[250px] md:min-w-[290px] gap-3 items-center py-5"
									>
										<div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
											{column.name}
										</div>
										{column.items.map((task: any, index: any) => (
											<Draggable
												key={task.id.toString()}
												draggableId={task.id.toString()}
												index={index}
											>
												{(provided: any) => (
													<>
														<Task
															provided={provided}
															task={task}
															onClick={() => openDetailModal(task, columnId)}
														/>
													</>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							<div
								onClick={() => openModal(columnId)}
								className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
							>
								<AddOutline color={"#555"} />
								Add Task
							</div>
						</div>
					))}
				</div>
			</DragDropContext>

			<AddModal
				isOpen={modalOpen}
				onClose={closeModal}
				setOpen={setModalOpen}
				handleAddTask={handleAddTask}
				columns={columns || {}}
			/>

			<TaskModal isOpen={detailOpen} onClose={closeDetailModal} task={selectedTask} onEdit={handleEditTask} onDelete={handleDeleteTask} />
		</>
	);
};

export default Home;
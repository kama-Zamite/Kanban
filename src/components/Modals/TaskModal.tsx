// React import not required with automatic JSX runtime
import { TimeOutline } from "react-ionicons";

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface TaskData {
  id: string;
  title: string;
  description: string;
  priority: string;
  deadline: number;
  dueDate?: string | null;
  image?: string;
  alt?: string;
  tags?: Tag[];
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: TaskData | null;
  onEdit?: (updated: TaskData) => void;
  onDelete?: (id: string) => void;
}

import { useEffect, useState } from "react";

const TaskModal = ({ isOpen, onClose, task, onEdit, onDelete }: TaskModalProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editable, setEditable] = useState<TaskData | null>(null);

  useEffect(() => {
    setEditable(task ?? null);
    setEditMode(false);
  }, [task]);

  if (!isOpen || !editable) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditable({ ...editable, [name]: name === "deadline" ? Number(value) : value } as TaskData);
  };

  const handleSave = () => {
    if (editable && onEdit) onEdit(editable);
    setEditMode(false);
    onClose();
  };

  const handleDelete = () => {
    if (editable && onDelete) onDelete(editable.id);
    onClose();
  };

  return (
    <div className={`w-screen h-screen place-items-center fixed top-0 left-0 grid`}>
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={onClose}
      ></div>
      <div className="w-[90%] md:w-[60%] lg:w-[30vw] max-w-[800px] max-h-[90vh] overflow-auto bg-white rounded-lg shadow-md z-50 flex flex-col items-start gap-3 px-5 py-6">
        {editable.image && (
          <img src={editable.image} alt={editable.alt ?? "task"} className="w-full h-[200px] rounded-md object-cover" />
        )}

        {editMode ? (
          <>
            <input name="title" value={editable.title} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            <textarea name="description" value={editable.description} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            <select name="priority" value={editable.priority} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input name="deadline" type="number" value={editable.deadline} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            <div className="w-full flex justify-end gap-2 mt-2">
              <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={() => setEditMode(false)}>Cancel</button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleSave}>Save</button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-800">{editable.title}</h3>
            <p className="text-sm text-gray-600">{editable.description}</p>
            <div className="w-full border border-dashed my-2"></div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TimeOutline color={"#666"} width="18px" height="18px" />
                <span className="text-sm text-gray-700">{editable.deadline} mins</span>
              </div>
              <div className={`w-[60px] rounded-full h-[6px] ${
                editable.priority === "high" ? "bg-red-500" : editable.priority === "medium" ? "bg-orange-500" : "bg-blue-500"
              }`} />
            </div>
            <div className="w-full mt-3">
              {editable.tags && editable.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {editable.tags.map((tag) => (
                    <span key={tag.title} className="px-[10px] py-[2px] text-[13px] font-medium rounded-md" style={{ backgroundColor: tag.bg, color: tag.text }}>
                      {tag.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full flex justify-between mt-4">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-yellow-400 text-white rounded-md" onClick={() => setEditMode(true)}>Edit</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleDelete}>Delete</button>
              </div>
              <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskModal;

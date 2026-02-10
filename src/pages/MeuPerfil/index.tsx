import React, { useRef, useState } from "react";

const MeuPerfil: React.FC = () => {
  // Estado editável do usuário
  const [user, setUser] = useState({
    nome: "Usuário Exemplo",
    email: "usuario@email.com",
    cargo: "Product Manager",
    avatar: "https://ui-avatars.com/api/?name=Usuario+Exemplo&background=fb923c&color=fff&size=128"
  });
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setAvatarFile(null);
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode integrar com backend para salvar
    setEditMode(false);
    setAvatarFile(null);
  };

  const handleAvatarClick = () => {
    if (editMode && fileInputRef.current) fileInputRef.current.click();
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUser((prev) => ({ ...prev, avatar: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-orange-50 to-white p-8">
      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md border border-orange-100">
        <div className="relative mb-4">
          <img
            src={user.avatar}
            alt="Avatar"
            className="rounded-full w-36 h-36 border-4 border-orange-400 shadow-lg object-cover cursor-pointer hover:opacity-90 transition"
            onClick={handleAvatarClick}
            title={editMode ? "Clique para alterar avatar" : undefined}
          />
          {editMode && (
            <button
              type="button"
              className="absolute bottom-2 right-2 bg-orange-400 hover:bg-orange-500 text-white rounded-full p-2 shadow-md transition border-2 border-white"
              onClick={handleAvatarClick}
              title="Alterar avatar"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <h2 className="text-3xl font-extrabold text-orange-500 mb-1 tracking-tight">{user.nome}</h2>
        <p className="text-gray-700 text-lg mb-1">{user.email}</p>
        <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 shadow">{user.cargo}</span>
        <div className="w-full flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium">Nome</label>
            <input
              type="text"
              name="nome"
              value={user.nome}
              onChange={handleChange}
              disabled={!editMode}
              className={`bg-gray-50 border border-orange-200 rounded-lg px-3 py-2 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 transition ${editMode ? "" : "opacity-70 cursor-not-allowed"}`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium">E-mail</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editMode}
              className={`bg-gray-50 border border-orange-200 rounded-lg px-3 py-2 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 transition ${editMode ? "" : "opacity-70 cursor-not-allowed"}`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium">Cargo</label>
            <input
              type="text"
              name="cargo"
              value={user.cargo}
              onChange={handleChange}
              disabled={!editMode}
              className={`bg-gray-50 border border-orange-200 rounded-lg px-3 py-2 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 transition ${editMode ? "" : "opacity-70 cursor-not-allowed"}`}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          {!editMode ? (
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded-lg shadow-lg text-lg transition-all duration-150"
              onClick={handleEdit}
            >
              Editar Perfil
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-lg shadow-lg text-lg transition-all duration-150"
              >
                Salvar
              </button>
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-8 rounded-lg shadow text-lg transition-all duration-150"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default MeuPerfil;

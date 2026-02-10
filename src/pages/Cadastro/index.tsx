import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cadastro: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && name) {
      fetch("http://localhost:3001/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Erro ao cadastrar");
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.id); // Armazene o id do usuário como token simples
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        })
        .catch(() => {
          alert("Erro ao cadastrar! E-mail já cadastrado?");
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-orange-100 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Cadastro</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          className="bg-gray-50 border border-orange-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-gray-50 border border-orange-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="bg-gray-50 border border-orange-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
          required
        />
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all">Cadastrar</button>
        <button type="button" className="bg-gray-200 hover:bg-gray-300 text-orange-500 font-bold py-2 rounded-lg shadow transition-all" onClick={() => navigate("/login")}>Voltar para Login</button>
      </form>
    </div>
  );
};

export default Cadastro;

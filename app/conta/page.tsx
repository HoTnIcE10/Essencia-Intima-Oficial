"use client";

import { useState } from "react";
import Link from "next/link";

export default function Conta() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ email: "", password: "" });
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: "#7f1d1d" }}>
              Minha Conta
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-900"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-900"
                  placeholder="Sua senha"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: "#7f1d1d" }}
              >
                Fazer Login
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Não tem conta?{" "}
              <Link href="#" className="font-semibold hover:underline" style={{ color: "#7f1d1d" }}>
                Registre-se aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#7f1d1d" }}>
          Minha Conta
        </h1>

        {/* Profile Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7f1d1d" }}>
              Informações Pessoais
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 font-semibold">Email</label>
                <p className="text-gray-900">{formData.email}</p>
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Membro desde</label>
                <p className="text-gray-900">15 de Agosto de 2026</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7f1d1d" }}>
              Histórico de Pedidos
            </h2>
            <p className="text-gray-600 mb-4">
              Você ainda não realizou nenhum pedido.
            </p>
            <Link
              href="/produtos"
              className="inline-block px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: "#7f1d1d" }}
            >
              Fazer uma Compra
            </Link>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7f1d1d" }}>
            Preferências
          </h2>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Receber newsletter com ofertas exclusivas</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Receber notificações de novos produtos</span>
            </label>
          </div>
        </section>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-8 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: "#7f1d1d" }}
        >
          Sair da Conta
        </button>
      </div>
    </div>
  );
}

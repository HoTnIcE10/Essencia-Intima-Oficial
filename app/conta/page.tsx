"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/src/utils/supabase/browser";

export default function Conta() {
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(Boolean(data.user));
      setLoading(false);
    };

    checkSession();
  }, [supabase]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      if (authMode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        setIsLoggedIn(true);
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        setMessage("Cadastro realizado com sucesso. Verifique seu email para confirmar a conta.");
      }
    } catch (error: any) {
      setMessage(error.message || "Erro ao processar autenticação.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setFormData({ email: "", password: "" });
    setMessage("Você saiu da conta.");
  };

  if (loading) {
    return (
      <div className="w-full px-4 py-20 text-center" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        <p style={{ color: "#000000" }}>Carregando sua conta...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="w-full px-4 py-8" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-[28px] shadow-md" style={{ border: "1px solid rgba(212, 175, 55, 0.4)" }}>
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: "#000000" }}>
              Minha Conta
            </h1>
            <p className="text-center text-sm mb-8" style={{ color: "#666666" }}>
              Acesse sua conta ou cadastre-se.
            </p>

            <div className="mb-6 flex rounded-full border p-1" style={{ borderColor: "#d4af37", backgroundColor: "#f8f1d8" }}>
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="flex-1 rounded-full px-4 py-2 font-semibold transition"
                style={{ backgroundColor: authMode === "login" ? "#000000" : "transparent", color: authMode === "login" ? "#ffffff" : "#000000" }}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className="flex-1 rounded-full px-4 py-2 font-semibold transition"
                style={{ backgroundColor: authMode === "register" ? "#000000" : "transparent", color: authMode === "register" ? "#ffffff" : "#000000" }}
              >
                Cadastrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  style={{ borderColor: "#d4af37", backgroundColor: "#ffffff" }}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Senha</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  style={{ borderColor: "#d4af37", backgroundColor: "#ffffff" }}
                  placeholder="Sua senha"
                  required
                />
              </div>

              {message ? (
                <p className="text-sm" style={{ color: message.includes("sucesso") ? "#166534" : "#b91c1c" }}>
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full py-3 rounded-full font-semibold transition"
                style={{ backgroundColor: "#000000", color: "#ffffff" }}
              >
                {authMode === "login" ? "Entrar" : "Criar conta"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#000000" }}>
          Minha Conta
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-[24px] shadow-md" style={{ border: "1px solid rgba(212, 175, 55, 0.4)" }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#000000" }}>
              Informações Pessoais
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 font-semibold">Email</label>
                <p className="text-gray-900">{formData.email || "Sua conta está ativa"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-md" style={{ border: "1px solid rgba(212, 175, 55, 0.4)" }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#000000" }}>
              Histórico de Pedidos
            </h2>
            <p className="text-gray-600 mb-4">
              Você ainda não realizou nenhum pedido.
            </p>
            <Link
              href="/produtos"
              className="inline-block px-6 py-2 rounded-full font-semibold transition"
              style={{ backgroundColor: "#000000", color: "#ffffff" }}
            >
              Fazer uma Compra
            </Link>
          </div>
        </section>

        <section className="bg-white p-6 rounded-[24px] shadow-md mb-8" style={{ border: "1px solid rgba(212, 175, 55, 0.4)" }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#000000" }}>
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

        <button
          onClick={handleLogout}
          className="px-8 py-3 rounded-full font-semibold transition"
          style={{ backgroundColor: "#000000", color: "#ffffff" }}
        >
          Sair da Conta
        </button>
      </div>
    </div>
  );
}

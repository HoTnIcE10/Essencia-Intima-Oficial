"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/src/utils/supabase/browser";

export default function Conta() {
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setIsLoggedIn(Boolean(data.user));

      if (data.user) {
        // Fetch user's orders
        const { data: userOrders } = await supabase
          .from("orders")
          .select(
            `
            id,
            total_amount,
            status,
            created_at,
            order_items(
              quantity,
              price,
              products(name)
            )
          `
          )
          .eq("user_id", data.user.id)
          .order("created_at", { ascending: false });

        if (userOrders) {
          setOrders(userOrders);
        }
      }
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
        window.location.reload();
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        setMessage("✅ Cadastro realizado! Verifique seu email para confirmar.");
      }
    } catch (error: any) {
      setMessage("❌ " + (error.message || "Erro ao processar autenticação."));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    setFormData({ email: "", password: "" });
    window.location.reload();
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

              {message && (
                <p className="text-sm text-center" style={{ color: message.includes("❌") ? "#b91c1c" : "#166534" }}>
                  {message}
                </p>
              )}

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: "#000000" }}>
            Minha Conta
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-full font-semibold text-white"
            style={{ backgroundColor: "#000000" }}
          >
            Sair
          </button>
        </div>

        {/* Informações Pessoais */}
        <section className="bg-white p-6 rounded-[24px] shadow-md mb-8" style={{ border: "1px solid rgba(212, 175, 55, 0.4)" }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#000000" }}>
            Informações Pessoais
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 font-semibold">Email</label>
              <p className="text-gray-900 font-medium">{user?.email}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Membro desde</label>
              <p className="text-gray-900">
                {new Date(user?.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </section>

        {/* Histórico de Pedidos */}
        <section className="bg-white p-6 rounded-[24px] shadow-md" style={{ border: "1px solid rgba(212, 175, 55, 0.4)" }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#000000" }}>
            Histórico de Pedidos
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Você ainda não realizou nenhum pedido.
              </p>
              <Link
                href="/produtos"
                className="inline-block px-6 py-2 rounded-full font-semibold transition"
                style={{ backgroundColor: "#000000", color: "#ffffff" }}
              >
                Ver Produtos
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div
                  key={order.id}
                  className="p-4 rounded-lg"
                  style={{ border: "1px solid rgba(212, 175, 55, 0.3)", backgroundColor: "#f9f4e8" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm" style={{ color: "#8b6b2e" }}>
                        Pedido #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {new Date(order.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{
                        backgroundColor:
                          order.status === "completed"
                            ? "#16a34a"
                            : order.status === "pending"
                              ? "#ea8c55"
                              : "#666666",
                      }}
                    >
                      {order.status === "completed"
                        ? "✓ Pago"
                        : order.status === "pending"
                          ? "Pendente"
                          : "Cancelado"}
                    </span>
                  </div>

                  <div className="mb-3">
                    {order.order_items?.map((item: any, idx: number) => (
                      <p key={idx} className="text-sm" style={{ color: "#000000" }}>
                        {item.products?.name} × {item.quantity}
                      </p>
                    ))}
                  </div>

                  <div className="text-right font-bold" style={{ color: "#8b6b2e" }}>
                    R$ {order.total_amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

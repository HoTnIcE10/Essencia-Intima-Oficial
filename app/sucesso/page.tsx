import Link from "next/link";

export default function Sucesso() {
  return (
    <div className="flex flex-col min-h-[70vh] items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="text-center space-y-8 px-4">
        <div className="text-7xl">✅</div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Pagamento Realizado!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Obrigado pela sua compra! Você receberá um email com os detalhes do
            pedido em breve.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-gray-700">
            Acompanhe seu pedido na sua conta ou via email.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/conta"
              className="px-8 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: "#7f1d1d" }}
            >
              Minha Conta
            </Link>
            <Link
              href="/produtos"
              className="px-8 py-3 border-2 text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition"
              style={{ borderColor: "#7f1d1d", color: "#7f1d1d" }}
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

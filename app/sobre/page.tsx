export default function Sobre() {
  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#7f1d1d" }}>
          Sobre Essência Intima
        </h1>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7f1d1d" }}>
            Nossa Missão
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            A Essência Intima nasceu com o objetivo de oferecer produtos de qualidade
            premium que despertam sensações e trazem bem-estar para o dia a dia. Acreditamos
            que todo cliente merece discrição, qualidade e respeito.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Nossos aromas são cuidadosamente selecionados para proporcionar experiências
            únicas e inesquecíveis, sempre mantendo a privacidade e a dignidade de nossos clientes.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7f1d1d" }}>
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "#7f1d1d" }}>
                Qualidade
              </h3>
              <p className="text-gray-600">
                Selecionamos apenas os melhores aromas e produtos para nossos clientes.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "#7f1d1d" }}>
                Discrição
              </h3>
              <p className="text-gray-600">
                Sua privacidade é nossa prioridade. Embalagens discretas e segredas garantidas.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "#7f1d1d" }}>
                Respeito
              </h3>
              <p className="text-gray-600">
                Tratamos todos os clientes com dignidade e respeito à sua intimidade.
              </p>
            </div>
          </div>
        </section>

        {/* Customer Service */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7f1d1d" }}>
            Atendimento ao Cliente
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              Estamos sempre disponíveis para ajudar! Se tiver alguma dúvida ou necessidade:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Email: contato@essenciaintima.com.br</li>
              <li>Whatsapp: (11) 99999-9999</li>
              <li>Horário: Segunda a Sexta, 9h às 18h</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

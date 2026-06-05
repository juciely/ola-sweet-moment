import { Dumbbell, UserCheck, Car, Baby, Clock, ShowerHead as Shower } from 'lucide-react';

const diferenciais = [
  {
    icon: Dumbbell,
    title: "APP DE TREINO INCLUSO",
    description: "Treino personalizado no seu objetivo. Vídeos dos exercícios, nome dos aparelhos. Tudo no celular."
  },
  {
    icon: UserCheck,
    title: "PROFESSOR CREF INCLUSO",
    description: "Todos os professores são formados e certificados. Acompanhamento no piso em todos os horários."
  },
  {
    icon: Car,
    title: "ESTACIONAMENTO AMPLO",
    description: "Estacionamento próprio e gratuito. Sem estresse pra encontrar vaga."
  },
  {
    icon: Baby,
    title: "ESPAÇO KIDS",
    description: "Seu filho fica seguro e entretido enquanto você treina sem preocupação."
  },
  {
    icon: Clock,
    title: "HORÁRIO ESTENDIDO",
    description: "Segunda a sexta das 05h às 22h. Treine no horário que funciona pra você."
  },
  {
    icon: Shower,
    title: "DUCHA COMPLETA",
    description: "Banheiros completos com ducha. Venha antes ou depois do trabalho."
  }
];

export function Diferenciais() {
  return (
    <section className="bg-[#0A0A0A] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bebas text-5xl md:text-6xl text-white mb-16">
          POR QUE <span className="text-[#AAFF00]">ELITE+</span> PERFORMANCE?
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {diferenciais.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#111111] border-l-[3px] border-[#AAFF00] p-6 md:p-8 flex flex-col items-start transition-transform hover:scale-[1.02]"
            >
              <item.icon className="text-[#AAFF00] w-7 h-7 mb-6" />
              <h3 className="font-bebas text-xl md:text-2xl text-white mb-3">
                {item.title}
              </h3>
              <p className="font-inter text-sm text-[#888888] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

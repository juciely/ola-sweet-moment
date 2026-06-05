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
    <section className="bg-[#080808] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bebas text-[52px] text-white mb-16 reveal">
          O QUE MUDA QUANDO VOCÊ TREINA AQUI
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {diferenciais.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#111111] border border-[#1E1E1E] p-7 md:p-8 rounded-[16px] flex flex-col items-start transition-all duration-300 hover:border-[#AAFF00] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(170,255,0,0.08)] reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <item.icon className="text-[#AAFF00] w-8 h-8" />
              <h3 className="font-bebas text-[22px] text-white mt-4 mb-2">
                {item.title}
              </h3>
              <p className="font-inter text-sm text-[#777777] leading-[1.7] mt-[8px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Dumbbell, UserCheck, Car, Baby, Clock, ShowerHead as Shower } from 'lucide-react';

const diferenciais = [
  {
    icon: Dumbbell,
    title: "APP DE TREINO INCLUSO",
    description: "Treino personalizado no seu objetivo. Vídeos dos exercícios e acompanhamento digital completo."
  },
  {
    icon: UserCheck,
    title: "PROFESSOR CERTIFICADO",
    description: "Equipe com CREF em tempo integral. Acompanhamento real no piso da academia."
  },
  {
    icon: Car,
    title: "ESTACIONAMENTO GRÁTIS",
    description: "Estacionamento próprio e gratuito para sua total comodidade e segurança."
  },
  {
    icon: Baby,
    title: "ESPAÇO KIDS",
    description: "Seu filho seguro e entretido enquanto você foca na sua evolução pessoal."
  },
  {
    icon: Clock,
    title: "HORÁRIO ESTENDIDO",
    description: "De segunda a sexta, das 05h às 22h. A academia que se adapta à sua rotina."
  },
  {
    icon: Shower,
    title: "DUCHA COMPLETA",
    description: "Banheiros modernos e completos. Praticidade total para o seu dia a dia."
  }
];

export function Diferenciais() {
  return (
    <section className="bg-[#080808] py-32 px-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 reveal">
          <div className="max-w-2xl">
            <span className="text-[#AAFF00] font-inter text-[12px] font-black uppercase tracking-[4px] mb-4 block">EXCLUSIVIDADE</span>
            <h2 className="font-bebas text-[50px] md:text-[70px] text-white leading-tight">
              O QUE MUDA QUANDO VOCÊ <br className="hidden md:block" />
              <span className="text-[#AAFF00]">TREINA NA ELITE+</span>
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {diferenciais.map((item, index) => (
            <div 
              key={index} 
              className="group bg-[#111] border border-white/5 p-8 md:p-10 rounded-[24px] flex flex-col items-start transition-all duration-500 hover:border-[#AAFF00]/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-[#AAFF00]/10 p-4 rounded-2xl group-hover:bg-[#AAFF00] group-hover:text-[#0A0A0A] transition-colors duration-500 text-[#AAFF00]">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bebas text-[28px] text-white mt-8 mb-4 tracking-wide group-hover:text-[#AAFF00] transition-colors">
                {item.title}
              </h3>
              <p className="font-inter text-[15px] md:text-[16px] text-[#666] leading-relaxed font-light group-hover:text-[#888] transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useEffect, useState } from 'react';

const BASE = 'https://naepymixqonguigtgywy.supabase.co/storage/v1/object/public/elite-images';

const fotos = [
  { src: `${BASE}/5012752233946352871.jpg`, alt: 'Área de musculação Elite+ Performance Sinop' },
  { src: `${BASE}/5012752233946352865.jpg`, alt: 'Esteiras Movement na Elite+ Performance' },
  { src: `${BASE}/5012752233946352864.jpg`, alt: 'Rack de halteres da Elite+ Performance' },
  { src: `${BASE}/5012752233946352867.jpg`, alt: 'Barras e anilhas profissionais Elite+ Performance' },
  { src: `${BASE}/5012752233946352866.jpg`, alt: 'Equipamentos de musculação black premium' },
  { src: `${BASE}/5012752233946352870.jpg`, alt: 'Sala de bikes e cardio da Elite+ Performance' },
];

export function AcademiaSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % fotos.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative group">
      <div className="absolute -inset-2 bg-linear-to-r from-[#d7f803] to-[#000] rounded-[32px] blur-2xl opacity-10 group-hover:opacity-20 transition-all"></div>
      <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/5 aspect-[4/5] md:aspect-[5/6] bg-[#0A0A0A]">
        {fotos.map((foto, i) => (
          <img
            key={foto.src}
            src={foto.src}
            alt={foto.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}

        {/* Indicadores */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {fotos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir para foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-[#d7f803]' : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

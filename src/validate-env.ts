// Validação simplificada para o preview
export function validateEnv() {
  console.log('Ambiente detectado:', {
    NODE_ENV: process.env.NODE_ENV,
    LOVABLE_PREVIEW: process.env.LOVABLE_PREVIEW,
    VITE: process.env.VITE,
    LOVABLE: process.env.LOVABLE
  });
}

validateEnv();

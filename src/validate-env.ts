import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function validateEnv() {
  try {
    const examplePath = join(process.cwd(), '.env.example');
    const content = readFileSync(examplePath, 'utf8');
    
    const requiredKeys = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(line => line.split('=')[0].trim());

    const missingKeys = requiredKeys.filter(key => !process.env[key]);

    if (missingKeys.length > 0) {
      console.error('\x1b[31m%s\x1b[0m', 'FATAL: Variáveis de ambiente obrigatórias ausentes no arquivo .env:');
      missingKeys.forEach(key => console.error('\x1b[33m%s\x1b[0m', ` - ${key}`));
      console.error('\x1b[31m%s\x1b[0m', '\nCertifique-se de preencher o seu arquivo .env com base no .env.example.');
      process.exit(1);
    }
    
    console.log('\x1b[32m%s\x1b[0m', '✓ Todas as variáveis de ambiente validadas com sucesso.');
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      console.warn('Aviso: Arquivo .env.example não encontrado para validação automática.');
      return;
    }
    console.error('Erro ao validar variáveis de ambiente:', error);
    process.exit(1);
  }
}

validateEnv();

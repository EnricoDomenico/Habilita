# Habilita - Protótipo Android

Projeto Vite + React + TypeScript + Tailwind CSS

## Status do Projeto
- [x] Criar arquivo copilot-instructions.md
- [x] Configurar projeto Vite
- [x] Configurar Tailwind CSS
- [x] Criar estrutura de componentes
- [x] Implementar fluxos de Aluno e Instrutor
- [x] Criar todas as telas do aplicativo

## Próximos Passos
Para executar o projeto, é necessário ter o Node.js instalado.

**Instalar Node.js:**
1. Baixe o Node.js em: https://nodejs.org/
2. Instale a versão LTS recomendada
3. Reinicie o terminal

**Após instalar o Node.js, execute:**
```bash
npm install
npm run dev
```

## Estrutura do Projeto
- `/src/components` - Componentes reutilizáveis (Layout)
- `/src/context` - Gerenciamento de estado global
- `/src/screens` - Todas as telas do aplicativo
  - Fluxo do Aluno: Documents → Category → Search → Schedule → Home
  - Fluxo do Instrutor: Credentials → Car → Availability → Home
  - Telas comuns: Schedule, Profile

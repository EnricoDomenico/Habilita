# Habilita - Protótipo Android

Aplicativo mobile para conectar alunos de auto-escola com instrutores particulares. Desenvolvido com Vite, React, TypeScript e Tailwind CSS, seguindo os padrões de Material Design para Android.

## 🚀 Funcionalidades

### Para Alunos
- ✅ Cadastro de documentos (RG, CPF, RENACH, LADV)
- ✅ Seleção de categoria (A ou B) e tipo de transmissão
- ✅ Busca de instrutores com filtros de preço e sexo
- ✅ Sistema de agendamento de aulas com calendário
- ✅ Visualização de aulas agendadas

### Para Instrutores
- ✅ Cadastro profissional (Credencial, EAR, CNH)
- ✅ Cadastro de veículo com validação de ano (bloqueio < 2011)
- ✅ Gestão de agenda e horários disponíveis
- ✅ Definição de preço por aula
- ✅ Dashboard com estatísticas

### Recursos Gerais
- ✅ Bottom Navigation Bar (navegação inferior)
- ✅ Botão voltar funcional em todas as telas
- ✅ Gerenciamento de estado com React Context
- ✅ Design Material adaptado para mobile-first
- ✅ Interface otimizada para uso com polegar
- ✅ Ícones do Lucide React

## 🛠️ Tecnologias

- **Vite** - Build tool rápido
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones
- **Context API** - Gerenciamento de estado

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Habilita
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra seu navegador em `http://localhost:3000`

## 📱 Estrutura do Projeto

```
Habilita/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Layout principal com navegação
│   ├── context/
│   │   └── AppContext.tsx      # Contexto global da aplicação
│   ├── screens/
│   │   ├── WelcomeScreen.tsx   # Tela inicial
│   │   ├── Student*.tsx        # Telas do fluxo do aluno
│   │   ├── Instructor*.tsx     # Telas do fluxo do instrutor
│   │   ├── ScheduleScreen.tsx  # Agenda
│   │   └── ProfileScreen.tsx   # Perfil
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx               # Ponto de entrada
│   └── index.css              # Estilos globais
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Design

O aplicativo segue os princípios do Material Design adaptado para Android:
- Elevações e sombras material
- Paleta de cores baseada no Material Design
- Animações de feedback tátil
- Componentes mobile-first
- Navegação inferior (Bottom Navigation)

## 🔄 Fluxos de Usuário

### Fluxo do Aluno
1. Tela de boas-vindas → Seleção "Sou Aluno"
2. Cadastro de documentos
3. Seleção de categoria e transmissão
4. Busca de instrutores com filtros
5. Agendamento de aulas
6. Home com aulas agendadas

### Fluxo do Instrutor
1. Tela de boas-vindas → Seleção "Sou Instrutor"
2. Cadastro de credenciais
3. Cadastro do veículo (validação ano ≥ 2011)
4. Definição de horários e preços
5. Home com estatísticas

## 🧪 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Compila para produção
npm run preview  # Preview da build de produção
npm run lint     # Executa o linter
```

## 📝 Notas de Desenvolvimento

- Todos os dados são armazenados em estado local (React Context)
- Mock data para instrutores disponíveis
- Validações de formulário implementadas
- Design responsivo otimizado para mobile
- Suporte a navegação com histórico (botão voltar)

## 🎯 Próximos Passos

- [ ] Integração com backend/API
- [ ] Autenticação de usuários
- [ ] Sistema de pagamentos
- [ ] Chat entre aluno e instrutor
- [ ] Sistema de avaliações
- [ ] Notificações push
- [ ] Geolocalização

## 📄 Licença

Este é um protótipo desenvolvido para fins de demonstração.

---

**Desenvolvido com ❤️ usando React + TypeScript + Tailwind CSS**

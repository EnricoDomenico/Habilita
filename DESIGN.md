# Guia de Design - Habilita

## 🎨 Identidade Visual

### Paleta de Cores

#### Cores Principais
- **Vermelho Vibrante**: `#E31E24` (brand-red)
  - Uso: Botões principais, CTAs, elementos interativos, links ativos
  - Classes Tailwind: `bg-brand-red`, `text-brand-red`, `border-brand-red`

- **Preto**: `#1a1a1a` (brand-black)
  - Uso: Títulos, textos principais, cabeçalhos importantes
  - Classes Tailwind: `bg-brand-black`, `text-brand-black`

- **Cinza Claro**: `#f5f5f5` (brand-gray)
  - Uso: Background principal, áreas de descanso visual
  - Classes Tailwind: `bg-brand-gray`

#### Cores de Suporte
- **Branco**: `#ffffff` - Cards, inputs, superfícies elevadas
- **Verde**: `#10b981` - Validação positiva, sucesso
- **Vermelho Erro**: `#ef4444` - Validação negativa, erros
- **Cinza**: `#6b7280` - Textos secundários, placeholders

---

## 📐 Espaçamento e Layout

### Bordas Arredondadas
Seguindo a tipografia fluida do logo Habilita:
- **Botões**: `rounded-3xl` (24px)
- **Cards**: `rounded-2xl` (16px)
- **Inputs**: `rounded-2xl` (16px)
- **Pills/Badges**: `rounded-full`

### Padding/Margin
- **Container Principal**: `p-6` (24px)
- **Cards**: `p-4` ou `p-5` (16px/20px)
- **Espaçamento entre elementos**: `space-y-6` ou `space-y-8`

---

## 🎭 Componentes de UI

### Botões

#### Botão Primary (Vermelho)
```tsx
className="w-full bg-brand-red text-white py-4 rounded-3xl 
           font-semibold text-lg shadow-material 
           active:scale-95 active:shadow-ripple 
           transition-all duration-200"
```
**Uso**: Ações principais, submissão de formulários, CTAs importantes

#### Botão Outline
```tsx
className="w-full bg-white text-brand-red border-2 border-brand-red 
           py-4 rounded-3xl font-semibold 
           active:bg-brand-gray active:scale-95 
           transition-all duration-200"
```
**Uso**: Ações secundárias, alternativas

#### Botão Secondary (Preto)
```tsx
className="w-full bg-brand-black text-white py-4 rounded-3xl 
           font-semibold shadow-material 
           active:scale-95 transition-all duration-200"
```
**Uso**: Ações alternativas importantes

### Cards

#### Card Básico
```tsx
className="bg-white rounded-2xl shadow-material p-4"
```

#### Card Interativo
```tsx
className="bg-white rounded-2xl shadow-material p-4 
           active:scale-98 active:bg-gray-50 
           transition-all duration-200 cursor-pointer"
```

#### Card de Destaque (Gradiente Vermelho)
```tsx
className="rounded-3xl bg-gradient-to-br from-brand-red to-red-700 
           text-white shadow-material-lg p-6"
```

### Inputs

#### Input Padrão
```tsx
className="w-full px-4 py-3 rounded-2xl border-2 border-gray-300 
           bg-white focus:border-brand-red focus:outline-none 
           transition-all duration-200"
```

#### Input com Validação Positiva
```tsx
className="w-full px-4 py-3 rounded-2xl border-2 border-green-500 
           bg-green-50 focus:border-green-600 focus:outline-none 
           transition-all duration-200"
```

#### Input com Validação Negativa
```tsx
className="w-full px-4 py-3 rounded-2xl border-2 border-red-500 
           bg-red-50 focus:border-red-600 focus:outline-none 
           transition-all duration-200"
```

---

## 🎬 Animações e Feedback

### Efeito Ripple (Android)
Feedback visual ao tocar em botões:
```css
.ripple-effect {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% { box-shadow: 0 0 0 0 rgba(227, 30, 36, 0.4); }
  100% { box-shadow: 0 0 0 20px rgba(227, 30, 36, 0); }
}
```

### Scale Animation
Redução ao pressionar:
```tsx
active:scale-95    // Para botões grandes
active:scale-98    // Para cards e elementos menores
```

### Fade In
Para elementos que aparecem dinamicamente:
```tsx
className="animate-fade-in"
```

---

## 🖼️ Assets e Logos

### Localização
Todos os assets estão em: `src/screens/imageslogos/`

### Uso dos Logos

#### LogoComNome.png
- **Onde usar**: Tela de Login/Welcome, Splash Screen
- **Tamanho recomendado**: `w-64` (256px)
```tsx
<img src={LogoComNome} alt="Habilita" className="w-64 h-auto" />
```

#### Logo.png (Ícone H)
- **Onde usar**: Header, Avatar, Favicon
- **Tamanho recomendado**: `w-8 h-8` (32px) no header
```tsx
<img src={Logo} alt="Habilita" className="w-8 h-8" />
```

#### 6.png (Ícone Carro)
- **Onde usar**: Cards de veículos, indicadores de progresso, decoração
- **Tamanho recomendado**: `w-10 h-10` ou `w-12 h-12`
```tsx
<img src={CarIcon} alt="Veículo" className="w-12 h-12" />
```

---

## 🎨 Tipografia

### Hierarquia de Textos

#### Títulos de Página
```tsx
className="text-2xl font-bold text-brand-black"
```

#### Subtítulos
```tsx
className="text-lg font-semibold text-brand-black"
```

#### Texto Corpo
```tsx
className="text-base text-gray-700"
```

#### Texto Secundário
```tsx
className="text-sm text-gray-600"
```

#### Labels de Input
```tsx
className="text-sm font-semibold text-brand-black"
```

---

## 📱 Componentes Android

### Bottom Navigation
```tsx
<nav className="fixed bottom-0 left-0 right-0 bg-white 
               border-t border-gray-200 shadow-material-lg">
  <div className="flex justify-around items-center h-16">
    {/* Items com efeito ripple e indicador ativo */}
  </div>
</nav>
```

**Características**:
- Altura fixa de 64px (h-16)
- Ícones de 24px
- Indicador vermelho no topo do item ativo
- Efeito ripple ao tocar
- Espaçamento uniforme entre itens

### Header
```tsx
<header className="bg-white shadow-material sticky top-0 z-10 
                 border-b border-gray-200">
  <div className="flex items-center h-16 px-4">
    <img src={Logo} className="w-8 h-8 mr-2" />
    <h1 className="text-lg font-semibold text-brand-black">Título</h1>
  </div>
</header>
```

---

## ✅ Validação Visual

### Estados de Input

#### Padrão (Sem validação)
- Borda: `border-gray-300`
- Background: `bg-white`

#### Sucesso (Validação positiva)
- Borda: `border-green-500`
- Background: `bg-green-50`
- Ícone: `<CheckCircle className="text-green-600" />`

#### Erro (Validação negativa)
- Borda: `border-red-500`
- Background: `bg-red-50`
- Ícone: `<AlertCircle className="text-red-600" />`

### Exemplo Completo
```tsx
<div className="relative">
  <input
    className={`w-full px-4 py-3 rounded-2xl border-2 
               transition-all duration-200 outline-none
               ${isValid 
                 ? 'border-green-500 bg-green-50' 
                 : 'border-red-500 bg-red-50'}`}
  />
  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
    {isValid 
      ? <CheckCircle className="text-green-600" />
      : <AlertCircle className="text-red-600" />}
  </div>
</div>
```

---

## 🎯 Boas Práticas

### Acessibilidade
- Usar `aria-label` em botões de ícone
- Manter contraste adequado (WCAG AA)
- Font-size mínimo de 16px em inputs (evita zoom no iOS)

### Performance
- Lazy load de imagens
- Usar `transform` em vez de `top/left` para animações
- Debounce em inputs de busca

### Consistência
- Sempre use as classes customizadas do Tailwind config
- Mantenha o padrão `rounded-3xl` para botões
- Use `shadow-material` para elevações
- Active state sempre com `active:scale-95` ou `active:scale-98`

---

## 📋 Checklist de Design

Ao criar uma nova tela, verifique:

- [ ] Usa cores da marca (brand-red, brand-black, brand-gray)
- [ ] Botões com `rounded-3xl` e efeito ripple
- [ ] Cards com `rounded-2xl`
- [ ] Validação visual em inputs (verde/vermelho)
- [ ] Bottom Navigation visível quando apropriado
- [ ] Header com logo como avatar
- [ ] Feedback visual em interações (scale, ripple)
- [ ] Padding consistente (p-6 no container)
- [ ] Tipografia hierárquica correta
- [ ] Shadows Material Design (shadow-material)

---

**Versão**: 1.0  
**Data**: Janeiro 2026  
**Marca**: Habilita 🚗

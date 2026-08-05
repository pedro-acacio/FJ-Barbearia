# FJ Barbearia — Landing Page

Landing page em React + Vite + Tailwind para a FJ Barbearia, barbearia com duas unidades na Rua Padre Anchieta (Monte Castelo, Fortaleza-CE).

No ar em: https://fj-barbearia.vercel.app

## O que tem na página

Uma página única (`src/App.jsx`) com: hero, seção sobre, grade de 6 serviços (corte, barba, combo, sobrancelha, infantil, pigmentação), 4 diferenciais, galeria de 8 fotos reais do estúdio com lightbox, 3 avaliações do Instagram, seletor de unidade com mapa do Google Maps incorporado para cada endereço, formulário de contato e botão flutuante de WhatsApp. Agendamento é feito via WhatsApp (`wa.me`) ou por links externos para o Trinks — não há backend próprio.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy

Já publicado na Vercel (framework preset Vite, build `npm run build`, output `dist`). Qualquer push na branch padrão do GitHub deve re-disparar o deploy automaticamente, se o projeto Vercel estiver conectado ao repositório.

## O que ainda vale ajustar

- **Domínio no `index.html`**: `canonical`, `og:url` etc. ainda apontam para `https://www.fjbarbearia.com.br/`, que não é o domínio publicado (`fj-barbearia.vercel.app`). Atualize essas tags quando definir o domínio final.
- **Descrição do repositório no GitHub**: o campo de descrição do repo está vazio — só este README não aparece na lista de repositórios do perfil.
- **Preços dos serviços**: os cards de serviço usam "Consultar valor" (linka pro WhatsApp) por não haver valores confirmados. Para mostrar preços fixos, edite o array `services` em `src/App.jsx`.
- **Avaliações**: as 3 avaliações em `reviews` (`src/App.jsx`) parecem capturadas do Instagram real da barbearia — vale confirmar que ainda são as mais recentes antes de manter fixas no código.
- **WhatsApp/telefone**: número atual `(85) 98735-4939`, definido em `PHONE_DIGITS` no topo de `src/App.jsx`.
- **Links do Trinks**: `TRINKS_LINK_701` e `TRINKS_LINK_666`, também no topo de `src/App.jsx` — confirme se ainda são os links corretos de agendamento de cada unidade.

## Estrutura

```
├── index.html          # SEO, favicon, Open Graph
├── src/
│   ├── App.jsx          # página inteira (todas as seções)
│   ├── main.jsx          # entry point
│   └── index.css          # Tailwind
├── public/
│   └── favicon.svg
├── tailwind.config.js
└── vite.config.js
```

Sem backend: formulário de contato e agendamento abrem o WhatsApp com a mensagem pré-preenchida (`wa.me`), sem servidor necessário.

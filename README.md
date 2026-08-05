# FJ Barbearia — Landing Page

Landing page em React + Vite + Tailwind para a FJ Barbearia (Monte Castelo, Fortaleza-CE).

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

## Publicar na Vercel

1. Suba este projeto para um repositório no GitHub.
2. Em vercel.com → **Add New Project** → importe o repositório.
3. Framework preset: **Vite** (detectado automaticamente).
4. Build command: `npm run build` · Output directory: `dist` (padrão).
5. Deploy. Depois, em **Settings → Domains**, adicione o domínio próprio se houver.

## O que ajustar antes de publicar

- **`public/og-image.jpg`**: já preenchida com uma foto real (1200x630) enviada pelo cliente. Troque se quiser outra imagem de destaque.
- **Fotos da galeria**: por pedido do cliente, a galeria usa apenas blocos de cor gerados em CSS (sem fotos). Se quiser adicionar fotos depois, troque adicionando `image: "/images/arquivo.jpg"` em cada item do array `gallery` em `src/App.jsx`.
- **Logo**: aparece apenas no cabeçalho (topo da página) e no favicon (`public/images/logo-icon.jpg`, `public/favicon.png`). Rodapé e demais seções usam apenas o nome em texto.
- **Depoimentos**: a seção `avaliacoes` tem 3 depoimentos ilustrativos — substitua pelos comentários reais dos clientes.
- **Preços dos serviços**: os cards de serviço usam "Consultar valor" (linka pro WhatsApp) por não termos valores confirmados. Se quiser mostrar preços fixos, edite o array `services` em `src/App.jsx`.
- **WhatsApp/telefone**: número atual `(85) 98735-4939`, definido em `PHONE_DIGITS` no topo de `src/App.jsx`.
- **Domínio no `index.html`**: troque `https://www.fjbarbearia.com.br/` pelo domínio real quando definido.

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

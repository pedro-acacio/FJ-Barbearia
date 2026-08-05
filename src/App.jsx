import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Scissors, Menu, X, Phone, MapPin, Instagram, Clock, Star,
  ChevronRight, MessageCircle, Sparkles, CreditCard, Users,
  Mail, Award, ShieldCheck, Store, Gamepad2,
} from "lucide-react";

/* ---------- helpers ---------- */

const PHONE_DIGITS = "5585987354939";
const WA_LINK = (msg) => `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(msg)}`;
const IG_LINK = "https://www.instagram.com/fjbarbearia";
const TRINKS_LINK_701 = "https://www.trinks.com/fj-barbearia-";
const TRINKS_LINK_666 = "https://www.trinks.com/fj-barbearia-2";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- barber pole (signature accent, used sparingly) ---------- */

function BarberPole({ className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      <div className="barber-stripes absolute inset-0" />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/30 rounded-full" />
    </div>
  );
}

/* ---------- ticket stub card (signature element) ---------- */

function TicketCard({ number, icon: Icon, title, desc, footer }) {
  return (
    <div className="group relative flex rounded-md bg-[#1E1811] border border-[#3a2f20] overflow-hidden hover:border-[#C9A227]/60 transition-colors duration-300">
      <div className="relative w-16 shrink-0 flex flex-col items-center justify-center bg-[#241C13] border-r border-dashed border-[#5a4a30]">
        <span className="font-mono text-lg text-[#C9A227]">{number}</span>
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute -right-1.5 w-3 h-3 rounded-full bg-[#14100D]"
            style={{ top: `${(i + 1) * 14}%` }}
          />
        ))}
      </div>
      <div className="p-5 flex flex-col gap-2">
        <Icon className="w-6 h-6 text-[#C9A227]" strokeWidth={1.5} />
        <h3 className="font-display text-xl tracking-wide text-[#F2E9DC]">{title}</h3>
        <p className="text-sm text-[#B7AD98] leading-relaxed">{desc}</p>
        {footer}
      </div>
    </div>
  );
}

/* ---------- gallery tile (css-generated, no external images) ---------- */

function GalleryTile({ icon: Icon, label, gradient, image, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="relative w-full block aspect-square rounded-md overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
    >
      {image ? (
        <img
          src={image}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className={`absolute inset-0 ${gradient}`} />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
      {!image && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-10 h-10 text-white/80 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.2} />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <span className="text-xs font-mono tracking-wide text-white/90">{label}</span>
      </div>
    </button>
  );
}

/* ---------- main component ---------- */

export default function FJBarbeariaLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [unit, setUnit] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [form, setForm] = useState({ nome: "", telefone: "", mensagem: "" });

  const units = [
    {
      nome: "Unidade Anchieta 701",
      endereco: "Rua Padre Anchieta, 701 - Monte Castelo, Fortaleza - CE",
      mapQuery: "Rua Padre Anchieta, 701, Monte Castelo, Fortaleza, CE",
      trinks: TRINKS_LINK_701,
      horario: ["Segunda a Sábado: 8h às 20h", "Domingo: 8h às 14h"],
    },
    {
      nome: "Unidade Anchieta 666",
      endereco: "Rua Padre Anchieta, 666 - Monte Castelo, Fortaleza - CE",
      mapQuery: "Rua Padre Anchieta, 666, Monte Castelo, Fortaleza, CE",
      trinks: TRINKS_LINK_666,
      horario: ["Segunda a Sexta: 8h às 20h", "Sábado: 8h às 18h", "Domingo: 8h às 14h"],
    },
  ];

  const services = [
    { n: "01", icon: Scissors, t: "Corte Masculino", d: "Cortes clássicos e modernos, ajustados ao seu estilo e ao formato do rosto." },
    { n: "02", icon: ShieldCheck, t: "Barba na Navalha", d: "Toalha quente, navalha e acabamento de precisão para uma barba impecável." },
    { n: "03", icon: Sparkles, t: "Combo Corte + Barba", d: "O pacote completo para quem não abre mão de sair pronto pra tudo." },
    { n: "04", icon: Award, t: "Design de Sobrancelha", d: "Acabamento fino que valoriza o olhar sem perder a naturalidade." },
    { n: "05", icon: Users, t: "Corte Infantil", d: "Atendimento paciente e descontraído para os pequenos clientes." },
    { n: "06", icon: Star, t: "Pigmentação & Platinado", d: "Serviços especiais para quem quer ousar em cor e textura." },
  ];

  const differentials = [
    { icon: MapPin, t: "Duas unidades", d: "Presença dupla na Padre Anchieta, no Monte Castelo." },
    { icon: Clock, t: "Aberto todos os dias", d: "Atendimento de segunda a domingo, com horário estendido até as 20h." },
    { icon: CreditCard, t: "Várias formas de pagamento", d: "Cartão de crédito/débito, Pix e dinheiro nas duas unidades." },
    { icon: MessageCircle, t: "Agendamento fácil", d: "Marque pelo WhatsApp ou direto no nosso sistema de agendamento online." },
  ];

  const gallery = [
    { icon: Scissors, label: "Corte", gradient: "bg-gradient-to-br from-[#3a2410] to-[#14100D]", image: "/images/corte-1.jpg" },
    { icon: ShieldCheck, label: "Barba", gradient: "bg-gradient-to-br from-[#5c1f28] to-[#1a0d10]", image: "/images/barba-1.jpg" },
    { icon: Sparkles, label: "Acabamento", gradient: "bg-gradient-to-br from-[#3a2f10] to-[#14100D]", image: "/images/acabamento-1.jpg" },
    { icon: Award, label: "Estúdio", gradient: "bg-gradient-to-br from-[#2a2118] to-[#0f0c08]", image: "/images/estudio-1.jpg" },
    { icon: Star, label: "Detalhes", gradient: "bg-gradient-to-br from-[#4a2a12] to-[#160f08]", image: "/images/detalhes-1.jpg" },
    { icon: Users, label: "Equipe", gradient: "bg-gradient-to-br from-[#22201c] to-[#0f0e0c]", image: "/images/equipe-1.jpg" },
    { icon: Store, label: "Fachada", gradient: "bg-gradient-to-br from-[#33281a] to-[#12100c]", image: "/images/fachada-1.jpg" },
    { icon: Gamepad2, label: "Lazer", gradient: "bg-gradient-to-br from-[#2c2416] to-[#100d08]", image: "/images/lazer-1.jpg" },
  ];

  const reviews = [
    { nome: "Avaliação no Instagram", texto: "Sou cliente fiel!! Todos os barbeiros são incríveis. Quem não conhece. Super recomendo.", nota: 5 },
    { nome: "Avaliação no Instagram", texto: "Barbearia 💈 top demais e com uma equipe de qualidade, eu indico para quem não conhece para ter essa experiência. 👏👏👏👏", nota: 5 },
    { nome: "Avaliação no Instagram", texto: "A melhor de Fortaleza 🔥🔥", nota: 5 },
  ];

  const navLinks = [
    ["Início", "#hero"], ["Sobre", "#sobre"], ["Serviços", "#servicos"],
    ["Diferenciais", "#diferenciais"], ["Galeria", "#galeria"],
    ["Avaliações", "#avaliacoes"], ["Localização", "#local"], ["Contato", "#contato"],
  ];

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${form.nome}. Telefone: ${form.telefone}. Mensagem: ${form.mensagem}`;
    window.open(WA_LINK(msg), "_blank");
  }, [form]);

  return (
    <div className="min-h-screen bg-[#14100D] text-[#F2E9DC] font-body antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Franklin:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body { font-family: 'Libre Franklin', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .barber-stripes {
          background: repeating-linear-gradient(
            45deg,
            #C9273A 0 14px,
            #F2E9DC 14px 28px,
            #14100D 28px 42px
          );
          animation: pole-scroll 2.2s linear infinite;
        }
        @keyframes pole-scroll {
          from { background-position: 0 0; }
          to { background-position: 60px 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .barber-stripes { animation: none; }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ---------- NAV ---------- */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-[#14100D]/85 border-b border-[#2a2118]">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5">
            <img src="/images/logo-icon.jpg" alt="FJ Barbearia" className="w-8 h-8 rounded-full object-cover ring-1 ring-[#C9A227]/50" />
            <span className="font-display text-2xl tracking-widest">FJ BARBEARIA</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm text-[#B7AD98]">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-[#C9A227] transition-colors">{label}</a>
            ))}
          </nav>
          <a
            href={TRINKS_LINK_701}
            target="_blank" rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#E4C158] text-[#14100D] font-semibold text-sm px-4 py-2 rounded-sm transition-colors"
          >
            Agendar <ChevronRight className="w-4 h-4" />
          </a>
          <button className="lg:hidden text-[#F2E9DC]" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-[#2a2118] bg-[#14100D] px-5 py-4 flex flex-col gap-4">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-[#B7AD98] hover:text-[#C9A227] text-sm">
                {label}
              </a>
            ))}
            <a href={TRINKS_LINK_701} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A227] text-[#14100D] font-semibold text-sm px-4 py-2 rounded-sm">
              Agendar <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </header>

      {/* ---------- HERO ---------- */}
      <section id="hero" className="relative pt-32 pb-24 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.12),transparent_55%)]" />
        <div className="max-w-6xl mx-auto relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#C9A227] border border-[#C9A227]/40 rounded-full px-3 py-1">
                <Star className="w-3.5 h-3.5" /> 5,0 ★ NO TRINKS (58 AVALIAÇÕES)
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-wide mt-5">
                SEU ESTILO,<br /><span className="text-[#C9A227]">NOSSA NAVALHA.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-lg text-[#B7AD98] text-lg leading-relaxed">
                Barbearia tradicional no Monte Castelo, Fortaleza — agora com duas unidades
                na Rua Padre Anchieta para atender você com corte, barba e cuidado de verdade.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={TRINKS_LINK_701} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#E4C158] text-[#14100D] font-semibold px-6 py-3 rounded-sm transition-colors">
                  <ChevronRight className="w-5 h-5" /> Agendar Online
                </a>
                <a href={WA_LINK("Olá! Quero agendar um horário na FJ Barbearia.")} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[#5a4a30] hover:border-[#C9A227] text-[#F2E9DC] px-6 py-3 rounded-sm transition-colors">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#B7AD98]">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C9A227]" /> Aberto todos os dias, até domingo</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#C9A227]" /> Monte Castelo, Fortaleza</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={250} className="justify-self-center">
            <BarberPole className="w-10 h-56 shadow-2xl shadow-black/50" />
          </Reveal>
        </div>
      </section>

      {/* ---------- SOBRE ---------- */}
      <section id="sobre" className="px-5 py-24 bg-[#1A140E] border-y border-[#2a2118]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="font-mono text-xs tracking-widest text-[#C9A227]">SOBRE A FJ</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 tracking-wide">TRADIÇÃO DE BARBEARIA, PADRÃO DE ESTÚDIO</h2>
            <p className="mt-5 text-[#B7AD98] leading-relaxed">
              A FJ Barbearia nasceu no Monte Castelo com um compromisso simples: entregar
              corte e barba de qualidade, com atenção a cada detalhe. Com o crescimento da
              clientela, abrimos uma segunda unidade na mesma rua para reduzir a espera e
              manter o mesmo padrão de atendimento em qualquer uma das casas.
            </p>
            <p className="mt-4 text-[#B7AD98] leading-relaxed">
              Cartão, Pix ou dinheiro, agendamento pelo WhatsApp ou direto no site, e uma
              equipe que trata cada cliente pelo nome — essa é a essência da casa.
            </p>
          </Reveal>
          <Reveal delay={150} className="grid grid-cols-2 gap-4">
            {[
              ["2", "Unidades na Padre Anchieta"],
              ["7", "Dias de atendimento por semana"],
              ["4,3K+", "Seguidores no Instagram"],
              ["5,0 ★", "Avaliação no Trinks (58 avaliações)"],
            ].map(([n, l]) => (
              <div key={l} className="bg-[#1E1811] border border-[#3a2f20] rounded-md p-5">
                <div className="font-display text-4xl text-[#C9A227]">{n}</div>
                <div className="text-sm text-[#B7AD98] mt-1">{l}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- SERVIÇOS ---------- */}
      <section id="servicos" className="px-5 py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-xl mx-auto text-center">
            <span className="font-mono text-xs tracking-widest text-[#C9A227]">SERVIÇOS</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 tracking-wide">O QUE FAZEMOS AQUI DENTRO</h2>
            <p className="mt-4 text-[#B7AD98]">Cada atendimento é um ticket só seu — escolha o serviço e agende direto pelo WhatsApp.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {services.map((s, i) => (
              <Reveal key={s.t} delay={i * 60}>
                <TicketCard
                  number={s.n} icon={s.icon} title={s.t} desc={s.d}
                  footer={
                    <a href={WA_LINK(`Olá! Quero agendar: ${s.t}.`)} target="_blank" rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm text-[#C9A227] hover:text-[#E4C158]">
                      Consultar valor <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DIFERENCIAIS ---------- */}
      <section id="diferenciais" className="px-5 py-24 bg-[#1A140E] border-y border-[#2a2118]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-[#C9A227]">DIFERENCIAIS</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 tracking-wide">POR QUE ESCOLHER A FJ</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {differentials.map((d, i) => (
              <Reveal key={d.t} delay={i * 80} className="flex flex-col gap-3">
                <d.icon className="w-8 h-8 text-[#C9A227]" strokeWidth={1.5} />
                <h3 className="font-display text-2xl tracking-wide">{d.t}</h3>
                <p className="text-sm text-[#B7AD98] leading-relaxed">{d.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- GALERIA ---------- */}
      <section id="galeria" className="px-5 py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-[#C9A227]">GALERIA</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 tracking-wide">O CLIMA DA CASA</h2>
            <p className="mt-4 text-[#B7AD98]">Um pouco do dia a dia, dos cortes e da equipe da FJ Barbearia.</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 max-w-3xl mx-auto">
            {gallery.map((g, i) => (
              <Reveal key={g.label} delay={i * 60}>
                <GalleryTile {...g} onOpen={() => setLightbox(g)} />
              </Reveal>
            ))}
          </div>
        </div>
        {lightbox && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
            <div className={`relative w-full max-w-md aspect-square rounded-md overflow-hidden ${lightbox.image ? "" : lightbox.gradient}`}>
              {lightbox.image ? (
                <img src={lightbox.image} alt={lightbox.label} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <lightbox.icon className="w-20 h-20 text-white/80" strokeWidth={1} />
                </div>
              )}
              <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-4 font-mono text-sm text-white/90">{lightbox.label}</div>
            </div>
          </div>
        )}
      </section>

      {/* ---------- AVALIAÇÕES ---------- */}
      <section id="avaliacoes" className="px-5 py-24 bg-[#1A140E] border-y border-[#2a2118]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-[#C9A227]">AVALIAÇÕES</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 tracking-wide">QUEM JÁ SENTOU NA CADEIRA</h2>
            <p className="mt-4 text-[#B7AD98] text-sm">O que dizem sobre a gente.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {reviews.map((r, i) => (
              <Reveal key={r.texto} delay={i * 80} className="bg-[#1E1811] border border-[#3a2f20] rounded-md p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < r.nota ? "fill-[#C9A227] text-[#C9A227]" : "text-[#4a3f2c]"}`} />
                  ))}
                </div>
                <p className="text-[#D9CFBB] text-sm leading-relaxed">“{r.texto}”</p>
                <span className="block mt-4 font-mono text-xs text-[#9C8F79]">— {r.nome}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LOCALIZAÇÃO ---------- */}
      <section id="local" className="px-5 py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-[#C9A227]">LOCALIZAÇÃO</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 tracking-wide">DUAS PORTAS, UMA CASA</h2>
          </Reveal>
          <Reveal delay={100} className="flex gap-2 mt-8">
            {units.map((u, i) => (
              <button key={u.nome} onClick={() => setUnit(i)}
                className={`px-4 py-2 rounded-sm text-sm font-semibold transition-colors ${
                  unit === i ? "bg-[#C9A227] text-[#14100D]" : "border border-[#5a4a30] text-[#B7AD98] hover:border-[#C9A227]"
                }`}>
                {u.nome}
              </button>
            ))}
          </Reveal>
          <Reveal delay={200} className="grid lg:grid-cols-[1fr_1.2fr] gap-8 mt-6 items-start">
            <div className="bg-[#1E1811] border border-[#3a2f20] rounded-md p-6">
              <MapPin className="w-6 h-6 text-[#C9A227] mb-3" />
              <h3 className="font-display text-2xl tracking-wide">{units[unit].nome}</h3>
              <p className="text-[#B7AD98] text-sm mt-2">{units[unit].endereco}</p>
              <div className="mt-6 flex items-start gap-2 text-sm text-[#B7AD98]">
                <Clock className="w-4 h-4 text-[#C9A227] mt-0.5" />
                <div>
                  {units[unit].horario.map((linha) => (
                    <div key={linha}>{linha}</div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <a href={units[unit].trinks} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#C9A227] hover:text-[#E4C158] text-sm font-semibold">
                  Agendar online nesta unidade <ChevronRight className="w-4 h-4" />
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(units[unit].mapQuery)}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#B7AD98] hover:text-[#C9A227] text-sm">
                  Abrir no Google Maps <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="w-full rounded-md overflow-hidden border border-[#3a2f20] aspect-video">
              <iframe
                title={units[unit].nome}
                className="w-full h-full"
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(units[unit].mapQuery)}&output=embed`}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CONTATO ---------- */}
      <section id="contato" className="px-5 py-24 bg-[#1A140E] border-t border-[#2a2118]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <Reveal>
            <span className="font-mono text-xs tracking-widest text-[#C9A227]">CONTATO</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 tracking-wide">MARQUE SEU HORÁRIO</h2>
            <p className="mt-4 text-[#B7AD98] leading-relaxed">
              Agende direto no nosso sistema online ou fale com a gente pelo canal que preferir.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={TRINKS_LINK_701} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#E4C158] text-[#14100D] font-semibold px-5 py-3 rounded-sm transition-colors flex-1">
                  <ChevronRight className="w-5 h-5" /> Agendar — Unidade 701
                </a>
                <a href={TRINKS_LINK_666} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#E4C158] text-[#14100D] font-semibold px-5 py-3 rounded-sm transition-colors flex-1">
                  <ChevronRight className="w-5 h-5" /> Agendar — Unidade 666
                </a>
              </div>
              <a href={WA_LINK("Olá! Quero agendar um horário na FJ Barbearia.")} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 border border-[#5a4a30] hover:border-[#C9A227] px-5 py-3 rounded-sm w-fit transition-colors">
                <MessageCircle className="w-5 h-5 text-[#C9A227]" /> WhatsApp: (85) 98735-4939
              </a>
              <a href={`tel:+${PHONE_DIGITS}`}
                className="inline-flex items-center gap-3 border border-[#5a4a30] hover:border-[#C9A227] px-5 py-3 rounded-sm w-fit transition-colors">
                <Phone className="w-5 h-5 text-[#C9A227]" /> Ligar agora
              </a>
              <a href={IG_LINK} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 border border-[#5a4a30] hover:border-[#C9A227] px-5 py-3 rounded-sm w-fit transition-colors">
                <Instagram className="w-5 h-5 text-[#C9A227]" /> @fjbarbearia
              </a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <form onSubmit={handleFormSubmit} className="bg-[#1E1811] border border-[#3a2f20] rounded-md p-6 flex flex-col gap-4">
              <div>
                <label className="text-xs font-mono text-[#9C8F79]">NOME</label>
                <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="mt-1 w-full bg-[#14100D] border border-[#3a2f20] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C9A227]" />
              </div>
              <div>
                <label className="text-xs font-mono text-[#9C8F79]">TELEFONE</label>
                <input required value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  className="mt-1 w-full bg-[#14100D] border border-[#3a2f20] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C9A227]" />
              </div>
              <div>
                <label className="text-xs font-mono text-[#9C8F79]">MENSAGEM</label>
                <textarea required rows={3} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="mt-1 w-full bg-[#14100D] border border-[#3a2f20] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C9A227] resize-none" />
              </div>
              <button type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#E4C158] text-[#14100D] font-semibold px-5 py-3 rounded-sm transition-colors">
                <Mail className="w-4 h-4" /> Enviar via WhatsApp
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="px-5 py-12 border-t border-[#2a2118]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <span className="font-display text-2xl tracking-widest">FJ BARBEARIA</span>
            <p className="mt-3 text-sm text-[#8A7F6D] max-w-xs">Rua Padre Anchieta, 701 e 666 — Monte Castelo, Fortaleza - CE</p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-[#9C8F79]">HORÁRIO</span>
              <span className="text-[#B7AD98]">Seg-Sáb 8h-20h</span>
              <span className="text-[#B7AD98]">Dom 8h-14h</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-[#9C8F79]">REDES</span>
              <a href={IG_LINK} target="_blank" rel="noreferrer" className="text-[#B7AD98] hover:text-[#C9A227]">Instagram</a>
              <a href={WA_LINK("Olá!")} target="_blank" rel="noreferrer" className="text-[#B7AD98] hover:text-[#C9A227]">WhatsApp</a>
              <a href={TRINKS_LINK_701} target="_blank" rel="noreferrer" className="text-[#B7AD98] hover:text-[#C9A227]">Agendar online</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#2a2118] text-xs text-[#6b6153]">
          © {new Date().getFullYear()} FJ Barbearia. Todos os direitos reservados.
        </div>
      </footer>

      {/* ---------- FLOATING WHATSAPP ---------- */}
      <a href={WA_LINK("Olá! Quero agendar um horário na FJ Barbearia.")} target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/40 hover:scale-105 transition-transform"
        aria-label="Chamar no WhatsApp">
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
      </a>
    </div>
  );
}

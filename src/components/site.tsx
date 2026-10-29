import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Award,
  Brain,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CloudSun,
  ChevronDown,
  Ear,
  Heart,
  HeartHandshake,
  Laptop,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldAlert,
  Sprout,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import portrait from "@/assets/portrait.jpg.asset.json";
import about from "@/assets/about.jpg.asset.json";
import children from "@/assets/children.jpg.asset.json";
import teens from "@/assets/teens.jpg.asset.json";
import adults from "@/assets/adults.jpg.asset.json";
import lecture from "@/assets/lecture.jpg.asset.json";
import play from "@/assets/play.jpg.asset.json";
import locationSpace from "@/assets/location-space.jpg.asset.json";
import locationLounge from "@/assets/location-lounge.jpg.asset.json";
import locationCourtyard from "@/assets/location-courtyard.jpg.asset.json";
import locationExterior from "@/assets/location-exterior.jpg.asset.json";
import officialLogo from "@/assets/logo-oficial-transparente.png.asset.json";

const assetUrl = (url: string) => import.meta.env.BASE_URL + (url.startsWith("/") ? url.slice(1) : url);

export const photos = { portrait, about, children, teens, adults, lecture, play };
export const whatsapp = "https://wa.me/5511943441672?text=Ol%C3%A1%2C%20Simone!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20conversa.";
const map = "https://www.google.com/maps/search/?api=1&query=Rua%20Can%C3%A1rio%2C%20384%20-%20Moema%2C%20S%C3%A3o%20Paulo%20-%20SP";
const directions = "https://www.google.com/maps/dir/?api=1&destination=Rua%20Can%C3%A1rio%2C%20384%20-%20Moema%2C%20S%C3%A3o%20Paulo%20-%20SP";
const siteUrl = "https://www.psicologasimonecosta.com.br";
export function pageHead(title: string, description: string, path = "/") {
  const canonical = `${siteUrl}${path === "/" ? "/" : `${path}/`}`;
  return {
    meta: [
      { title: `${title} | Simone Costa · Psicóloga` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Simone Costa` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Simone Costa | Psicóloga",
  url: `${siteUrl}/`,
  image: `${siteUrl}/images/logo-oficial-transparente.png`,
  telephone: "+5511943441672",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Canário, 384, Moema",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  areaServed: { "@type": "City", name: "São Paulo" },
};
export function WhatsApp({ children = "Falar no WhatsApp" }: { children?: ReactNode }) { return <Button asChild variant="care"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppMark />{children}</a></Button>; }
function WhatsAppMark() {
  return <span className="whatsapp-mark" aria-hidden="true">
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.35.14 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.19-1.24-6.19-3.47-8.43Zm-8.46 18.33h-.01a9.83 9.83 0 0 1-5.02-1.38l-.36-.21-3.72.97 1-3.62-.24-.37A9.79 9.79 0 0 1 1.92 12c0-5.42 4.42-9.84 9.86-9.84 2.63 0 5.1 1.02 6.96 2.88a9.75 9.75 0 0 1 2.87 6.95c-.01 5.42-4.42 9.84-9.85 9.84Zm5.4-7.36c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.47.13-.62l.2-.2c.07-.07.15-.15.22-.26.08-.1.1-.2.15-.33.05-.13.02-.25-.01-.35-.03-.1-.66-1.6-.91-2.2-.23-.57-.48-.49-.66-.5l-.56-.01c-.2 0-.52.07-.79.35-.27.28-1.03 1-1.03 2.44 0 1.45 1.05 2.83 1.2 3.03.15.2 2.07 3.16 5.01 4.42.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.43-.08-.13-.29-.2-.61-.35Z" />
    </svg>
  </span>;
}
export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const sectionMenuRef = useRef<HTMLDetailsElement>(null);
  const pathname = useRouterState({ select: s => s.location.pathname });
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (sectionMenuRef.current?.open && !sectionMenuRef.current.contains(target)) {
        sectionMenuRef.current.open = false;
      }
      if (
        open &&
        !mobileMenuButtonRef.current?.contains(target) &&
        !mobileNavRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (sectionMenuRef.current) sectionMenuRef.current.open = false;
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  useEffect(() => {
    document.documentElement.classList.add("js");
    const onScroll = () => document.querySelector(".site-header")?.classList.toggle("scrolled", window.scrollY > 12);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const sel = ".section-title,.section-intro,.pillar-card,.specialty-card,.audience-card,.lecture-card,.lecture-image,.about-image,.rounded-photo,.split-grid > div:last-child,.faq-item,.location-info,.location-visual";
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    els.forEach(el => {
      const i = Array.from(el.parentElement?.children ?? []).indexOf(el);
      el.style.setProperty("--d", `${Math.min(i, 4) * 0.12}s`);
      el.classList.add("reveal");
      if (el.matches(".about-image,.rounded-photo,.location-info")) el.classList.add("reveal-left");
      if (el.matches(".split-grid > div:last-child,.location-visual")) el.classList.add("reveal-right");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  const nav = [{ to: "/", label: "Início" }, { to: "/sobre", label: "Sobre mim" }, { to: "/atendimento", label: "Atendimento" }, { to: "/palestras", label: "Palestras" }, { to: "/contato", label: "Contato" }];
  const sectionNav = [
    { hash: "quando-procurar", label: "Quando procurar" },
    { hash: "especialidades", label: "Especialidades" },
    { hash: "avaliacoes", label: "Depoimentos" },
    { hash: "onde-atendo", label: "Onde atendo" },
    { hash: "duvidas-frequentes", label: "Dúvidas frequentes" },
  ] as const;
  const navLink = (item: (typeof sectionNav)[number]) => <Link key={item.hash} to="/" hash={item.hash} onClick={() => {
    setOpen(false);
    if (sectionMenuRef.current) sectionMenuRef.current.open = false;
  }}>{item.label}</Link>;
  return <>
    <script type="application/ld+json">{JSON.stringify(professionalService)}</script>
    <header className="site-header">
      <div className="site-container header-inner">
        <Link to="/" className="brand" aria-label="Simone Costa — Início"><img className="official-logo" src={assetUrl(officialLogo.url)} alt="Simone Costa — Psicóloga, logo oficial" /></Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.slice(0, 4).map(n => <Button key={n.to} variant="careNav" asChild><Link to={n.to} data-active={pathname === n.to}>{n.label}</Link></Button>)}
          <Button variant="careNav" asChild>{navLink(sectionNav[2])}</Button>
          {nav.slice(4).map(n => <Button key={n.to} variant="careNav" asChild><Link to={n.to} data-active={pathname === n.to}>{n.label}</Link></Button>)}
          <details className="section-menu" ref={sectionMenuRef}>
            <summary className="care-nav-button">Mais seções</summary>
            <div className="section-menu-dropdown">
              {sectionNav.filter((_, index) => index !== 2).map(item => navLink(item))}
              <a href="https://www.instagram.com/psicologasimone/" target="_blank" rel="noopener noreferrer" onClick={() => {
                if (sectionMenuRef.current) sectionMenuRef.current.open = false;
              }}>Instagram @psicologasimone</a>
            </div>
          </details>
        </nav>
        <Button ref={mobileMenuButtonRef} variant="careNav" size="icon" className="mobile-menu-button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(v => !v)}><Menu /></Button>
      </div>
      {open && <nav id="mobile-navigation" ref={mobileNavRef} className="mobile-nav" aria-label="Navegação no celular">
        {nav.slice(0, 4).map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} data-active={pathname === n.to}>{n.label}</Link>)}
        {sectionNav.map(navLink)}
        {nav.slice(4).map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} data-active={pathname === n.to}>{n.label}</Link>)}
        <a href="https://www.instagram.com/psicologasimone/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Instagram @psicologasimone</a>
        <WhatsApp />
      </nav>}
    </header>
    <main>{children}</main>
    <footer className="site-footer"><div className="site-container footer-inner">
      <Link to="/" className="brand"><img className="official-logo" src={assetUrl(officialLogo.url)} alt="Simone Costa — Psicóloga, logo oficial" /></Link>
      <p>Cuidado, escuta e transformação.<br />Moema, São Paulo · Atendimento online</p>
      <div className="footer-links">{nav.slice(1).map(n => <Link key={n.to} to={n.to}>{n.label}</Link>)}</div>
    </div><div className="site-container footer-bottom">© {new Date().getFullYear()} Simone Costa. Todos os direitos reservados.</div></footer>
    <Button asChild variant="care" className="floating-whatsapp" aria-label="Abrir conversa no WhatsApp"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppMark /></a></Button>
  </>;
}
export function SectionTitle({ eyebrow, children, center = true }: { eyebrow: string; children: ReactNode; center?: boolean }) { return <div className={`section-title ${center ? "center" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{children}</h2></div>; }
export function Hero() { return <section className="home-hero"><div className="site-container hero-grid"><div className="hero-copy"><p className="eyebrow">Psicóloga clínica · CRP 06/85827</p><h1>Um espaço de<br />cuidado para a<br />sua <em>saúde mental</em></h1><p className="hero-description">Atendo crianças, adolescentes, adultos e idosos. Com uma escuta qualificada, experiência prática, olhar humano e acolhedor.</p><div className="action-row"><WhatsApp>Agendar pelo WhatsApp</WhatsApp><Button asChild variant="careOutline"><Link to="/atendimento">Conhecer o atendimento <ArrowRight /></Link></Button></div><div className="credential-row"><span><Award />15 anos de clínica</span><span><MapPin />Moema · Espaço Shambala</span><span><Laptop />Atendimento online</span></div></div><div className="portrait-frame"><img src={assetUrl(portrait.url)} alt="Simone Costa, psicóloga clínica" fetchPriority="high" /><span className="portrait-caption">CRP 06/85827</span></div></div></section>; }
const reasonsToSeekSupport = [
  {
    title: "Ansiedade excessiva",
    text: "quando as preocupações, principalmente pensamentos negativos, afetam sua rotina e seu bem-estar.",
  },
  {
    title: "Tristeza persistente",
    text: "quando o desânimo, a angústia ou a falta de motivação se tornam frequentes, ultrapassando de duas semanas para mais.",
  },
  {
    title: "Dificuldades nos relacionamentos",
    text: "quando conflitos e padrões repetitivos causam sofrimento.",
  },
  {
    title: "Baixa autoestima",
    text: "quando você tem dificuldade de reconhecer seu valor e suas capacidades.",
  },
  {
    title: "Dependência emocional",
    text: "quando o medo de perder alguém faz você deixar suas próprias necessidades de lado.",
  },
  {
    title: "Dificuldade para lidar com emoções",
    text: "quando a raiva, o medo, a culpa ou a insegurança parecem difíceis de controlar.",
  },
  {
    title: "Momentos de mudança",
    text: "como separações, luto, mudanças profissionais ou crises pessoais.",
  },
  {
    title: "Sensação de sobrecarga",
    text: "quando as responsabilidades e as cobranças parecem maiores do que você consegue suportar, podendo ocasionar um Burnout.",
  },
  {
    title: "Desejo de autoconhecimento",
    text: "para compreender seus comportamentos, reconhecer padrões e desenvolver novas formas de lidar com a vida.",
  },
  {
    title: "Quando o sofrimento começa a interferir na rotina",
    text: "prejudicando o sono, o trabalho, os estudos ou as relações pessoais.",
  },
];
export function WhenToSeek() {
  return (
    <section className="section" id="quando-procurar">
      <div className="site-container">
        <SectionTitle eyebrow="Quando procurar">
          Quando buscar <em>terapia?</em>
        </SectionTitle>
        <p className="section-intro">
          Você não precisa esperar que a dor se torne intensa para buscar ajuda.
        </p>
        <ul className="when-list">
          {reasonsToSeekSupport.map((item) => (
            <li key={item.title}>
              <strong>{item.title}:</strong> {item.text}
            </li>
          ))}
        </ul>
        <div className="when-details">
          <article>
            <h3>O que é terapia?</h3>
            <p>
              A terapia é um espaço de acolhimento e cuidado, onde você pode falar sobre seus
              sentimentos, compreender suas emoções e aprender a olhar para si com mais carinho e
              amorosidade.
            </p>
          </article>
          <article>
            <h3>Qual o papel do Psicólogo?</h3>
            <p>
              O papel do psicólogo é oferecer uma escuta acolhedora, ética e sem julgamentos,
              ajudando o paciente a compreender seus sentimentos, pensamentos e comportamentos.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
const specialties = [
  {
    title: "Terapia de Casal",
    icon: HeartHandshake,
    text: "Um espaço para fortalecer o diálogo, compreender padrões de convivência e construir, em conjunto, caminhos mais saudáveis para a relação.",
  },
  {
    title: "Dependência emocional",
    icon: Heart,
    text: "Acolhimento para reconhecer vínculos, fortalecer a autonomia emocional e desenvolver relações com mais equilíbrio e respeito às próprias necessidades.",
  },
  {
    title: "Burnout",
    icon: BriefcaseBusiness,
    text: "Apoio para compreender sinais de esgotamento, rever limites e construir formas mais sustentáveis de lidar com as demandas do trabalho e da vida.",
  },
  {
    title: "Ansiedade",
    icon: Brain,
    text: "Um espaço para entender preocupações e reações de ansiedade, ampliar recursos para lidar com o dia a dia e recuperar segurança nas próprias escolhas.",
  },
  {
    title: "Depressão",
    icon: CloudSun,
    text: "Escuta e acompanhamento diante de sentimentos persistentes de tristeza, desânimo ou falta de interesse, respeitando o tempo e a história de cada pessoa.",
  },
  {
    title: "Bullying",
    icon: ShieldAlert,
    text: "Acolhimento para elaborar os impactos das agressões, fortalecer autoestima e segurança e encontrar apoio para enfrentar a situação.",
  },
];
export function Specialties() {
  return (
    <section className="section lavender-band" id="especialidades">
      <div className="site-container">
        <SectionTitle eyebrow="Especialidades">
          Áreas de <em>atuação</em>
        </SectionTitle>
        <div className="specialty-icons">
          {specialties.map(({ title, icon: Icon, text }) => (
            <article className="specialty-card" key={title}>
              <span className="specialty-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Reviews() {
  const reviews = [
    { name: "Mariana Albuquerque", text: <>Fazer terapia com a Dra. Simone Costa mudou minha forma de enxergar meus próprios limites. <strong>Aprendi a lidar com a autocobrança excessiva</strong> e me acolher melhor.</> },
    { name: "Rodrigo Silveira", text: <>A condução das sessões pela Dra. Simone Costa é fantástica. Com um olhar técnico e ao mesmo tempo acolhedor, <strong>ela me guiou no momento de maior vulnerabilidade</strong>.</> },
    { name: "Renata Azevedo", text: <>Eu tinha muita dificuldade em expressar o que sentia sem me sentir vulnerável demais. A Dra. Simone Costa soube respeitar meu tempo e <strong>hoje consigo me expressar com muito mais clareza</strong>.</> },
    { name: "Thiago Martins", text: <>O trabalho da Dra. Simone Costa foi fundamental para o meu autoconhecimento. A forma como ela conduz as reflexões <strong>me fez entender a origem de vários padrões que me travavam</strong>.</> },
    { name: "Larissa Freitas", text: <>A empatia e a precisão das intervenções da Dra. Simone Costa são o grande diferencial. Desde que comecei o acompanhamento, <strong>sinto uma evolução clara na forma como me relaciono comigo e com os outros</strong>.</> },
    { name: "Carolina Peixoto", text: <>Iniciar o acompanhamento com a Dra. Simone Costa foi uma das melhores decisões que tomei. A sensibilidade dela para captar detalhes faz toda a diferença: <strong>hoje me sinto mais segura para seguir em frente</strong>.</> },
  ];
  return <section className="section" id="avaliacoes"><div className="site-container">
    <SectionTitle eyebrow="Depoimentos">Experiências de quem confiou no <em>cuidado</em></SectionTitle>
    <div className="reviews-grid">{reviews.map(review => <article className="review-card" key={review.name}>
      <div className="review-stars" role="img" aria-label="5 de 5 estrelas">★★★★★</div>
      <p>{review.text}</p>
      <p className="review-name">{review.name}</p>
    </article>)}</div>
  </div></section>;
}
export function FirstContact() {
  const steps = [
    { icon: MessageCircle, title: "Entre em contato", text: "Chame a Simone pelo WhatsApp para saber mais sobre o atendimento." },
    { icon: Ear, title: "Converse sobre suas dúvidas", text: "Conte o que está buscando apenas até onde se sentir confortável." },
    { icon: CalendarDays, title: "Combine os próximos passos", text: "Se desejar, vocês podem combinar a modalidade e o horário do atendimento." },
  ];
  return <section className="section first-contact"><div className="site-container"><SectionTitle eyebrow="Primeiro contato">Um primeiro passo, <em>no seu tempo</em></SectionTitle><p className="section-intro">Você pode começar esclarecendo suas dúvidas e decidir os próximos passos com tranquilidade.</p><div className="first-contact-grid">{steps.map((step, index) => <article className="first-contact-card" key={step.title}><span className="first-contact-icon"><step.icon aria-hidden="true" /></span><span className="first-contact-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><div className="center first-contact-cta"><WhatsApp>Falar com Simone no WhatsApp</WhatsApp></div></div></section>;
}
export function Pillars() { const items = [{ icon: Ear, title: "Escuta qualificada", text: "Um espaço seguro para falar e ser ouvido sem julgamentos, no seu tempo." }, { icon: HeartHandshake, title: "Experiência prática", text: "15 anos acompanhando crianças, adolescentes e adultos em diferentes fases da vida." }, { icon: Sprout, title: "Olhar humano", text: "Cada pessoa é única: o cuidado é construído a partir da sua história e das suas necessidades." }]; return <section className="section lavender-band"><div className="site-container"><SectionTitle eyebrow="Meu jeito de trabalhar">Três pilares do meu <em>trabalho</em></SectionTitle><div className="three-grid">{items.map(i => <article className="pillar-card" key={i.title}><span className="pillar-icon"><i.icon /></span><h3>{i.title}</h3><p>{i.text}</p></article>)}</div></div></section>; }
export function AboutSection({ full = false }: { full?: boolean }) { return <section className="section"><div className="site-container split-grid"><div className="about-image"><img src={assetUrl(about.url)} alt="Simone Costa apoiada em livros sobre terapia, autoconhecimento e ansiedade" loading="lazy" /></div><div><SectionTitle eyebrow="Sobre mim" center={false}>Psicóloga clínica há <em>15 anos</em></SectionTitle><p>Atuo no cuidado da saúde mental de crianças, adolescentes, adultos e idosos, acolhendo questões relacionadas à ansiedade, autoestima, relacionamentos, dependência emocional, vícios em jogos, bullying, estresse e síndrome do pânico.</p><p>Meu compromisso é acolher as dores e potencializar as forças, apoiando cada pessoa na construção de sua própria identidade com segurança e confiança.</p>{!full && <Button asChild variant="careOutline"><Link to="/sobre">Conhecer minha trajetória <ArrowRight /></Link></Button>}</div></div></section>; }
const audiences = [{ title: "Crianças", image: children, text: "Por meio do brincar, a criança aprende a reconhecer e a expressar o que sente, fortalecendo a autoestima e as relações." }, { title: "Adolescentes", image: teens, text: "Acompanhamento com atenção às transformações da adolescência, à busca por identidade e às demandas emocionais do cotidiano." }, { title: "Adultos", image: adults, text: "Apoio para lidar com ciclos de ansiedade, esgotamento, conflitos, transições e desafios de bem-estar emocional." }];
export function Audiences({ full = false }: { full?: boolean }) { return <section className="section lavender-band"><div className="site-container"><SectionTitle eyebrow="Para quem atendo">Crianças, <em>adolescentes</em> e adultos</SectionTitle><div className="three-grid">{audiences.map(a => <article className="audience-card" key={a.title}><img src={assetUrl(a.image.url)} alt={a.title} loading="lazy" /><div><h3>{a.title}</h3><p>{a.text}</p></div></article>)}</div>{full && <p className="section-intro">Também atendemos idosos, com acolhimento sensível às questões da maturidade, da saúde emocional e do cuidado em diferentes etapas da vida.</p>}</div></section>; }
const lectureAudiences = [
  { title: "Para empresas", icon: Building2, description: "Encontros para empresas, equipes e lideranças, com foco no bem-estar, nas relações e em um clima organizacional mais saudável.", topics: ["Saúde mental no trabalho", "Relações e comunicação", "Clima organizacional"], detail: "Palestras e oficinas para ampliar a consciência emocional, fortalecer o cuidado coletivo e reduzir o desgaste cotidiano." },
  { title: "Para escolas", icon: Sprout, description: "Cuidado emocional e autoconhecimento para alunos, professores, famílias e equipes escolares, respeitando as necessidades de cada público.", topics: ["Ansiedade e estresse", "Bullying", "Autoconhecimento"], detail: "Intervenções acessíveis e práticas, pensadas para tornar o cuidado emocional parte do ciclo escolar e familiar." },
];
export function Lectures({ full = false }: { full?: boolean }) {
  return <section className="section"><div className="site-container">
    <SectionTitle eyebrow="Palestras e formações">Levo a psicologia para <em>empresas e escolas</em></SectionTitle>
    <p className="section-intro">Conteúdo acessível, prático e adaptado à realidade de cada organização ou comunidade escolar — palestras, workshops e rodas de conversa.</p>
    <img className="lecture-image" src={assetUrl(lecture.url)} alt="Simone Costa conduzindo um encontro sobre saúde mental no trabalho" loading="lazy" />
    <div className="two-grid lecture-cards">{lectureAudiences.map(a => <article className="lecture-card" key={a.title}><div>
      <span className="pillar-icon"><a.icon aria-hidden="true" /></span><h3>{a.title}</h3><p>{a.description}</p>
      <ul className="lecture-topics">{a.topics.map(topic => <li key={topic}><Check size={16} aria-hidden="true" /><span>{topic}</span></li>)}</ul>
      {full && <><p>{a.detail}</p><WhatsApp>Conversar sobre uma palestra</WhatsApp></>}
    </div></article>)}</div>
    {full && <div className="lecture-formats"><h3>Formatos dos encontros</h3><div className="three-grid"><div><h4>Palestras</h4><p>Conteúdo objetivo, acessível e reflexivo.</p></div><div><h4>Workshops</h4><p>Momentos de prática, escuta e troca.</p></div><div><h4>Rodas de conversa</h4><p>Espaços abertos para acolher dúvidas e experiências.</p></div></div></div>}
    {!full && <div className="center section-action"><Button asChild variant="careOutline"><Link to="/palestras">Ver todas as palestras <ArrowRight /></Link></Button></div>}
  </div></section>;
}
export function PlaySection() { return <section className="section lavender-band"><div className="site-container split-grid"><img className="rounded-photo" src={assetUrl(play.url)} alt="Simone Costa trabalhando com um paciente na infância" loading="lazy" /><div><SectionTitle eyebrow="Acolhimento na infância" center={false}>O brincar como caminho de <em>expressão</em></SectionTitle><p>Nas sessões infantis, o brincar e a criação de vínculos tornam o cuidado mais leve, seguro e significativo. O objetivo é ajudar a criança a nomear e compreender suas emoções, fortalecendo sua autoestima e suas relações.</p><Button asChild variant="careOutline"><Link to="/atendimento">Entender o atendimento <ArrowRight /></Link></Button></div></div></section>; }
const locationPhotos = [
  {
    image: locationSpace,
    alt: "Sala de atendimento do Espaço Shambala, com poltronas e sofá em um ambiente acolhedor",
  },
  {
    image: locationLounge,
    alt: "Recepção do Espaço Shambala com sofá, parede de tijolos e iluminação acolhedora",
  },
  {
    image: locationCourtyard,
    alt: "Área externa do Espaço Shambala com mesas, plantas e guarda-sóis",
  },
  {
    image: locationExterior,
    alt: "Fachada do Espaço Shambala na Rua Canário, em Moema",
  },
];

function LocationPhotoCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateSelectedIndex = () => setSelectedIndex(api.selectedScrollSnap());
    updateSelectedIndex();
    api.on("select", updateSelectedIndex);

    return () => {
      api.off("select", updateSelectedIndex);
    };
  }, [api]);

  return (
    <div className="location-visual">
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        aria-label="Fotos do Espaço Shambala"
        className="location-carousel"
      >
        <CarouselContent>
          {locationPhotos.map(({ image, alt }, index) => (
            <CarouselItem
              key={image.url}
              className="location-slide"
              data-active={selectedIndex === index}
            >
              <img className="location-photo" src={assetUrl(image.url)} alt={alt} loading="lazy" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          aria-label="Foto anterior"
          className="location-carousel-control location-carousel-previous"
        />
        <CarouselNext
          aria-label="Próxima foto"
          className="location-carousel-control location-carousel-next"
        />
      </Carousel>
      <div className="location-photo-caption">
        <span className="eyebrow">Um espaço de cuidado e acolhimento</span>
        <span className="location-photo-title">Espaço Shambala</span>
        <span className="location-photo-address">Rua Canário, 384 · Moema</span>
        <a className="map-link" href={map} target="_blank" rel="noopener noreferrer">
          Ver localização <ArrowRight size={16} />
        </a>
        <div className="location-carousel-dots" aria-label="Escolher foto">
          {locationPhotos.map(({ alt }, index) => (
            <button
              key={alt}
              type="button"
              aria-label={`Mostrar foto ${index + 1} de ${locationPhotos.length}`}
              aria-pressed={selectedIndex === index}
              className="location-carousel-dot"
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
        <span className="sr-only" aria-live="polite">
          Foto {selectedIndex + 1} de {locationPhotos.length}
        </span>
      </div>
    </div>
  );
}

export function Location() {
  return <section className="section" id="onde-atendo"><div className="site-container">
    <SectionTitle eyebrow="Onde atendo">Espaço Shambala, em <em>Moema</em></SectionTitle>
    <p className="section-intro">Atendimento presencial em um espaço tranquilo e acolhedor na Rua Canário, 384 – Moema, São Paulo. Também atendo online, com a mesma qualidade e o mesmo sigilo profissional.</p>
    <div className="location-grid">
      <div className="location-info">
        <span className="pillar-icon"><MapPin /></span>
        <p>Rua Canário, 384 – Moema<br />São Paulo – SP</p>
        <p className="small-copy">O Espaço de atendimento fica próximo à estação Moema da Linha 5–Lilás do metrô.</p>
        <p className="small-copy">O endereço completo é enviado junto com a confirmação do agendamento.</p>
        <div className="action-row">
          <Button asChild variant="careOutline"><a href={map} target="_blank" rel="noopener noreferrer">Ver no mapa <ArrowRight /></a></Button>
          <Button asChild variant="careOutline"><a href={directions} target="_blank" rel="noopener noreferrer">Como chegar <ArrowRight /></a></Button>
          <WhatsApp>Agendar uma conversa</WhatsApp>
        </div>
      </div>
      <LocationPhotoCarousel />
    </div>
    <div className="two-grid location-types">
      <div><Building2 /><h3>Presencial</h3><p>Rua Canário, 384 – Moema, São Paulo. Um espaço tranquilo e reservado para as sessões.</p></div>
      <div><Laptop /><h3>Online</h3><p>Sessões por vídeo para quem prefere a praticidade de casa ou mora em outra cidade.</p></div>
    </div>
  </div></section>;
}
const faqs = [{ q: "Como funciona o primeiro contato?", a: "O primeiro contato é pelo WhatsApp. Podemos conversar sobre o que você está buscando, esclarecer suas dúvidas e combinar o agendamento, se for o caso." }, { q: "Posso fazer terapia online?", a: "Sim. O atendimento online é uma opção segura e prática para quem prefere realizar as sessões de casa ou de outra cidade." }, { q: "Atendo crianças e adolescentes?", a: "Sim. O cuidado é adaptado à idade, ao estágio de desenvolvimento e às necessidades emocionais de cada pessoa." }, { q: "Preciso ter um problema grave para procurar terapia?", a: "Não. Muitas pessoas buscam ajuda para compreender melhor o que sentem, lidar com desafios do dia a dia ou fortalecer sua saúde emocional antes que algo fique mais intenso." }];
export function FAQ() { const [opened, setOpened] = useState<number | null>(null); return <section className="section lavender-band" id="duvidas-frequentes"><div className="site-container faq-container"><SectionTitle eyebrow="Dúvidas frequentes">Perguntas que costumam surgir</SectionTitle><div className="faq-list">{faqs.map((item, index) => <article className="faq-item" key={item.q}><button type="button" className="faq-question" aria-expanded={opened === index} onClick={() => setOpened(opened === index ? null : index)}><span>{item.q}</span><span className="faq-toggle">{opened === index ? <X size={18} /> : <ChevronDown size={18} />}</span></button>{opened === index && <div className="faq-answer"><p>{item.a}</p></div>}</article>)}</div></div></section>; }
export function ContactCTA() { return <section className="contact-band"><div className="site-container center"><p className="eyebrow">Vamos conversar?</p><h2>Me conte o que você está <em>buscando</em></h2><p>Se quiser, posso te orientar sobre a melhor forma de atendimento para sua realidade.</p><div className="center"><WhatsApp>Agendar uma conversa</WhatsApp></div></div></section>; }
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) { return <section className="page-intro"><div className="site-container center"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-intro-description">{description}</p></div></section>; }

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Award, Baby, Brain, Building2, CalendarDays, Check, ChevronDown, Ear, HandHeart, Heart, HeartHandshake, Laptop, Leaf, MapPin, Menu, MessageCircle, Phone, Sparkles, Sprout, UsersRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/portrait.jpg.asset.json";
import about from "@/assets/about.jpg.asset.json";
import children from "@/assets/children.jpg.asset.json";
import teens from "@/assets/teens.jpg.asset.json";
import adults from "@/assets/adults.jpg.asset.json";
import lecture from "@/assets/lecture.jpg.asset.json";
import play from "@/assets/play.jpg.asset.json";
import officialLogo from "@/assets/logo-oficial-transparente.png.asset.json";

const assetUrl = (url: string) => import.meta.env.BASE_URL + (url.startsWith("/") ? url.slice(1) : url);

export const photos = { portrait, about, children, teens, adults, lecture, play };
export const whatsapp = "https://wa.me/5511943441672?text=Ol%C3%A1%2C%20Simone!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20conversa.";
const map = "https://www.google.com/maps/search/?api=1&query=Rua%20Can%C3%A1rio%2C%20384%20-%20Moema%2C%20S%C3%A3o%20Paulo%20-%20SP";
const directions = "https://www.google.com/maps/dir/?api=1&destination=Rua%20Can%C3%A1rio%2C%20384%20-%20Moema%2C%20S%C3%A3o%20Paulo%20-%20SP";
const siteUrl = "https://jeffersoninsanos-oss.github.io/simonepsicologa";
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
export function WhatsApp({ children = "Falar no WhatsApp" }: { children?: ReactNode }) { return <Button asChild variant="care"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{children}</a></Button>; }
function WhatsAppMark() { return <span className="whatsapp-mark" aria-hidden="true"><MessageCircle /><Phone /></span>; }
export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });
  useEffect(() => {
    document.documentElement.classList.add("js");
    const onScroll = () => document.querySelector(".site-header")?.classList.toggle("scrolled", window.scrollY > 12);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const sel = ".section-title,.section-intro,.pillar-card,.audience-card,.lecture-card,.lecture-image,.about-image,.rounded-photo,.split-grid > div:last-child,.faq-item,.location-info,.location-visual,.location-types > div,.contact-band .site-container,.page-intro .site-container,.lecture-formats,.when-card,.specialty-icon";
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
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
  const nav = [{ to: "/", label: "Início" }, { to: "/sobre", label: "Sobre mim" }, { to: "/atendimento", label: "Atendimento" }, { to: "/palestras", label: "Palestras" }, { to: "/contato", label: "Contato" }] as const;
  return <><script type="application/ld+json">{JSON.stringify(professionalService)}</script><header className="site-header"><div className="site-container header-inner"><Link to="/" className="brand" aria-label="Simone Costa — Início"><img className="official-logo" src={assetUrl(officialLogo.url)} alt="Simone Costa — Psicóloga, logo oficial" /></Link><nav className="desktop-nav" aria-label="Navegação principal">{nav.map(n => <Button key={n.to} variant="careNav" asChild><Link to={n.to} data-active={pathname === n.to}>{n.label}</Link></Button>)}</nav><div className="header-contact"><WhatsApp /></div><Button variant="careNav" size="icon" className="mobile-menu-button" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open && <nav className="mobile-nav" aria-label="Navegação no celular">{nav.map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} data-active={pathname === n.to}>{n.label}</Link>)}<WhatsApp /></nav>}</header><main>{children}</main><footer className="site-footer"><div className="site-container footer-inner"><Link to="/" className="brand"><img className="official-logo" src={assetUrl(officialLogo.url)} alt="Simone Costa — Psicóloga, logo oficial" /></Link><p>Cuidado, escuta e transformação.<br />Moema, São Paulo · Atendimento online</p><div className="footer-links">{nav.slice(1).map(n => <Link key={n.to} to={n.to}>{n.label}</Link>)}</div></div><div className="site-container footer-bottom">© {new Date().getFullYear()} Simone Costa. Todos os direitos reservados.</div></footer><Button asChild variant="care" className="floating-whatsapp" aria-label="Abrir conversa no WhatsApp"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppMark /></a></Button></>;
}
export function SectionTitle({ eyebrow, children, center = true }: { eyebrow: string; children: ReactNode; center?: boolean }) { return <div className={`section-title ${center ? "center" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{children}</h2></div>; }
export function Hero() { return <section className="home-hero"><div className="site-container hero-grid"><div className="hero-copy"><p className="eyebrow">Psicóloga clínica · CRP 06/85827</p><h1>Um espaço de<br />cuidado para a<br />sua <em>saúde mental</em></h1><p className="hero-description">Atendo crianças, adolescentes, adultos e idosos com escuta qualificada, experiência prática e olhar humano e acolhedor.</p><div className="action-row"><WhatsApp>Agendar pelo WhatsApp</WhatsApp><Button asChild variant="careOutline"><Link to="/atendimento">Conhecer o atendimento <ArrowRight /></Link></Button></div><div className="credential-row"><span><Award />15 anos de clínica</span><span><MapPin />Moema · Espaço Shambala</span><span><Laptop />Atendimento online</span></div></div><div className="portrait-frame"><img src={assetUrl(portrait.url)} alt="Simone Costa, psicóloga clínica" fetchPriority="high" /><span className="portrait-caption">CRP 06/85827</span></div></div></section>; }
export function HomeSectionNav() {
  return <nav className="home-section-nav site-container" aria-label="Seções da página inicial">
    <a href="#quando-procurar">Quando procurar</a>
    <a href="#avaliacoes">Avaliações</a>
    <a href="#especialidades">Especialidades</a>
  </nav>;
}
const reasonsToSeekSupport = [
  { icon: Brain, text: "A ansiedade, a preocupação ou o estresse estão dificultando sua rotina." },
  { icon: Heart, text: "Você está atravessando uma perda, mudança ou fase emocionalmente difícil." },
  { icon: HandHeart, text: "Questões nos relacionamentos ou na comunicação estão pesando para você." },
  { icon: Sparkles, text: "Você quer compreender melhor seus sentimentos e cuidar da sua autoestima." },
];
export function WhenToSeek() {
  return <section className="section" id="quando-procurar"><div className="site-container">
    <SectionTitle eyebrow="Quando procurar">Quando procurar uma <em>psicóloga?</em></SectionTitle>
    <p className="section-intro">A terapia pode oferecer acolhimento e reflexão em diferentes momentos. Você não precisa esperar chegar ao limite para buscar apoio.</p>
    <div className="when-grid">{reasonsToSeekSupport.map(item => <article className="when-card" key={item.text}><span className="pillar-icon"><item.icon aria-hidden="true" /></span><p>{item.text}</p></article>)}</div>
  </div></section>;
}
const specialtyIcons = [Baby, UsersRound, Heart, Brain, HandHeart, Sparkles];
export function Specialties() {
  return <section className="section lavender-band" id="especialidades"><div className="site-container">
    <SectionTitle eyebrow="Especialidades">Áreas de <em>atuação</em></SectionTitle>
    <div className="specialty-icons" aria-label="Ícones das especialidades">{specialtyIcons.map((Icon, index) => <span className="specialty-icon" key={index} aria-hidden="true"><Icon /></span>)}</div>
  </div></section>;
}
export function Reviews() {
  const reviews = [
    { name: "Mariana Albuquerque", text: <>Fazer terapia com a Dra. Simone Costa mudou minha forma de enxergar meus próprios limites. <strong>Aprendi a lidar com a autocobrança excessiva</strong> e passei a encarar a vida de forma muito mais leve.</> },
    { name: "Rodrigo Silveira", text: <>A condução das sessões pela Dra. Simone Costa é fantástica. Com um olhar técnico e ao mesmo tempo acolhedor, <strong>ela me guiou no momento de maior transição da minha carreira</strong>, me dando a segurança de que eu precisava.</> },
    { name: "Renata Azevedo", text: <>Eu tinha muita dificuldade em expressar o que sentia sem me sentir vulnerável demais. A Dra. Simone Costa soube respeitar meu tempo e <strong>hoje consigo me comunicar de forma muito mais assertiva e saudável</strong>.</> },
    { name: "Thiago Martins", text: <>O trabalho da Dra. Simone Costa foi fundamental para o meu autoconhecimento. A forma como ela conduz as reflexões <strong>me fez entender a origem de vários padrões repetitivos que me atrapalhavam</strong>.</> },
    { name: "Larissa Freitas", text: <>A empatia e a precisão das intervenções da Dra. Simone Costa são o grande diferencial. Desde que comecei o acompanhamento, <strong>sinto uma evolução visível nos meus relacionamentos interpessoais e na minha autoestima</strong>.</> },
  ];
  return <section className="section" id="avaliacoes"><div className="site-container">
    <SectionTitle eyebrow="Avaliações">Experiências de quem confiou no <em>cuidado</em></SectionTitle>
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
export function AboutSection({ full = false }: { full?: boolean }) { return <section className="section"><div className="site-container split-grid"><div className="about-image"><img src={assetUrl(about.url)} alt="Simone Costa com bonecos de crochê usados no atendimento infantil" loading="lazy" /></div><div><SectionTitle eyebrow="Sobre mim" center={false}>Psicóloga clínica há <em>15 anos</em></SectionTitle><p>Atuo no cuidado da saúde mental de crianças, adolescentes, adultos e idosos, acolhendo questões relacionadas à ansiedade, autoestima, relacionamentos, dependência emocional, vícios em jogos, bullying, estresse e síndrome do pânico.</p><p>Meu compromisso é acolher as dores e potencializar as forças, apoiando cada pessoa na construção de sua própria identidade com segurança e confiança.</p>{!full && <Button asChild variant="careOutline"><Link to="/sobre">Conhecer minha trajetória <ArrowRight /></Link></Button>}</div></div></section>; }
const audiences = [{ title: "Crianças", image: children, text: "Por meio do brincar, a criança aprende a reconhecer e a expressar o que sente, fortalecendo a autoestima e as relações." }, { title: "Adolescentes", image: teens, text: "Um espaço para lidar com ansiedade, cobranças, comparações, redes sociais, bullying e as mudanças próprias da idade." }, { title: "Adultos", image: adults, text: "Acompanhamento para ansiedade, estresse, síndrome do pânico, baixa autoestima, depressão, relacionamentos, dependência emocional e abusos." }];
export function Audiences({ full = false }: { full?: boolean }) { return <section className="section lavender-band"><div className="site-container"><SectionTitle eyebrow="Para quem atendo">Crianças, adolescentes, adultos e <em>idosos</em></SectionTitle><div className="three-grid">{audiences.map(a => <article className="audience-card" key={a.title}><img src={assetUrl(a.image.url)} alt={`Simone Costa — atendimento a ${a.title.toLowerCase()}`} loading="lazy" /><div><h3>{a.title}</h3><p>{a.text}</p></div></article>)}</div>{!full && <div className="center section-action"><Button asChild variant="careOutline"><Link to="/atendimento">Ver como funciona o atendimento <ArrowRight /></Link></Button></div>}</div></section>; }
export function Topics() { const topics = ["Saúde mental no trabalho", "Ansiedade e estresse", "Autoestima", "Bullying", "Adolescência e cobranças", "Inteligência emocional", "Relacionamentos", "Autoconhecimento", "Burnout e prevenção", "Liderança e saúde mental"]; return <section className="topics-band"><div className="site-container"><p className="eyebrow center">Temas que acompanho com frequência</p><div className="topic-marquee"><div className="topic-track">{[0, 1].map(copy => <div className="topic-list" key={copy} aria-hidden={copy === 1 ? true : undefined}>{topics.map(t => <span key={t}><Leaf size={16} aria-hidden="true" />{t}</span>)}</div>)}</div></div></div></section>; }
const lectureAudiences = [
  { title: "Para empresas", icon: Building2, description: "Encontros para empresas, equipes e lideranças, com foco no bem-estar, nas relações e em um clima organizacional mais saudável.", topics: ["Saúde mental no trabalho", "Ansiedade e estresse", "Burnout e prevenção", "Inteligência emocional", "Relações saudáveis no trabalho", "Comunicação e limites", "Autocuidado", "Liderança e saúde mental"], detail: "Conteúdo adaptado à realidade e aos objetivos de cada organização, com uma abordagem prática e humana. Encontros presenciais ou online." },
  { title: "Para escolas", icon: Sprout, description: "Cuidado emocional e autoconhecimento para alunos, professores, famílias e equipes escolares, respeitando as necessidades de cada público.", topics: ["Ansiedade na adolescência", "Autoestima e autoconhecimento", "Redes sociais e saúde mental", "Bullying e relações interpessoais", "Inteligência emocional", "Adolescência, cobranças e expectativas"], detail: "Diálogos sobre sentimentos, comparação, pressão e relações, fortalecendo a saúde emocional desde cedo e construindo relações escolares mais saudáveis." },
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
    {full && <div className="lecture-formats"><h3>Formatos dos encontros</h3><div className="three-grid"><div><h4>Palestras</h4><p>Conteúdo objetivo, acessível e reflexivo.</p></div><div><h4>Workshops</h4><p>Momentos participativos, com atividades e trocas.</p></div><div><h4>Rodas de conversa</h4><p>Espaço para diálogo e compartilhamento de experiências.</p></div></div></div>}
    {!full && <div className="center section-action"><Button asChild variant="careOutline"><Link to="/palestras">Ver todas as palestras <ArrowRight /></Link></Button></div>}
  </div></section>;
}
export function PlaySection() { return <section className="section lavender-band"><div className="site-container split-grid"><img className="rounded-photo" src={assetUrl(play.url)} alt="Simone Costa fazendo bolhas de sabão com seus bonecos de pano" loading="lazy" /><div><p className="eyebrow">O cuidado na infância</p><h2>Sentir também é <em>aprender!</em></h2><p>A terapia ajuda a criança a entender e expressar o que sente. Por meio do brincar, ela desenvolve emoções, fortalece a autoestima, aprende a lidar com dificuldades e constrói relações mais saudáveis consigo e com o mundo.</p></div></div></section>; }
export function Location() {
  return <section className="section" id="onde-atendo"><div className="site-container">
    <SectionTitle eyebrow="Onde atendo">Espaço Shambala, em <em>Moema</em></SectionTitle>
    <p className="section-intro">Atendimento presencial em um espaço tranquilo e acolhedor na Rua Canário, 384 – Moema, São Paulo. Também atendo online, com a mesma qualidade e o mesmo sigilo.</p>
    <div className="location-grid">
      <div className="location-info">
        <span className="pillar-icon"><MapPin /></span>
        <p>Rua Canário, 384 – Moema<br />São Paulo – SP</p>
        <p className="small-copy">O Espaço Shambala fica próximo à estação Moema da Linha 5–Lilás do metrô.</p>
        <p className="small-copy">O endereço completo é enviado junto com a confirmação do agendamento.</p>
        <div className="action-row">
          <Button asChild variant="careOutline"><a href={map} target="_blank" rel="noopener noreferrer">Ver no mapa <ArrowRight /></a></Button>
          <Button asChild variant="careOutline"><a href={directions} target="_blank" rel="noopener noreferrer">Como chegar <ArrowRight /></a></Button>
          <WhatsApp>Agendar uma conversa</WhatsApp>
        </div>
      </div>
      <a className="location-visual" href={map} target="_blank" rel="noopener noreferrer">
        <Leaf size={42} /><span className="eyebrow">Cuidado · Escuta · Transformação</span>
        <h3>Espaço Shambala</h3><p>Rua Canário, 384 – Moema</p>
        <span className="map-link">Ver localização <ArrowRight size={16} /></span>
      </a>
    </div>
    <div className="two-grid location-types">
      <div><Building2 /><h3>Presencial</h3><p>Rua Canário, 384 – Moema, São Paulo. Um espaço tranquilo e reservado para as sessões.</p></div>
      <div><Laptop /><h3>Online</h3><p>Sessões por vídeo para quem prefere a praticidade de casa ou mora em outra cidade.</p></div>
    </div>
  </div></section>;
}
const faqs = [{ q: "Como funciona o primeiro contato?", a: "O primeiro contato é pelo WhatsApp. Podemos conversar sobre o que você está buscando, esclarecer suas dúvidas e combinar o agendamento." }, { q: "Qual é a frequência das sessões?", a: "A frequência é combinada de acordo com as necessidades de cada pessoa, durante o atendimento." }, { q: "O que eu falo fica em sigilo?", a: "Sim. O atendimento psicológico respeita o sigilo profissional, conforme o Código de Ética da Psicologia." }, { q: "Você atende crianças?", a: "Sim. Atendo crianças por meio de recursos lúdicos e do brincar, respeitando suas necessidades e sua fase de desenvolvimento." }, { q: "O atendimento online funciona igual?", a: "O atendimento online também oferece escuta qualificada e sigilo. As sessões acontecem por vídeo, em um ambiente reservado." }];
export function FAQ() { const [opened, setOpened] = useState<number | null>(null); return <section className="section lavender-band"><div className="site-container faq-container"><SectionTitle eyebrow="Dúvidas frequentes">Perguntas <em>frequentes</em></SectionTitle><div className="faq-list">{faqs.map((f, i) => <div className="faq-item" key={f.q}><Button variant="careNav" onClick={() => setOpened(opened === i ? null : i)} aria-expanded={opened === i} aria-controls={`faq-${i}`}><span>{f.q}</span><ChevronDown className={opened === i ? "rotated" : ""} /></Button>{opened === i && <p id={`faq-${i}`}>{f.a}</p>}</div>)}</div></div></section>; }
export function ContactCTA() { return <section className="contact-band"><div className="site-container center"><p className="eyebrow">Vamos conversar?</p><h2>Me conte o que você está <em>buscando</em></h2><p>Será um prazer acompanhar você, sua família ou a sua organização nesse caminho.</p><div className="action-row justify-center"><WhatsApp /><a className="phone-link" href="tel:+5511943441672"><Phone size={17} />(11) 94344-1672</a></div></div></section>; }
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) { return <section className="page-intro"><div className="site-container center"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></section>; }
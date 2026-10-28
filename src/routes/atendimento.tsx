import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageIntro, FirstContact, Audiences, PlaySection, Location, FAQ, ContactCTA, SectionTitle, pageHead } from "@/components/site";

export const Route = createFileRoute("/atendimento")({
  head: () => pageHead(
    "Atendimento psicológico",
    "Psicoterapia para crianças, adolescentes e adultos com Simone Costa. Atendimento presencial em Moema e online.",
    "/atendimento",
  ),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageIntro
        eyebrow="Atendimento"
        title={<>Um cuidado que respeita a sua <em>história</em></>}
        description="Um espaço seguro para acolher o que você sente, compreender seus desafios e caminhar com mais clareza e suporte."
      />

      <section className="section">
        <div className="site-container">
          <SectionTitle eyebrow="Quando buscar terapia" center={false}>
            Sinais de que pode ser um bom momento para buscar ajuda
          </SectionTitle>

          <div className="two-grid" style={{ gap: "1.5rem", alignItems: "start" }}>
            <div>
              <ul className="topics-list" style={{ display: "grid", gap: "0.85rem", listStyle: "none", padding: 0, margin: 0 }}>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Ansiedade excessiva: quando as preocupações, principalmente pensamentos negativos, afetam sua rotina e seu bem-estar.</li>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Tristeza persistente: quando o desânimo, a angústia ou a falta de motivação se tornam frequentes, ultrapassando de duas semanas para mais.</li>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Dificuldades nos relacionamentos: quando conflitos e padrões repetitivos causam sofrimento.</li>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Baixa autoestima: quando você tem dificuldade de reconhecer seu valor e suas capacidades.</li>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Dependência emocional: quando o medo de perder alguém faz você deixar suas próprias necessidades de lado.</li>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Dificuldade para lidar com emoções: quando a raiva, o medo, a culpa ou a insegurança parecem difíceis de controlar.</li>
              </ul>
            </div>

            <div>
              <ul className="topics-list" style={{ display: "grid", gap: "0.85rem", listStyle: "none", padding: 0, margin: 0 }}>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Momentos de mudança: como separações, lutos, mudanças profissionais ou crises pessoais.</li>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Sensação de estar sobrecarregado: quando as responsabilidades e as cobranças parecem maiores do que você consegue suportar, podendo ocasionar um burnout.</li>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Desejo de autoconhecimento: para compreender seus comportamentos, reconhecer padrões e desenvolver novas formas de lidar com a vida.</li>
                <li className="topic-pill" style={{ display: "block", width: "100%" }}>Quando o sofrimento começa a interferir na rotina: prejudicando o sono, o trabalho, os estudos ou as relações pessoais.</li>
              </ul>
            </div>
          </div>

          <p className="section-intro" style={{ marginTop: "1.5rem" }}>
            Você não precisa esperar que a dor se torne intensa para buscar ajuda. A terapia pode ser um espaço de cuidado e orientação em qualquer momento em que você se sentir sobrecarregado, confuso, cansado ou inquieto.
          </p>
        </div>
      </section>

      <section className="section lavender-band">
        <div className="site-container">
          <SectionTitle eyebrow="O que é terapia" center={false}>
            Um espaço de acolhimento, cuidado e autoconhecimento
          </SectionTitle>
          <p className="section-intro">
            A terapia é um espaço de acolhimento e cuidado, onde você pode falar sobre seus sentimentos, compreender suas emoções e aprender a olhar para si com mais carinho, clareza e amorosidade. É um processo de escuta cuidadosa, apoio e reflexão, que pode ajudar você a encontrar novos caminhos para viver com mais equilíbrio e bem-estar.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <SectionTitle eyebrow="Qual o papel do psicólogo" center={false}>
            A escuta, a orientação e o cuidado profissional
          </SectionTitle>
          <p className="section-intro">
            O papel do psicólogo é oferecer uma escuta acolhedora, ética e sem julgamentos, ajudando o paciente a compreender seus sentimentos, pensamentos e comportamentos. Através de um acompanhamento seguro e respeitoso, o psicólogo pode colaborar para que você reconheça padrões, desenvolva ferramentas para lidar com desafios emocionais e transforme sua relação consigo mesmo e com o mundo ao seu redor.
          </p>
        </div>
      </section>

      <Audiences full />
      <PlaySection />
      <Location />
      <FirstContact />
      <FAQ />
      <ContactCTA />
    </SiteLayout>
  );
}

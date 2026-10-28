import { createFileRoute } from "@tanstack/react-router";
import {
  SiteLayout,
  PageIntro,
  FirstContact,
  Audiences,
  PlaySection,
  Location,
  FAQ,
  ContactCTA,
  pageHead,
} from "@/components/site";

export const Route = createFileRoute("/atendimento")({
  head: () =>
    pageHead(
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

      <Audiences full />
      <PlaySection />
      <Location />
      <FirstContact />
      <FAQ />
      <ContactCTA />
    </SiteLayout>
  );
}

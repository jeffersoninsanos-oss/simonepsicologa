import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageIntro, Location, ContactCTA, FAQ, pageHead } from "@/components/site";
export const Route = createFileRoute("/contato")({
  head: () =>
    pageHead(
      "Contato e agendamento",
      "Fale com Simone Costa pelo WhatsApp (11) 94344-1672. Atendimento na Av. Sabiá, 384, Moema, São Paulo, e online.",
      "/contato",
    ),
  component: Page,
});
function Page() {
  return (
    <SiteLayout>
      <PageIntro
        eyebrow="Contato"
        title={
          <>
            Vamos <em>conversar?</em>
          </>
        }
        description="Entre em contato para agendar uma conversa, esclarecer dúvidas sobre o atendimento ou falar sobre palestras para a sua organização."
      />
      <ContactCTA />
      <Location />
      <FAQ />
    </SiteLayout>
  );
}

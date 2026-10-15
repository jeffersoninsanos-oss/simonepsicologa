import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageIntro, AboutSection, Pillars, ContactCTA, pageHead } from "@/components/site";
export const Route = createFileRoute("/sobre")({ head: () => pageHead("Sobre mim", "Conheça Simone Costa, psicóloga clínica há 15 anos. Escuta qualificada e olhar humano para crianças, adolescentes e adultos."), component: Page });
function Page() { return <SiteLayout><PageIntro eyebrow="Sobre mim · CRP 06/85827" title={<>Uma história de escuta e <em>cuidado</em></>} description="Sou Simone Costa, psicóloga clínica. Acredito no acolhimento das dores e na potência de cada pessoa para construir a sua própria história." /><AboutSection full /><Pillars /><ContactCTA /></SiteLayout>; }

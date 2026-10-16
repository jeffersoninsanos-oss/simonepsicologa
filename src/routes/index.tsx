import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Hero, Pillars, AboutSection, Audiences, Topics, Lectures, PlaySection, Location, FAQ, ContactCTA, pageHead } from "@/components/site";
export const Route = createFileRoute("/")({ head: () => pageHead("Simone Costa · Psicóloga clínica em Moema", "Um espaço de cuidado para a sua saúde mental. Atendimento a crianças, adolescentes, adultos e idosos em Moema e online. CRP 06/85827."), component: Index });
function Index() { return <SiteLayout><Hero /><Pillars /><AboutSection /><Audiences /><Topics /><Lectures /><PlaySection /><Location /><FAQ /><ContactCTA /></SiteLayout>; }

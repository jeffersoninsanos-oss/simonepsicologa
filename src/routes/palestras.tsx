import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageIntro, Lectures, Topics, ContactCTA, pageHead } from "@/components/site";
export const Route = createFileRoute("/palestras")({ head: () => pageHead("Palestras e formações", "Palestras, workshops e rodas de conversa com Simone Costa para empresas e escolas. Saúde mental, inteligência emocional e prevenção ao burnout."), component: Page });
function Page() { return <SiteLayout><PageIntro eyebrow="Palestras e formações" title={<>Psicologia que aproxima e <em>transforma</em></>} description="Conversas sobre saúde mental que fazem sentido no dia a dia. Conteúdo acessível, prático e adaptado à realidade de empresas e comunidades escolares." /><Lectures full /><Topics /><ContactCTA /></SiteLayout>; }

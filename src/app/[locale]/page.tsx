import { getDictionary } from "@/content";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LatencyLab from "@/components/LatencyLab";
import CaseStudies from "@/components/CaseStudies";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Craft from "@/components/Craft";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen overflow-x-hidden bg-base text-primary">
      <Nav nav={dict.nav} />
      <span id="top" className="sr-only" />

      <main>
        <Hero hero={dict.hero} />
        <LatencyLab lab={dict.lab} />
        <CaseStudies studies={dict.caseStudies} />
        <Experience experience={dict.experience} />
        <Projects projects={dict.projects} />
        <Craft craft={dict.craft} />
        <About about={dict.about} />
      </main>

      <Footer footer={dict.footer} />
      <Motion />
    </div>
  );
}

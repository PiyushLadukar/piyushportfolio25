import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import { Background } from "@/components/Background";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Achievements } from "@/sections/Achievements";
import { Volunteer } from "@/sections/Volunteer";
import { OpenSource } from "@/sections/OpenSource";
import { Contact } from "@/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Piyush Rajendra Ladukar — Full-Stack Engineer · AI · Backend" },
      {
        name: "description",
        content:
          "Portfolio of Piyush Rajendra Ladukar — Full-Stack Engineer building AI systems, backend platforms and civic-tech products (LokDrishti, AatankDrishti, Anomax).",
      },
      { name: "author", content: "Piyush Rajendra Ladukar" },
      { property: "og:title", content: "Piyush Rajendra Ladukar — Full-Stack Engineer" },
      { property: "og:description", content: "AI · Backend · Full-Stack. Cinematic portfolio, projects, experience and more." },
      { property: "og:image", content: "https://github.com/PiyushLadukar.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="relative">
      <Background />
      <Loader />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Volunteer />
      <OpenSource />
      <Contact />
      <Footer />
    </main>
  );
}

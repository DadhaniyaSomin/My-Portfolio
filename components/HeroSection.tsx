import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Linkedin, Github, Instagram } from "lucide-react";
import { BackgroundLines } from "@/components/ui/background-lines";

export const HeroSection = () => {
  return (
    <section id="home" role="banner" className="relative bg-background transition-colors duration-300">
      <BackgroundLines className="flex items-center justify-center w-full flex-col pt-24 min-h-screen bg-transparent">
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight tracking-tight font-[family-name:var(--font-geist-sans)] px-2">
            Hi, I'm Tushar
            <br />
            React Native & Flutter Developer
          </h1>

          <p className="text-lg md:text-2xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light font-[family-name:var(--font-geist-sans)] px-4">
            Building polished, high-performance mobile apps with React Native & Flutter. 2+ years of shipping production applications across fintech, AI, and IoT.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
            <a href="https://drive.google.com/file/d/1uYz2Y7rcRB-62QXZgwQw8UbfYG3YWu7j/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#ffd074] to-[#b087ff] hover:brightness-110 text-black px-8 py-3 font-bold font-[family-name:var(--font-geist-sans)] shadow-lg hover:shadow-[0_0_20px_rgba(255,208,116,0.3)] transition-all duration-300 rounded-full">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </a>
          </div>

          {/* Social Buttons - Mobile Only */}
          <div className="flex justify-center flex-wrap gap-4 mb-16 md:hidden px-4">
            <a href="https://github.com/tushar-2223" target="_blank" rel="noopener noreferrer" aria-label="Visit Tushar's GitHub profile" className="group p-3 bg-muted border border-border rounded-xl hover:border-primary transition-all duration-300">
              <Github className="h-6 w-6 text-foreground/50 group-hover:text-foreground transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/tushar2223" target="_blank" rel="noopener noreferrer" aria-label="Connect with Tushar on LinkedIn" className="group p-3 bg-muted border border-border rounded-xl hover:border-primary transition-all duration-300">
              <Linkedin className="h-6 w-6 text-foreground/50 group-hover:text-foreground transition-colors" />
            </a>
            <a href="https://www.instagram.com/tushar.p_22/" target="_blank" rel="noopener noreferrer" aria-label="Follow Tushar on Instagram" className="group p-3 bg-muted border border-border rounded-xl hover:border-primary transition-all duration-300">
              <Instagram className="h-6 w-6 text-foreground/50 group-hover:text-foreground transition-colors" />
            </a>
          </div>

          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-foreground/40 mx-auto" />
          </div>
        </div>
      </BackgroundLines>
    </section>
  );
};

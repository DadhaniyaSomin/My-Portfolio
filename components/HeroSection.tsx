import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export const HeroSection = () => {
  return (
    <section
      id="home"
      role="banner"
      className="relative min-h-screen flex flex-col justify-center items-center bg-[#050508] text-foreground overflow-hidden py-24 px-6 select-none"
    >
      {/* Top Small Label */}
      <div className="text-[10px] md:text-xs font-medium tracking-[0.25em] text-zinc-400 uppercase mb-8 md:mb-10 text-center">
        Crafting High-Performance Backend Services Since — 2022
      </div>

      {/* Main Title */}
      <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black text-center text-[#CCFF00] uppercase tracking-tighter leading-[0.85] sm:leading-[0.85] md:leading-[0.85] mb-10 md:mb-14 select-text">
        Somin
        <br />
        Dadhaniya
      </h1>

      {/* Sparkle Icon */}
      <div className="flex justify-center mb-10 md:mb-14">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 md:w-9 md:h-9 text-[#CCFF00] animate-[pulse_2s_infinite]"
        >
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      </div>

      {/* Description Text */}
      <p className="text-sm md:text-base text-zinc-400 max-w-xl text-center leading-relaxed px-4 mb-10 select-text">
        I'm <span className="font-bold text-white">Somin Dadhaniya</span> — A Software Engineer specializing in backend architecture. I translate complex business requirements into high-performance, robust systems, emphasizing technical clarity and sustainable solutions that make life easier for the entire team.
      </p>

      {/* Action Button */}
      <div className="flex justify-center items-center">
        <a
          href={process.env.NEXT_PUBLIC_RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button
            size="lg"
            className="bg-[#CCFF00] hover:bg-[#b8e600] text-black px-8 py-2.5 font-bold shadow-lg hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all duration-300 rounded-full text-xs md:text-sm uppercase tracking-wider"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </a>
      </div>
    </section>
  )
}

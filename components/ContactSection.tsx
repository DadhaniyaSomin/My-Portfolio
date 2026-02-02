"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardWithCorners } from "@/components/ui/card-with-corners"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Loader2, Instagram, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("https://api.counterapi.dev/v1/tusharpankhaniya/visits/up")
        const data = await response.json()
        setVisitorCount(data.count)
      } catch (error) {
        console.error("Error fetching visitor count:", error)
      }
    }
    fetchCount()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Message sent successfully!")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        toast.error("Failed to send message. Please try again later.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="pt-20 pb-10 bg-background relative flex items-center justify-center w-full overflow-hidden transition-colors duration-300">
      {/* Grid Background */}
      <div
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial gradient mask */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Bottom Fade Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/5 to-transparent z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            If you have any queries regarding my academic projects or would like to discuss them with me, please feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Info */}
          <div className="space-y-8 h-full">
            <CardWithCorners className="p-4 md:p-8 h-full">
              <h3 className="text-2xl font-bold text-foreground mb-6">Let's Connect</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#ffd074]/20 rounded-lg flex-shrink-0">
                    <Mail className="h-6 w-6 text-[#ffd074]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground font-medium">Email</p>
                    <p className="text-muted-foreground break-all">pankhaniyatushar9@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#b087ff]/20 rounded-lg flex-shrink-0">
                    <Phone className="h-6 w-6 text-[#b087ff]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground font-medium">Phone</p>
                    <p className="text-muted-foreground">+91 9313346569</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#ffd074]/20 rounded-lg flex-shrink-0">
                    <MapPin className="h-6 w-6 text-[#ffd074]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground font-medium">Location</p>
                    <p className="text-muted-foreground">Anand, Gujarat, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-foreground font-medium mb-4">Follow Me</p>
                <div className="flex space-x-4">
                  {/* TODO: Replace with your actual social media links */}
                  <a href="https://github.com/tushar-2223" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-lg hover:brightness-90 transition-all">
                    <Github className="h-5 w-5 text-foreground" />
                  </a>
                  <a href="https://www.linkedin.com/in/tushar2223" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-lg hover:brightness-90 transition-all">
                    <Linkedin className="h-5 w-5 text-foreground" />
                  </a>
                  <a href="https://www.instagram.com/tushar.p_22/" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-lg hover:brightness-90 transition-all">
                    <Instagram className="h-5 w-5 text-foreground" />
                  </a>
                </div>
              </div>
            </CardWithCorners>
          </div>

          {/* Contact Form */}
          <div className="h-full">
            <CardWithCorners className="p-4 md:p-8 h-full">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground/80 mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="bg-muted border-border text-foreground placeholder:text-foreground/40 focus:border-primary focus:ring-primary/20"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground/80 mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="bg-muted border-border text-foreground placeholder:text-foreground/40 focus:border-primary focus:ring-primary/20"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-muted border-border text-foreground placeholder:text-foreground/40 focus:border-[#b087ff] focus:ring-[#b087ff]/20"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Academic Project Inquiry"
                    className="bg-muted border-border text-foreground placeholder:text-foreground/40 focus:border-[#ffd074] focus:ring-[#ffd074]/20"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your query or project..."
                    rows={5}
                    className="bg-muted border-border text-foreground placeholder:text-foreground/40 focus:border-[#b087ff] focus:ring-[#b087ff]/20 resize-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-[#ffd074] to-[#b087ff] hover:brightness-110 text-black font-bold py-3" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardWithCorners>
          </div>
        </div>

        {/* Integrated Footer */}
        <div className="mt-12 w-full px-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border/60 to-transparent mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-0">
            <p className="text-muted-foreground text-sm order-2 md:order-1">
              © 2026 Tushar Pankhaniya. All rights reserved.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-6 order-1 md:order-2">
              {visitorCount !== null && (
                <div className="flex items-center bg-foreground/5 dark:bg-white/5 backdrop-blur-md border border-border dark:border-white/10 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.05)] group hover:border-emerald-500/40 transition-all duration-500">
                  <div className="relative flex h-2 w-2 mr-3">
                    <motion.span
                      animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                    />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                  </div>
                  <span className="text-foreground dark:text-white/90 font-medium tracking-tight whitespace-nowrap">
                    {visitorCount.toLocaleString()} <span className="text-muted-foreground dark:text-white/30 ml-1 font-normal text-xs uppercase tracking-widest">visitors</span>
                  </span>
                </div>
              )}

              <div className="flex items-center text-muted-foreground text-sm">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 mx-2 fill-current" />
                <span>and lots of coffee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

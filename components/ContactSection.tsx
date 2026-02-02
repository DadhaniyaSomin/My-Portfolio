"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardWithCorners } from "@/components/ui/card-with-corners"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Loader2, Instagram } from "lucide-react"
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
    <section id="contact" className="py-20 bg-background relative flex items-center justify-center w-full overflow-hidden transition-colors duration-300">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
      </div>
    </section>
  )
}

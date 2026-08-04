"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Copy,
  Check,
  Send,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "sdeshar9803@gmail.com",
    href: "mailto:sdeshar9803@gmail.com",
    copyable: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977 9847903839",
    href: "tel:+9779847903839",
    copyable: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/samyak-deshar-081917279",
    href: "https://www.linkedin.com/in/samyak-deshar-081917279/",
    copyable: false,
  },
];

export function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy } = useCopyToClipboard();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSending(true);
    setError(null);

    // Try the server API route first (works on Vercel/Node deployments).
    // If it fails (e.g. static hosting like GitHub Pages), fall back to
    // inserting directly into Supabase from the client.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
        reset();
        setTimeout(() => setSent(false), 5000);
        return;
      }
    } catch {
      // API route unavailable — fall through to direct Supabase insert.
    }

    // Direct Supabase insert (works on any static host).
    if (supabase) {
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert([{ name: data.name, email: data.email, message: data.message }]);

      if (insertError) {
        setError(
          "Could not send your message. Please email me directly at sdeshar9803@gmail.com."
        );
      } else {
        setSent(true);
        reset();
        setTimeout(() => setSent(false), 5000);
      }
    } else {
      setError(
        "Contact form is not configured. Please email me at sdeshar9803@gmail.com."
      );
    }

    setSending(false);
  };

  return (
    <section id="contact" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Me"
          description="Have a project in mind or want to collaborate? Let's build something intelligent together."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: contact info + map */}
          <div className="space-y-6">
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-card/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                  <info.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wide text-secondary">
                    {info.label}
                  </p>
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="block truncate text-sm font-medium text-white transition-colors hover:text-accent"
                  >
                    {info.value}
                  </a>
                </div>
                {info.copyable && (
                  <button
                    onClick={() => copy(info.value)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-secondary transition-all hover:border-white/30 hover:text-white"
                    aria-label={`Copy ${info.label}`}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                )}
              </motion.div>
            ))}

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl border border-white/8 bg-card/60"
            >
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-elevated to-card">
                <div className="relative flex items-center gap-3">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/20" />
                    <span className="relative flex h-4 w-4 rounded-full bg-white" />
                  </div>
                  <div className="text-left">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-white">
                      <MapPin className="h-4 w-4 text-accent" />
                      Kathmandu, Nepal
                    </p>
                    <p className="text-xs text-secondary">
                      Available for remote work
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/8 px-5 py-3 text-xs text-secondary">
                Based in Kathmandu, Nepal · Open to global opportunities
              </div>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl border border-white/8 bg-card/60 p-6 backdrop-blur-md md:p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-elevated text-sm font-medium text-white ring-1 ring-white/15 transition-all duration-300 hover:ring-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-accent"
                  >
                    <Check className="h-4 w-4" />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

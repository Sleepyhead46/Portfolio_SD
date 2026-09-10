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
  email: z.string().email("Please enter a valid email address"),
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
    label: "Phone / WhatsApp",
    value: "+977 9847903839",
    href: "tel:+9779847903839",
    copyable: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/samyak-deshar",
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

    // 1. Try server route
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
        setSending(false);
        return;
      }
    } catch {
      // Fall through to direct Supabase insert
    }

    // 2. Direct Supabase fallback
    if (supabase) {
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert([{ name: data.name, email: data.email, message: data.message }]);

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        setError(
          "Could not send your message. Please email directly at sdeshar9803@gmail.com."
        );
      } else {
        setSent(true);
        reset();
        setTimeout(() => setSent(false), 5000);
      }
    } else {
      setError(
        "Database is not initialized. Please send an email directly to sdeshar9803@gmail.com."
      );
    }

    setSending(false);
  };

  return (
    <section id="contact" className="relative px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          description="Have a data science project, an analytics challenge, or an exciting career opportunity? Let's talk."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Left: Contact Info */}
          <div className="space-y-4">
            {CONTACT_INFO.map((info, i) => (
              <div
                key={info.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-card p-4 sm:p-5 transition-all duration-200 hover:border-white/18"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300">
                    <info.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-secondary">
                      {info.label}
                    </p>
                    <a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="block truncate text-sm sm:text-base font-medium text-white transition-colors hover:underline"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>

                {info.copyable && (
                  <button
                    onClick={() => copy(info.value)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-zinc-400 transition-all hover:border-white/25 hover:text-white"
                    aria-label={`Copy ${info.label}`}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
              </div>
            ))}

            {/* Location & Status Card */}
            <div className="rounded-xl border border-white/8 bg-card p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Current Status
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-white font-semibold text-sm sm:text-base">
                <MapPin className="h-4 w-4 text-zinc-400" />
                <span>Kathmandu, Nepal (GMT+5:45)</span>
              </div>
              <p className="mt-1 text-xs text-secondary leading-relaxed">
                Open to full-time engineering roles, freelance contracts, and remote collaboration worldwide.
              </p>
            </div>
          </div>

          {/* Right: Clean Contact Form */}
          <div className="rounded-xl border border-white/8 bg-card p-6 sm:p-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-xs font-medium text-zinc-300">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="bg-white/[0.02] border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/10 text-white placeholder:text-zinc-500 rounded-lg h-10 text-xs sm:text-sm"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-rose-400">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-medium text-zinc-300">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@domain.com"
                  className="bg-white/[0.02] border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/10 text-white placeholder:text-zinc-500 rounded-lg h-10 text-xs sm:text-sm"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-medium text-zinc-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Describe your project, question, or opportunity..."
                  className="bg-white/[0.02] border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/10 text-white placeholder:text-zinc-500 rounded-lg resize-none text-xs sm:text-sm"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-rose-400">{errors.message.message}</p>
                )}
              </div>

              {/* Solid White Primary Button */}
              <button
                type="submit"
                disabled={sending}
                className="mt-1 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white text-xs sm:text-sm font-semibold text-black transition-colors hover:bg-zinc-200 active:scale-[0.99] disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-300"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>Message sent successfully! I will reply soon.</span>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-xs text-rose-300"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

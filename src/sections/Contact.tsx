import { motion } from "framer-motion";
import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiSend, FiCheck, FiAlertCircle, FiCopy } from "react-icons/fi";
import { PROFILE } from "@/constants/data";
import { SectionHeading } from "./About";
import { MagneticButton } from "@/components/MagneticButton";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      // FormSubmit.co — sends a real email to PROFILE.email, no backend needed.
      const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: `Portfolio contact from ${data.get("name")}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Contact"
          title={<>Let's <span className="text-gradient">build something</span> together</>}
        />
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Open to internships, full-time roles, and collaborative builds. Drop a message — it lands straight in my inbox, I usually reply within a day.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl glass p-7"
          >
            <h3 className="font-display text-xl font-semibold">Reach me directly</h3>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={copyEmail}
                className="group flex w-full items-center gap-3 rounded-2xl border border-border bg-background/60 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-aurora text-white shadow-glow"><FiMail /></span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                  <div className="truncate text-sm font-medium">{PROFILE.email}</div>
                </div>
                <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary">
                  {copied ? <FiCheck /> : <FiCopy />}
                </span>
              </button>
              <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-aurora text-white shadow-glow"><FiPhone /></span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
                  <div className="text-sm font-medium">{PROFILE.phone}</div>
                </div>
              </a>
              <div className="flex gap-3 pt-2">
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-2xl glass transition-all hover:-translate-y-0.5 hover:text-primary"><FiGithub /></a>
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-2xl glass transition-all hover:-translate-y-0.5 hover:text-primary"><FiLinkedin /></a>
                <a href={PROFILE.socials.email} className="grid h-11 w-11 place-items-center rounded-2xl glass transition-all hover:-translate-y-0.5 hover:text-primary"><FiMail /></a>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl glass p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" required />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <Field label="Message" name="message" textarea placeholder="What are you building?" required />

            {status === "sent" && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600">
                <FiCheck /> Message sent — I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
                <FiAlertCircle /> Something went wrong. Email me directly at {PROFILE.email}.
              </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Delivered straight to {PROFILE.email}
              </p>
              <MagneticButton type="submit" variant="primary">
                {status === "sending" ? "Sending…" : status === "sent" ? <><FiCheck /> Sent</> : <><FiSend /> Send Message</>}
              </MagneticButton>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const common =
    "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/20";
  return (
    <label className={`block ${textarea ? "mt-4" : ""}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={5} className={common} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={common} />
      )}
    </label>
  );
}

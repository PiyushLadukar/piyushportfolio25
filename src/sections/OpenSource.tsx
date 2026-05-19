import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { PROFILE } from "@/constants/data";
import { SectionHeading } from "./About";

export function OpenSource() {
  return (
    <section id="opensource" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Open Source" title={<>Building <span className="text-gradient">in the open</span></>} />

        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl glass p-7"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-aurora px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
              Contributor
            </div>
            <h3 className="font-display text-2xl font-semibold">Rajniti</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Contributing to <span className="font-medium text-foreground">Rajniti</span> — an open civic-tech platform focused on transparency and accountability in Indian politics.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-xs font-medium hover:text-primary"
              >
                <FiGithub /> View Profile
              </a>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-aurora px-4 py-2 text-xs font-medium text-white shadow-glow"
              >
                <FiExternalLink /> All Repos
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl glass p-7"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">GitHub Contributions</h3>
              <a
                href={`https://github.com/${PROFILE.username}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                @{PROFILE.username} ↗
              </a>
            </div>
            <div className="overflow-hidden rounded-xl bg-white/60 p-4">
              <img
                src={`https://ghchart.rshah.org/3b82f6/${PROFILE.username}`}
                alt={`${PROFILE.username} GitHub contributions`}
                loading="lazy"
                className="w-full"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Live contribution graph fetched directly from GitHub.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck, Minus, Plus } from "lucide-react";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  /** Optional booking link shown inside the answer. */
  cta?: { label: string; treatment?: string };
};

const DEFAULT_FAQS: Faq[] = [
  {
    id: "book",
    question: "How can I book an appointment?",
    answer:
      "Use the appointment request form to tell us what kind of care you need. The form is a demonstration and does not submit to a booking system.",
    cta: { label: "Request an appointment" },
  },
  {
    id: "first-visit",
    question: "What medical services do you provide?",
    answer:
      "General consultation, family medicine, paediatrics, cardiology, dermatology, laboratory and diagnostics, dental care, and women’s healthcare.",
  },
  {
    id: "packages",
    question: "Do I need an appointment before visiting?",
    answer:
      "We recommend requesting a visit so the team can help you plan. Contact information and opening hours on this demonstration page are placeholders.",
  },
  {
    id: "sessions",
    question: "Can I choose my preferred doctor?",
    answer:
      "You can request a preferred doctor in the appointment form. The team would confirm availability when responding to your request.",
  },
  {
    id: "sensitive",
    question: "What are the clinic opening hours?",
    answer:
      "The hours shown on this page are sample information and should be replaced with verified clinic hours.",
  },
  {
    id: "prepare",
    question: "Do you accept health insurance?",
    answer:
      "Insurance participation has not been specified for this fictional clinic. Confirm your coverage with your provider before a visit.",
  },
  {
    id: "change",
    question: "How can I access my medical records?",
    answer:
      "Contact a real clinic’s records team through a verified, secure channel. This demonstration website does not collect or store medical records.",
  },
  {
    id: "payment",
    question: "How can I contact the clinic?",
    answer:
      "Use the placeholder contact details in the contact section as a guide. Replace them with verified phone, email and location information before publishing.",
  },
];

type Props = {
  faqs?: Faq[];
  /** Where the booking links go. Treatment is added as ?treatment=. */
  bookingHref?: string;
};

const EASE = [0.2, 0.7, 0.1, 1] as const;

export function FaqSection({ faqs = DEFAULT_FAQS, bookingHref = "/#appointment" }: Props) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const reduce = useReducedMotion();
  const uid = useId();

  const href = (treatment?: string) => {
    if (!treatment) return bookingHref;

    const [path, hash] = bookingHref.split("#", 2);
    const query = `${path}${path.includes("?") ? "&" : "?"}treatment=${encodeURIComponent(treatment)}`;
    return hash ? `${query}#${hash}` : query;
  };

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-[#F8FAFC] py-20 text-[#102A43] sm:py-24 lg:py-32"
    >
      {/* Soft, quiet light behind the content */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-blue-100/55 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-teal-100/50 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Intro and booking prompt */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0D9488]">GOOD TO KNOW</p>
          <h2 className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            Questions, answered before you book
          </h2>
          <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-slate-600">
            Quick answers about appointments, services and what to expect from this demonstration clinic.
          </p>
          <Link
            href={href()}
            className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-[#2563EB] px-7 py-4 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
          >
            <CalendarCheck className="size-5 transition-transform duration-300 group-hover:-rotate-6" aria-hidden />
            Request an appointment
          </Link>
        </div>

        {/* Accordion */}
        <ul className="space-y-3">
          {faqs.map((faq) => {
            const open = openId === faq.id;
            const buttonId = `${uid}-${faq.id}-button`;
            const panelId = `${uid}-${faq.id}-panel`;

            return (
              <li
                key={faq.id}
                className={[
                  "rounded-2xl border transition-colors duration-300",
                  open
                    ? "border-blue-100 bg-white shadow-[0_18px_48px_-32px_rgba(16,42,67,0.35)]"
                    : "border-slate-200 bg-white/50 hover:border-blue-300",
                ].join(" ")}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] sm:px-8 sm:py-6"
                  >
                    <span className="font-serif text-2xl leading-snug text-[#102A43] sm:text-[1.7rem]">
                      {faq.question}
                    </span>
                    <span
                      className={[
                        "grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                        open
                          ? "border-[#2563EB] bg-[#2563EB] text-white"
                          : "border-slate-300 text-[#2563EB]",
                      ].join(" ")}
                    >
                      <span className="grid place-items-center">
                        {open ? <Minus className="size-5" aria-hidden /> : <Plus className="size-5" aria-hidden />}
                      </span>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: reduce ? 0 : 0.5, ease: EASE },
                        opacity: { duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.08 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-7 sm:px-8">
                        <p className="max-w-xl text-[1.05rem] leading-relaxed text-slate-600">
                          {faq.answer}
                        </p>
                        {faq.cta && (
                          <Link
                            href={href(faq.cta.treatment)}
                            className="mt-5 inline-flex items-center gap-2 border-b border-current pb-0.5 font-medium text-[#2563EB] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
                          >
                            <CalendarCheck className="size-4" aria-hidden />
                            {faq.cta.label}
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default FaqSection;

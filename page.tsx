"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Activity, ArrowDown, ArrowRight, ArrowUpRight, Baby, BriefcaseMedical,
  ChevronLeft, ChevronRight, Clock3, Dna, Heart, HeartPulse,
  Menu, Microscope, Phone, ShieldCheck, Sparkles, Stethoscope, UserRound,
  UsersRound, X, type LucideIcon,
} from "lucide-react";
import FaqSection, { type Faq } from "./FaqSection";
import { CONSULTATION_FEE_NGN } from "./lib/consultation";

const services: { name: string; description: string; Icon: LucideIcon }[] = [
  { name: "General consultation", description: "Thoughtful assessments and practical care plans for your everyday health.", Icon: Stethoscope },
  { name: "Family medicine", description: "Continuity of care for every generation of your family.", Icon: UsersRound },
  { name: "Paediatrics", description: "Gentle, attentive medical care for babies, children and young people.", Icon: Baby },
  { name: "Cardiology", description: "Heart health consultations and coordinated diagnostic care.", Icon: HeartPulse },
  { name: "Dermatology", description: "Expert support for skin, hair and nail health at every stage.", Icon: Sparkles },
  { name: "Laboratory & diagnostics", description: "Timely testing and clear explanations to support your care.", Icon: Microscope },
  { name: "Dental care", description: "Preventive and restorative dentistry in a calm, modern setting.", Icon: ShieldCheck },
  { name: "Women's healthcare", description: "Considered, confidential care for women's changing health needs.", Icon: Heart },
];

const doctors = [
  { name: "Dr. Amara Okafor", specialty: "Family Medicine", bio: "A warm, whole-person approach to the health of individuals and families.", image: "19596247" },
  { name: "Dr. Chinedu Balogun", specialty: "Cardiology", bio: "Focused on prevention, clear communication and long-term heart health.", image: "5452227" },
  { name: "Dr. Zainab Bello", specialty: "Paediatrics", bio: "Creating a reassuring space for young patients and their caregivers.", image: "5452256" },
  { name: "Dr. Tunde Adebayo", specialty: "Dermatology", bio: "Helping patients understand their skin with attentive, evidence-led care.", image: "12793736" },
];

const facilities = [
  { title: "A calm welcome", label: "RECEPTION", image: "photo-1629909613654-28e377c37b09", className: "md:col-span-7 md:row-span-2" },
  { title: "Room to feel at ease", label: "CONSULTATION ROOMS", image: "photo-1516549655169-df83a0774514", className: "md:col-span-5" },
  { title: "Thoughtful diagnostics", label: "DIAGNOSTIC LABORATORY", image: "photo-1579154204601-01588f351e67", className: "md:col-span-5" },
  { title: "A comfortable pause", label: "PATIENT WAITING LOUNGE", image: "photo-1519494026892-80bbd2d6fd0d", className: "md:col-span-5" },
  { title: "Carefully equipped", label: "MODERN MEDICAL EQUIPMENT", image: "photo-1584982751601-97dcc096659c", className: "md:col-span-5" },
  { title: "Care in a considered space", label: "EXAMINATION ROOMS", image: "photo-1551076805-e1869033e561", className: "md:col-span-5" },
];

const faqs: Faq[] = [
  { id: "appointment", question: "How can I book an appointment?", answer: "Submit your details and pay the ₦15,000 consultation fee securely through Paystack. FeeCare will contact you to agree an appointment time; payment alone does not confirm a booking." },
  { id: "services", question: "What medical services do you provide?", answer: "FeeCare is presented as a fictional demonstration clinic offering general consultation, family medicine, paediatrics, cardiology, dermatology, diagnostics, dental care and women's healthcare." },
  { id: "walk-in", question: "Do I need an appointment before visiting?", answer: "We recommend requesting an appointment so our team can help you plan your visit. Contact details and clinic hours on this demo page are placeholders." },
  { id: "doctor", question: "Can I choose your preferred doctor?", answer: "You can request a preferred doctor in the appointment form. The team would confirm availability when contacting you." },
  { id: "hours", question: "What are your clinic opening hours?", answer: "The hours shown in the contact section are sample information and should be replaced with verified clinic hours." },
  { id: "insurance", question: "Do you accept health insurance?", answer: "Insurance participation has not been specified for this fictional clinic. Please confirm coverage directly with your provider before a visit." },
  { id: "records", question: "How can I access my medical records?", answer: "For a real clinic, contact its records team through a verified, secure channel. This demonstration website does not collect or store medical records." },
  { id: "contact", question: "How can I contact the clinic?", answer: "Call or WhatsApp +2347088889999, email info@FeeCare.com, or visit Agric Estate, Ilorin, Kwara State, Nigeria." },
];

const testimonials = [
  { quote: "The team took time to listen and explained each step in a way I could understand. I felt considered throughout my visit.", name: "A clinic guest", detail: "DEMONSTRATION TESTIMONIAL" },
  { quote: "From the first conversation, I felt welcomed. The space is calm, and the care felt personal rather than rushed.", name: "A clinic guest", detail: "DEMONSTRATION TESTIMONIAL" },
  { quote: "Clear guidance and a kind team made what I expected to be a stressful appointment feel much easier.", name: "A clinic guest", detail: "DEMONSTRATION TESTIMONIAL" },
];

const fadeUp = { hidden: { opacity: 0, y: 42, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } };
const staggerContainer = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.08 } } };
const imageUrl = (id: string, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
const pexelsImageUrl = (id: string, width = 900) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

function SectionIntro({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={{ opacity: 0, y: reduce ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduce ? 0 : 0.65 }} className={`max-w-2xl ${light ? "text-white" : "text-[#102A43]"}`}>
      <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-teal-200" : "text-[#0D9488]"}`}>{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">{title}</h2>
      {copy && <p className={`mt-5 max-w-xl text-base leading-7 ${light ? "text-blue-50/75" : "text-slate-600"}`}>{copy}</p>}
    </motion.div>
  );
}

function AppointmentForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    setToday(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setError("Please review the required fields and correct any invalid entries.");
      return;
    }
    setError("");
    setSubmitting(true);
    const values = new FormData(form);
    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email: values.get("email"),
          phone: values.get("phone"),
          service: values.get("service"),
          doctor: values.get("doctor"),
          date: values.get("date"),
          time: values.get("time"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not start the payment.");
      window.location.assign(result.authorizationUrl);
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : "Could not start the payment. Please try again.");
      setSubmitting(false);
    }
  }

  const inputClass = "mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-[#102A43] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">Full name <span className="text-rose-600">*</span><input name="name" autoComplete="name" required minLength={2} className={inputClass} placeholder="Your full name" /></label>
        <label className="text-sm font-medium text-slate-700">Email address <span className="text-rose-600">*</span><input name="email" type="email" autoComplete="email" required className={inputClass} placeholder="you@example.com" /></label>
        <label className="text-sm font-medium text-slate-700">Phone number <span className="text-rose-600">*</span><input name="phone" type="tel" autoComplete="tel" required minLength={7} className={inputClass} placeholder="+2347088889999" /></label>
        <label className="text-sm font-medium text-slate-700">Preferred service <span className="text-rose-600">*</span><select name="service" required defaultValue="" className={inputClass}><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.name}>{service.name}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Preferred doctor<select name="doctor" defaultValue="Any available doctor" className={inputClass}><option>Any available doctor</option>{doctors.map((doctor) => <option key={doctor.name}>{doctor.name}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Preferred date <input name="date" type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} className={inputClass} /></label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">Preferred time<select name="time" defaultValue="Any time" className={inputClass}><option>Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">Anything else you’d like us to know?<textarea name="message" rows={4} maxLength={1000} className={inputClass} placeholder="Please do not include sensitive medical information." /></label>
      </div>
      {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
      <p className="rounded-lg bg-blue-50 p-4 text-sm leading-6 text-slate-600">Consultation fee: <strong className="text-[#102A43]">₦{CONSULTATION_FEE_NGN.toLocaleString("en-NG")}</strong>. Your contact and appointment preferences are sent to Paystack as transaction details. Do not include sensitive medical information in the optional message. Payment does not confirm an appointment; FeeCare will contact you to arrange a time.</p>
      <button type="submit" disabled={submitting} className="animate-feecare-glow inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-75">{submitting ? "Connecting to Paystack…" : `Pay ₦${CONSULTATION_FEE_NGN.toLocaleString("en-NG")} with Paystack`} {submitting ? <Clock3 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}</button>
    </form>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [reduce]);

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setContactSent(true);
  }

  const navLinks = [["About us", "about"], ["Services", "services"], ["Our doctors", "doctors"], ["Facilities", "facilities"], ["Contact", "contact"]];

  return (
    <main id="home" className="overflow-hidden bg-white text-[#1E293B]">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "bg-white/95 text-[#102A43] shadow-sm backdrop-blur-lg" : "bg-transparent text-white"}`}>
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" aria-label="FeeCare home" className="flex items-center gap-3">
            <span className={`grid size-10 place-items-center rounded-xl ${scrolled || menuOpen ? "bg-blue-50 text-[#2563EB]" : "bg-white/15 text-white"}`}><HeartPulse className="size-6" /></span>
            <span className="leading-tight"><span className="block font-serif text-xl font-semibold tracking-tight">FeeCare</span><span className={`block text-[0.58rem] font-semibold tracking-[0.15em] ${scrolled || menuOpen ? "text-slate-500" : "text-white/70"}`}>MEDICAL CENTRE</span></span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {navLinks.map(([label, id]) => <a key={id} href={`#${id}`} className={`text-sm transition-colors ${scrolled ? "text-slate-600 hover:text-[#2563EB]" : "text-white/90 hover:text-white"}`}>{label}</a>)}
          </nav>
          <a href="#appointment" className="hidden items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1D4ED8] lg:inline-flex">Book an appointment <ArrowUpRight className="size-4" /></a>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="grid size-10 place-items-center rounded-lg lg:hidden">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <AnimatePresence initial={false}>
          {menuOpen && <motion.nav id="mobile-navigation" aria-label="Mobile navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }} className="overflow-hidden border-t border-slate-100 bg-white px-5 text-[#102A43] lg:hidden">
            <div className="flex flex-col py-3">{navLinks.map(([label, id]) => <a key={id} onClick={() => setMenuOpen(false)} href={`#${id}`} className="border-b border-slate-100 py-4 text-sm">{label}</a>)}<a onClick={() => setMenuOpen(false)} href="#appointment" className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white">Book an appointment <ArrowRight className="size-4" /></a></div>
          </motion.nav>}
        </AnimatePresence>
      </header>

      <section className="relative flex min-h-[720px] items-center bg-[#102A43] pt-24 sm:min-h-[780px]">
        <Image src={imageUrl("photo-1739285452629-2672b13fa42d", 2400)} alt="Black Nigerian doctor speaking with a patient in a clinic" fill priority sizes="100vw" className="animate-feecare-image object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A2D]/90 via-[#102A43]/75 to-[#102A43]/25" />
        <motion.div aria-hidden className="animate-feecare-drift absolute -right-24 top-40 size-80 rounded-full border border-white/10" animate={reduce ? undefined : { rotate: 360, scale: [1, 1.08, 1] }} transition={reduce ? undefined : { rotate: { duration: 42, repeat: Infinity, ease: "linear" }, scale: { duration: 9, repeat: Infinity, ease: "easeInOut" }}} />
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative mx-auto w-full max-w-7xl px-5 py-24 text-white sm:px-8 lg:py-32">
          <div className="max-w-3xl">
            <motion.p variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide backdrop-blur"><motion.span animate={reduce ? undefined : { scale: [1, 1.45, 1], opacity: [1, 0.65, 1] }} transition={reduce ? undefined : { duration: 2, repeat: Infinity }} className="size-2 rounded-full bg-teal-300" /> ILORIN CARE THAT PUTS YOU FIRST</motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-7xl lg:text-[5.6rem]">Your health.<br /><span className="text-teal-200">Our priority.</span><br />Your future.</motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-xl text-base leading-7 text-blue-50/85 sm:text-lg sm:leading-8">Experience exceptional healthcare delivered with compassion, innovation and a commitment to your wellbeing.</motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <motion.a href="#appointment" whileHover={reduce ? undefined : { scale: 1.06 }} whileTap={reduce ? undefined : { scale: 0.94 }} className="animate-feecare-glow inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-500">Book an appointment <ArrowRight className="size-4" /></motion.a>
              <motion.a href="#services" whileHover={reduce ? undefined : { y: -4 }} whileTap={reduce ? undefined : { scale: 0.95 }} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-white/40 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">Explore our services <ArrowDown className="size-4" /></motion.a>
            </motion.div>
            <div className="mt-12 grid max-w-2xl gap-5 border-t border-white/20 pt-6 sm:grid-cols-3">
              {[["Experienced", "medical professionals"], ["Comprehensive", "healthcare services"], ["Always", "patient-centred care"]].map(([large, small]) => <motion.div key={small} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} whileHover={{ y: -6, scale: 1.04 }}><p className="font-serif text-xl text-white">{large}</p><p className="mt-1 text-xs text-blue-50/65">{small}</p></motion.div>)}
            </div>
          </div>
        </motion.div>
        <div className="absolute bottom-0 right-0 hidden items-center gap-3 rounded-tl-xl bg-white px-6 py-4 text-xs font-medium text-[#102A43] md:flex"><Clock3 className="size-4 text-[#0D9488]" /> Here for your health, every day</div>
      </section>

      <section id="about" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} transition={{ duration: reduce ? 0 : 0.6 }} className="relative">
            <div className="relative aspect-[0.95] overflow-hidden rounded-[2rem] bg-blue-50 sm:aspect-[1.12]"><Image src={imageUrl("photo-1739285452644-3a2c009112fe", 1400)} alt="Black Nigerian doctor and patient speaking together at an Ilorin clinic" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
            <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 right-4 max-w-[230px] rounded-2xl bg-white p-5 shadow-xl sm:-right-6 sm:p-6"><span className="grid size-11 place-items-center rounded-xl bg-[#F0FDFA] text-[#0D9488]"><Heart className="size-5" /></span><p className="mt-4 font-semibold text-[#102A43]">Care that sees the whole person</p><p className="mt-1 text-xs leading-5 text-slate-500">Your health story matters to us.</p></motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.08 }}>
            <SectionIntro eyebrow="About FeeCare" title="Good medicine begins with listening." copy="We believe the best care feels both expert and human. FeeCare brings thoughtful clinicians, modern facilities and a welcoming approach together around you." />
            <p className="mt-5 leading-7 text-slate-600">From your first conversation to the next step in your care, we take the time to understand what matters to you. Our fictional clinic is designed around clear communication, coordinated support and respect for every patient.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">{[[Heart, "Compassionate care"], [ShieldCheck, "Medical excellence"], [Activity, "Modern healthcare"]].map(([Icon, label]) => { const ValueIcon = Icon as LucideIcon; return <motion.div key={label as string} whileHover={{ y: -8, rotate: -1, scale: 1.03 }} transition={{ type: "spring", stiffness: 320, damping: 18 }} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"><motion.span animate={reduce ? undefined : { rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }} transition={reduce ? undefined : { duration: 4, repeat: Infinity, delay: 0.2 }}><ValueIcon className="size-5 text-[#0D9488]" /></motion.span><p className="mt-3 text-sm font-semibold text-[#102A43]">{label as string}</p></motion.div>; })}</div>
            <a href="#doctors" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-blue-800">Meet the team <ArrowRight className="size-4" /></a>
          </motion.div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 bg-[#EFF6FF] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionIntro eyebrow="Care under one roof" title="Healthcare for every chapter." copy="A considered range of services, delivered by people who take the time to understand you." /><motion.a href="#appointment" whileHover={{ x: 6 }} className="inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-[#2563EB]">Request a visit <ArrowRight className="size-4" /></motion.a></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(({ name, description, Icon }, index) => <motion.a key={name} href="#appointment" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : (index % 4) * 0.05 }} whileHover={reduce ? undefined : { y: -10, scale: 1.025, rotate: index % 2 ? 0.6 : -0.6 }} whileTap={reduce ? undefined : { scale: 0.97 }} className="group rounded-2xl border border-blue-100/80 bg-white p-6 shadow-[0_5px_24px_rgba(16,42,67,0.035)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"><span className="grid size-12 place-items-center rounded-xl bg-[#EFF6FF] text-[#2563EB] transition-colors group-hover:bg-[#2563EB] group-hover:text-white"><Icon className="size-6" /></span><h3 className="mt-5 text-lg font-semibold text-[#102A43]">{name}</h3><p className="mt-2 min-h-[4.5rem] text-sm leading-6 text-slate-600">{description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">Request this service <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></motion.a>)}</div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#102A43] via-[#123C58] to-[#0D5D66] px-5 py-20 sm:px-8 sm:py-28">
        <div className="animate-feecare-drift absolute -left-28 -top-28 size-96 rounded-full border border-white/10" /><div className="animate-feecare-float-delayed absolute -bottom-40 right-0 size-[30rem] rounded-full bg-teal-300/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><SectionIntro light eyebrow="Why choose FeeCare" title="Expert care. A more human experience." copy="The details of your care matter. We bring clinical skill and genuine attention together at every step." />
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">{[[BriefcaseMedical, "Experienced professionals", "A multidisciplinary team focused on considered, coordinated care."], [Heart, "Patient-centred approach", "We listen first and shape care around your needs and preferences."], [Dna, "Modern facilities", "Thoughtfully designed spaces support a comfortable visit."], [Clock3, "Convenient scheduling", "Appointment requests make it easier to plan your next step."], [UserRound, "Personal attention", "Clear conversations and respect for your time and privacy."], [ShieldCheck, "Commitment to quality", "We value safe, evidence-informed care and continuous improvement."]].map(([Icon, title, copy], index) => { const ValueIcon = Icon as LucideIcon; return <motion.div key={title as string} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : index * 0.1 }} whileHover={{ x: 8 }} className="flex gap-4"><motion.span animate={reduce ? undefined : { y: [0, -5, 0], rotate: [0, 8, 0] }} transition={reduce ? undefined : { duration: 3, repeat: Infinity, delay: index * 0.2 }} className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-teal-200"><ValueIcon className="size-5" /></motion.span><div><h3 className="font-semibold text-white">{title as string}</h3><p className="mt-2 text-sm leading-6 text-blue-50/70">{copy as string}</p></div></motion.div>; })}</div>
        </div>
      </section>

      <section id="doctors" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><SectionIntro eyebrow="Meet your care team" title="Good people. Thoughtful care." copy="Get to know the fictional clinicians who make up our demonstration team." /><span className="text-xs leading-5 text-slate-500">Names, biographies and credentials are fictional sample content. Verify all details before publication.</span></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{doctors.map((doctor, index) => <motion.article key={doctor.name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.12 }} whileHover={reduce ? undefined : { y: -10, scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.97 }} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"><div className="relative aspect-[0.88] overflow-hidden bg-blue-50"><Image src={pexelsImageUrl(doctor.image, 900)} alt={`Portrait of ${doctor.name}, fictional Black Nigerian ${doctor.specialty} clinician`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" /><span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-medium text-[#102A43]">DEMO PROFILE</span></div><div className="p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0D9488]">{doctor.specialty}</p><h3 className="mt-2 font-serif text-2xl text-[#102A43]">{doctor.name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{doctor.bio}</p><a href="#appointment" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">Request a visit <ArrowRight className="size-4" /></a></div></motion.article>)}</div>
        </div>
      </section>

      <section id="facilities" className="scroll-mt-20 bg-[#F8FAFC] px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-7xl"><div className="mb-12"><SectionIntro eyebrow="A place to feel at ease" title="Designed around your comfort." copy="Explore a fictional glimpse of the welcoming spaces and clinical facilities imagined for FeeCare." /></div><div className="grid gap-5 md:grid-cols-12 md:grid-rows-2">{facilities.map((facility) => <motion.article key={facility.title} initial={{ opacity: 0, y: 45, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.1 }} whileHover={reduce ? undefined : { scale: 1.025 }} whileTap={reduce ? undefined : { scale: 0.97 }} className={`group relative min-h-[260px] overflow-hidden rounded-2xl bg-[#102A43] ${facility.className}`}><Image src={imageUrl(facility.image, 1400)} alt={facility.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-[#071A2D]/80 via-transparent to-transparent" /><div className="absolute bottom-0 left-0 p-6 text-white sm:p-8"><p className="text-[0.65rem] font-semibold tracking-[0.17em] text-teal-200">{facility.label}</p><h3 className="mt-2 font-serif text-2xl sm:text-3xl">{facility.title}</h3></div></motion.article>)}</div></div></section>

      <section id="appointment" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20"><div><SectionIntro eyebrow="Your next step" title="Request an appointment." copy="Share a few details and let us know what kind of care you’re looking for. Complete your appointment details and pay the consultation fee securely through Paystack. Payment does not confirm an appointment; FeeCare will contact you to arrange a time." /><div className="mt-8 space-y-5 border-t border-slate-200 pt-6"><div className="flex gap-4"><span className="grid size-10 place-items-center rounded-xl bg-[#EFF6FF] text-[#2563EB]"><Phone className="size-5" /></span><div><p className="text-sm font-semibold text-[#102A43]">Prefer to speak with us?</p><p className="mt-1 text-sm text-slate-500">Call +2347088889999 </p></div></div><div className="flex gap-4"><span className="grid size-10 place-items-center rounded-xl bg-[#F0FDFA] text-[#0D9488]"><Clock3 className="size-5" /></span><div><p className="text-sm font-semibold text-[#102A43]">Sample opening hours</p><p className="mt-1 text-sm text-slate-500">Monday–Friday, 8:00 am–6:00 pm</p></div></div></div></div><div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_16px_50px_rgba(16,42,67,0.08)] sm:p-8"><AppointmentForm /></div></div></section>

      <section className="bg-[#EFF6FF] px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-5xl text-center"><p className="text-xs font-semibold tracking-[0.2em] text-[#0D9488]">PATIENT STORIES</p><div className="mt-8 flex justify-center gap-1 text-amber-500" aria-label="Demonstration rating, not verified"><span aria-hidden>★★★★★</span></div><AnimatePresence mode="wait"><motion.div key={testimonialIndex} initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -12 }} transition={{ duration: reduce ? 0 : 0.25 }}><blockquote className="mx-auto mt-5 max-w-4xl font-serif text-3xl leading-snug text-[#102A43] sm:text-4xl">“{testimonials[testimonialIndex].quote}”</blockquote><p className="mt-7 text-sm font-semibold text-[#102A43]">{testimonials[testimonialIndex].name}</p><p className="mt-1 text-[0.65rem] font-medium tracking-[0.14em] text-slate-500">{testimonials[testimonialIndex].detail} · NOT A VERIFIED PATIENT REVIEW</p></motion.div></AnimatePresence><div className="mt-7 flex items-center justify-center gap-3"><button type="button" aria-label="Previous testimonial" onClick={() => setTestimonialIndex((index) => (index + testimonials.length - 1) % testimonials.length)} className="grid size-10 place-items-center rounded-full border border-blue-200 text-[#2563EB] transition hover:bg-white"><ChevronLeft className="size-5" /></button><span className="text-xs tabular-nums text-slate-500">{testimonialIndex + 1} / {testimonials.length}</span><button type="button" aria-label="Next testimonial" onClick={() => setTestimonialIndex((index) => (index + 1) % testimonials.length)} className="grid size-10 place-items-center rounded-full border border-blue-200 text-[#2563EB] transition hover:bg-white"><ChevronRight className="size-5" /></button></div></div></section>

      <FaqSection faqs={faqs} bookingHref="/#appointment" />

      <section id="contact" className="scroll-mt-20 bg-[#F8FAFC] px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div><SectionIntro eyebrow="We’re here to help" title="Let’s start a conversation." copy="Reach out with a question or find your way to our Ilorin clinic. Visit us in Ilorin, Kwara State, Nigeria, or reach us by phone or email." /><div className="mt-9 space-y-6"><p className="flex gap-4 text-sm leading-6 text-slate-600"><Phone className="mt-0.5 size-5 shrink-0 text-[#0D9488]" />+2347088889999 </p><p className="flex gap-4 text-sm leading-6 text-slate-600"><BriefcaseMedical className="mt-0.5 size-5 shrink-0 text-[#0D9488]" /><a href="mailto:info@FeeCare.com" className="underline-offset-4 hover:underline">info@FeeCare.com</a> </p><p className="flex gap-4 text-sm leading-6 text-slate-600"><Activity className="mt-0.5 size-5 shrink-0 text-[#0D9488]" />Agric Estate, Ilorin, Kwara State, Nigeria </p></div><div className="mt-8 flex flex-wrap gap-3"><a href="tel:+2347088889999" className="inline-flex items-center gap-2 rounded-lg bg-[#0D9488] px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700"><Phone className="size-4" /> Call FeeCare</a><a href="https://wa.me/2347088889999" className="inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-white px-4 py-3 text-sm font-semibold text-[#0D766E] hover:bg-teal-50">Chat on WhatsApp <ArrowUpRight className="size-4" /></a></div></div>
          <div className="grid gap-5"><div className="min-h-[250px] overflow-hidden rounded-2xl border border-slate-200 bg-[#E2E8F0]"><iframe title="Map showing Agric Estate, Ilorin, Kwara State" src="https://maps.google.com/maps?q=Agric%20Estate%20Ilorin%20Kwara%20State%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed" className="h-full min-h-[250px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><form onSubmit={handleContact} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">{contactSent ? <p role="status" className="rounded-lg bg-[#F0FDFA] p-4 text-sm leading-6 text-[#0D766E]">Demo only: your message hasn’t been sent. Connect a secure contact service before launch.</p> : <><h3 className="font-serif text-2xl text-[#102A43]">Send an enquiry</h3><p className="mt-2 text-xs leading-5 text-slate-500">Do not include private medical information. This form does not transmit or store data.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-xs font-medium text-slate-600">Name<input required minLength={2} name="contact-name" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" /></label><label className="text-xs font-medium text-slate-600">Email<input required type="email" name="contact-email" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" /></label><label className="text-xs font-medium text-slate-600 sm:col-span-2">Message<textarea required minLength={5} name="contact-message" rows={3} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" /></label></div><button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#102A43] px-5 py-3 text-sm font-semibold text-white hover:bg-[#163A5C]" type="submit">Send enquiry <ArrowRight className="size-4" /></button></>}</form></div>
        </div></section>

      <footer className="bg-[#102A43] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1fr]"><div><a href="#home" className="inline-flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-white/10 text-teal-200"><HeartPulse className="size-6" /></span><span><span className="block font-serif text-xl">FeeCare</span><span className="block text-[0.58rem] tracking-[0.15em] text-white/60">MEDICAL CENTRE</span></span></a><p className="mt-5 max-w-xs text-sm leading-6 text-blue-50/65">Compassionate, considered healthcare for every chapter of life.</p></div><div><h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-teal-200">EXPLORE</h3><div className="flex flex-col gap-3 text-sm text-blue-50/75">{navLinks.map(([label, id]) => <a key={id} href={`#${id}`} className="hover:text-white">{label}</a>)}</div></div><div><h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-teal-200">OUR SERVICES</h3><div className="flex flex-col gap-3 text-sm text-blue-50/75">{services.slice(0, 5).map((service) => <a key={service.name} href="#services" className="hover:text-white">{service.name}</a>)}</div></div><div><h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-teal-200">CONTACT</h3><div className="flex flex-col gap-3 text-sm text-blue-50/75"><a href="mailto:info@FeeCare.com" className="hover:text-white">info@FeeCare.com</a><a href="tel:+2347088889999" className="hover:text-white">+2347088889999</a><p>Agric Estate, Ilorin, Kwara State, Nigeria</p></div></div></div><div className="flex flex-col justify-between gap-4 pt-6 text-xs text-blue-50/45 sm:flex-row"><span>© {new Date().getFullYear()} FEECARE MEDICAL CENTRE</span><div className="flex gap-5"><a href="#contact" className="hover:text-white">Contact</a></div></div></div></footer>
    </main>
  );
}

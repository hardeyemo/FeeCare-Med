const focusStyle = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]";

export const buttonStyles = {
  primary: `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-md disabled:cursor-wait disabled:opacity-60 ${focusStyle}`,
  hero: `inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-xl ${focusStyle}`,
  heroOutline: `inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-white/40 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15 ${focusStyle}`,
  dark: `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#102A43] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#163A5C] hover:shadow-md ${focusStyle}`,
  teal: `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0D9488] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-md ${focusStyle}`,
  outline: `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-teal-200 bg-white px-4 py-3 text-sm font-semibold text-[#0D766E] transition hover:-translate-y-0.5 hover:bg-teal-50 ${focusStyle}`,
  icon: `grid size-10 place-items-center rounded-lg transition hover:bg-blue-50 hover:text-[#2563EB] ${focusStyle}`,
  carousel: `grid size-10 place-items-center rounded-full border border-blue-200 text-[#2563EB] transition hover:bg-white hover:shadow-sm ${focusStyle}`,
  accordion: `flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left transition-colors hover:bg-blue-50/40 ${focusStyle} sm:px-8 sm:py-6`,
};

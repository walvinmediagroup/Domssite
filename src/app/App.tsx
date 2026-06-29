import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, ArrowRight, ArrowUp, Phone, Mail, MapPin, Clock,
  Star, CheckCircle, ChevronDown, ChevronUp, FileText,
  Building2, Calculator, Receipt, PieChart, BarChart3,
  Briefcase, TrendingUp, Users, Cloud, Wrench, Stethoscope,
  ShoppingBag, Coffee, Laptop, Globe, Award, Shield, Zap,
  MessageCircle, Quote, Send, ExternalLink, Building,
  Heart, BadgeCheck, Layers
} from "lucide-react";

type Page = "home" | "about" | "services" | "industries" | "pricing" | "testimonials" | "faq" | "contact";

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Services", page: "services" },
  { label: "Industries", page: "industries" },
  { label: "Pricing", page: "pricing" },
  { label: "Testimonials", page: "testimonials" },
  { label: "FAQ", page: "faq" },
  { label: "Contact", page: "contact" },
];

const SERVICES = [
  {
    icon: FileText,
    title: "Self Assessment Tax Returns",
    description:
      "We handle your annual self assessment from start to finish — ensuring you never miss a deadline, claim every allowable expense, and always pay the right amount of tax.",
    benefits: ["Avoid HMRC penalties", "Maximise your allowances", "Claim all eligible expenses", "Stress-free filing"],
    ideal: "Sole traders, freelancers, landlords, and anyone with income outside PAYE.",
  },
  {
    icon: Building2,
    title: "Limited Company Accounts",
    description:
      "Full statutory accounts preparation and filing with Companies House and HMRC. We keep your company compliant, with clear reports you can actually understand.",
    benefits: ["Companies House filing", "HMRC compliance", "Director's report", "Dividend calculations"],
    ideal: "Limited company directors of any size, from new start-ups to established SMEs.",
  },
  {
    icon: Calculator,
    title: "Bookkeeping",
    description:
      "Accurate, up-to-date bookkeeping so you always know where your business stands financially. We take the day-to-day admin off your plate completely.",
    benefits: ["Real-time financial visibility", "Expense categorisation", "Bank reconciliation", "Monthly reporting"],
    ideal: "Business owners who want clean, accurate records without the admin burden.",
  },
  {
    icon: Receipt,
    title: "VAT Returns",
    description:
      "Timely, accurate VAT returns prepared and filed on your behalf. We ensure you stay compliant with Making Tax Digital and recover all the VAT you're entitled to.",
    benefits: ["Making Tax Digital compliant", "Quarterly submissions", "VAT reclaim maximised", "Penalty protection"],
    ideal: "VAT-registered businesses of all sizes and VAT schemes.",
  },
  {
    icon: PieChart,
    title: "Corporation Tax",
    description:
      "We calculate and submit your annual corporation tax return, identify every available relief, and help you plan ahead to minimise your liability.",
    benefits: ["CT600 submission", "Capital allowances", "R&D tax credits (where applicable)", "Tax planning advice"],
    ideal: "Limited companies of all sizes looking to manage their corporation tax effectively.",
  },
  {
    icon: Building,
    title: "Construction Industry Scheme (CIS)",
    description:
      "Expert CIS management for both contractors and subcontractors. We handle registrations, monthly returns, and ensure you claim back every penny you're owed.",
    benefits: ["CIS registration support", "Monthly CIS returns", "Subcontractor verifications", "CIS rebates"],
    ideal: "Contractors, subcontractors, and construction businesses of all trades.",
  },
  {
    icon: BarChart3,
    title: "Management Accounts",
    description:
      "Regular management accounts give you the financial intelligence to make smarter business decisions. Clear, concise reports that tell the real story of your business.",
    benefits: ["Monthly or quarterly reports", "P&L and balance sheet", "Cash flow forecasting", "KPI tracking"],
    ideal: "Growing businesses that need timely financial data to drive decisions.",
  },
  {
    icon: Briefcase,
    title: "Company Formation",
    description:
      "Starting a limited company? We'll handle everything — incorporation, registered office, HMRC registration, and getting your new business off to the right start.",
    benefits: ["Companies House incorporation", "HMRC registration", "Registered office address", "Initial set-up advice"],
    ideal: "Entrepreneurs, sole traders converting to limited, and new business owners.",
  },
  {
    icon: TrendingUp,
    title: "Tax Planning",
    description:
      "Proactive tax planning to legally reduce your tax bill. We work with you year-round to structure your affairs efficiently and keep more money in your pocket.",
    benefits: ["Legal tax minimisation", "Salary & dividend planning", "Pension contributions", "Year-end planning"],
    ideal: "Business owners and self-employed professionals wanting to pay less tax, legally.",
  },
  {
    icon: Users,
    title: "Business Advisory",
    description:
      "Beyond the numbers — we act as a trusted business partner, offering practical advice on growth, profitability, and making your business the best it can be.",
    benefits: ["Business performance reviews", "Growth strategy support", "Cashflow advice", "Profit improvement"],
    ideal: "Ambitious business owners who want more than just compliance from their accountant.",
  },
  {
    icon: Cloud,
    title: "QuickBooks Cloud Accounting",
    description:
      "As a QuickBooks Certified ProAdvisor, we set up and manage your cloud accounting software so your finances are always accurate, accessible, and ready for tax time.",
    benefits: ["QuickBooks setup & training", "Cloud-based access", "Real-time reporting", "Seamless tax integration"],
    ideal: "Any business ready to move their accounting to the cloud for maximum efficiency.",
  },
];

const INDUSTRIES = [
  {
    icon: Wrench,
    title: "Trades",
    description:
      "Builders, plumbers, electricians, and decorators. We keep you CIS compliant, manage your books, and make sure you claim every tool and material as an expense.",
  },
  {
    icon: Building,
    title: "Construction",
    description:
      "From one-man bands to small construction firms. We handle CIS returns, subcontractor payments, and give you a clear picture of project profitability.",
  },
  {
    icon: Briefcase,
    title: "Consultants",
    description:
      "IT consultants, management consultants, and professional advisors. We help you structure your business tax-efficiently and stay IR35 aware.",
  },
  {
    icon: Laptop,
    title: "Freelancers",
    description:
      "Designers, writers, developers, and creatives. We handle your self assessment, track your expenses, and let you focus on the work you love.",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description:
      "Bricks-and-mortar and online retailers. We handle your VAT, bookkeeping, and accounts so you can focus on selling, not spreadsheets.",
  },
  {
    icon: Coffee,
    title: "Hospitality",
    description:
      "Cafés, restaurants, and catering businesses. We manage the financial side of a complex, high-turnover industry with precision and care.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description:
      "Dentists, therapists, care workers, and private practitioners. We understand the unique tax implications of healthcare businesses and keep you compliant.",
  },
  {
    icon: Award,
    title: "Professional Services",
    description:
      "Solicitors, architects, and other professionals. We provide the reliable financial management that lets you focus on serving your clients.",
  },
  {
    icon: Globe,
    title: "Online Businesses",
    description:
      "E-commerce stores, digital agencies, and SaaS businesses. We handle multi-channel VAT, digital sales tax, and cloud accounting to keep you ahead.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    business: "SM Consulting Ltd",
    rating: 5,
    review:
      "DXW Accounting has completely transformed how I manage my finances. Professional, thorough, and always available when I need them. Switching was the best business decision I made this year.",
    photo: "photo-1494790108377-be9c29b29330",
    date: "November 2024",
  },
  {
    name: "James Hartley",
    business: "Hartley Building Services",
    rating: 5,
    review:
      "Finally found an accountant who truly understands the construction industry. CIS returns are handled perfectly every month, and they saved me a significant amount on my last tax return.",
    photo: "photo-1560250097-0dc05ae61600",
    date: "October 2024",
  },
  {
    name: "Priya Sharma",
    business: "Freelance Graphic Designer",
    rating: 5,
    review:
      "As a freelancer, I was drowning in paperwork. DXW made everything so simple. My self assessment is done in no time, and I feel completely confident my finances are in order.",
    photo: "photo-1487412720507-e7ab37603c6f",
    date: "September 2024",
  },
  {
    name: "Tom Clarke",
    business: "Clarke Retail Ltd",
    rating: 5,
    review:
      "Switched from a larger firm and couldn't be happier. Personal service, fast responses, transparent pricing, and they actually explain things in plain English. Highly recommended.",
    photo: "photo-1472099645785-5658abf4ff4e",
    date: "December 2024",
  },
  {
    name: "Emma Watts",
    business: "Watts Therapy Practice",
    rating: 5,
    review:
      "I was nervous about getting an accountant for my private practice, but DXW made it incredibly easy. Professional, reassuring, and always on top of deadlines. I wouldn't go anywhere else.",
    photo: "photo-1438761681033-6461ffad8d80",
    date: "August 2024",
  },
  {
    name: "Ryan O'Brien",
    business: "OB Digital Marketing",
    rating: 5,
    review:
      "QuickBooks setup was seamless, and now I can see exactly where my business stands at any point. The management accounts reports are clear and genuinely useful for planning.",
    photo: "photo-1463453091185-61582044d556",
    date: "January 2025",
  },
];

const FAQ_ITEMS = [
  {
    q: "How much do your services cost?",
    a: "We tailor our fees to your specific circumstances rather than a one-size-fits-all approach. Pricing depends on your business type, turnover, and the services you need. Contact us for a free, no-obligation personalised quote — there are no hidden fees and we always agree costs upfront.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes — DXW Accounting is a fully remote practice serving clients across England. We use secure cloud-based software and email, phone, and video calls to deliver a personal, efficient service wherever you are in the country.",
  },
  {
    q: "Can you help me deal with HMRC?",
    a: "Absolutely. We handle all HMRC correspondence on your behalf, from routine submissions to enquiries and investigations. Our experience means we can navigate HMRC processes confidently and protect your best interests.",
  },
  {
    q: "Can I switch to you from another accountant?",
    a: "Yes, switching is straightforward and we handle the entire process for you. We'll contact your previous accountant for professional clearance and obtain your records — making the transition completely seamless with minimal disruption.",
  },
  {
    q: "Do you support QuickBooks?",
    a: "Yes — we are a QuickBooks Certified ProAdvisor. We can set up your QuickBooks account, provide training, and manage your bookkeeping within the software. We also work with other popular accounting platforms.",
  },
  {
    q: "How quickly do you respond to queries?",
    a: "We pride ourselves on fast response times. We aim to respond to all enquiries within one business day, and for urgent matters we're usually much quicker. You'll always have a direct line to someone who knows your account.",
  },
  {
    q: "Can you help me start a new limited company?",
    a: "Yes — company formation is one of our services. We'll incorporate your company through Companies House, register it with HMRC for Corporation Tax, and advise you on the best structure and set-up to minimise your tax from day one.",
  },
];

const VALUES = [
  { icon: Heart, label: "Honesty", desc: "We tell you what you need to hear, not just what you want to hear. Always." },
  { icon: BadgeCheck, label: "Accuracy", desc: "Precision in everything we do. Your numbers are always correct." },
  { icon: Shield, label: "Reliability", desc: "Deadlines are never missed. You can count on us, every single time." },
  { icon: MessageCircle, label: "Communication", desc: "Plain English, fast responses, and always available when you need us." },
  { icon: Layers, label: "Transparency", desc: "No hidden fees, no surprises. You always know exactly what you're paying." },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return count;
}

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Primitives ─────────────────────────────────────────────────────────────────

function OrangeBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-widest uppercase rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
      {children}
    </span>
  );
}

function SectionHeader({
  badge,
  title,
  subtitle,
  center = false,
}: {
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 lg:mb-16 ${center ? "text-center" : ""}`}>
      {badge && (
        <div className={`mb-4 ${center ? "flex justify-center" : ""}`}>
          <OrangeBadge>{badge}</OrangeBadge>
        </div>
      )}
      <h2 className="text-foreground mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-muted-foreground text-lg leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group">
      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/40 group-hover:shadow-orange-500/60 transition-shadow">
        <span className="text-white font-black text-xs tracking-tight leading-none">DXW</span>
      </div>
      <div className="leading-none">
        <div className="text-white font-bold text-base tracking-wide font-[Manrope]">DXW</div>
        <div className="text-white/40 text-[9px] tracking-[0.25em] uppercase font-semibold">Accounting</div>
      </div>
    </button>
  );
}

function StarRow({ n = 5 }: { n?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
      ))}
    </div>
  );
}

function PrimaryBtn({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

function GhostBtn({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

// ── Navigation ─────────────────────────────────────────────────────────────────

function Nav({ current, nav }: { current: Page; nav: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (page: Page) => {
    nav(page);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F1115]/95 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo onClick={() => go("home")} />

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  current === l.page
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <PrimaryBtn onClick={() => go("contact")} className="hidden sm:inline-flex px-5 py-2.5 text-sm">
              Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </PrimaryBtn>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#181C23]/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.page}
                  onClick={() => go(l.page)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    current === l.page
                      ? "text-orange-400 bg-orange-500/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <PrimaryBtn onClick={() => go("contact")} className="w-full mt-2">
                Get a Free Quote
              </PrimaryBtn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer({ nav }: { nav: (p: Page) => void }) {
  const go = (page: Page) => {
    nav(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SocialIcon = ({ href, label, path }: { href: string; label: string; path: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-orange-500/20 hover:text-orange-400 text-white/50 transition-all duration-200 border border-white/5 hover:border-orange-500/20"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d={path} />
      </svg>
    </a>
  );

  return (
    <footer className="bg-[#0A0D11] border-t border-white/5 mt-0">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo onClick={() => go("home")} />
            <p className="text-white/50 text-sm leading-relaxed mt-4 mb-6">
              Simple Accounting. Trusted Advice. Serving businesses across England, fully remote.
            </p>
            <div className="flex items-center gap-2">
              <SocialIcon
                href="https://facebook.com"
                label="Facebook"
                path="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
              <SocialIcon
                href="https://linkedin.com"
                label="LinkedIn"
                path="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
              <SocialIcon
                href="https://instagram.com"
                label="Instagram"
                path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
              />
              <SocialIcon
                href="https://twitter.com"
                label="X (Twitter)"
                path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.726-8.832L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
              <SocialIcon
                href="https://wa.me/447510057761"
                label="WhatsApp"
                path="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.099 1.523 5.826L0 24l6.29-1.494A11.927 11.927 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.367l-.36-.213-3.727.885.898-3.637-.234-.374A9.818 9.818 0 012.182 12C2.182 6.574 6.574 2.182 12 2.182S21.818 6.574 21.818 12 17.426 21.818 12 21.818z"
              />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => go(l.page)}
                    className="text-white/50 hover:text-orange-400 text-sm transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Services</h4>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <button
                    onClick={() => go("services")}
                    className="text-white/50 hover:text-orange-400 text-sm transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:07510057761" className="flex items-center gap-2.5 text-white/50 hover:text-orange-400 text-sm transition-colors group">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  07510 057761
                </a>
              </li>
              <li>
                <a href="mailto:info@dxwaccounting.co.uk" className="flex items-center gap-2.5 text-white/50 hover:text-orange-400 text-sm transition-colors">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  info@dxwaccounting.co.uk
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                Remote across England
              </li>
              <li className="flex items-start gap-2.5 text-white/50 text-sm">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                Open to enquiries 24/7
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© 2025 DXW Accounting. All rights reserved. Registered in England.</p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map((t) => (
              <button key={t} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Home Page ────────────────────────────────────────────────────────────────

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView();
  const count = useCountUp(value, 1800, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-black text-white mb-1 font-[Manrope]">
        {count}{suffix}
      </div>
      <div className="text-white/50 text-sm">{label}</div>
    </div>
  );
}

function HomePage({ nav }: { nav: (p: Page) => void }) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&h=1080&fit=crop&auto=format"
            alt="Professional accountant working remotely"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115] via-[#0F1115]/85 to-[#0F1115]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent" />
        </div>
        {/* Glow */}
        <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <OrangeBadge>Level 4 AAT Qualified • QuickBooks Certified ProAdvisor</OrangeBadge>
            <h1 className="mt-6 mb-6 text-white leading-[1.1]">
              Accounting Made <span className="text-orange-400">Simple</span> for UK Businesses
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
              Professional accounting services for sole traders, freelancers and limited companies. Helping you stay compliant while you focus on growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryBtn onClick={() => nav("contact")} className="px-8 py-4 text-base">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </PrimaryBtn>
              <GhostBtn onClick={() => nav("contact")} className="px-8 py-4 text-base">
                Book a Free Consultation
              </GhostBtn>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/5 bg-[#181C23]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              "10+ Years Experience",
              "Level 4 AAT Qualified",
              "QuickBooks Certified ProAdvisor",
              "Fully Remote Across England",
              "Fast Response Times",
              "No Hidden Fees",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-white/70 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <SectionHeader
          badge="Services"
          title={<>Everything Your Business <span className="text-orange-400">Needs</span></>}
          subtitle="From day-to-day bookkeeping to complex tax planning — we cover every aspect of your business finances."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => nav("services")}
                className="text-left p-5 rounded-2xl bg-card border border-border hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="text-white font-semibold text-sm leading-snug mb-1">{s.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{s.description}</p>
              </motion.button>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <PrimaryBtn onClick={() => nav("services")}>
            View All Services <ArrowRight className="w-4 h-4" />
          </PrimaryBtn>
        </div>
      </section>

      {/* Why DXW */}
      <section className="bg-[#181C23]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <SectionHeader
            badge="Why Choose Us"
            title={<>The DXW <span className="text-orange-400">Difference</span></>}
            subtitle="We're not just number crunchers — we're your dedicated financial partner."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Personal Service", desc: "You'll always deal with the same person who knows your business inside out. No call centres, no being passed around." },
              { icon: Shield, title: "Transparent Pricing", desc: "Fixed fees agreed upfront with absolutely no hidden extras. You always know what you're paying before we start." },
              { icon: Zap, title: "Fast Response Times", desc: "We pride ourselves on speed. Queries are answered promptly — usually the same day, always within 24 hours." },
              { icon: Award, title: "Expert Advice", desc: "Level 4 AAT qualified with 10+ years of experience. You're in safe, professional hands from day one." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-7 rounded-3xl bg-card border border-border hover:border-orange-500/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: 10, suffix: "+", label: "Years Experience" },
            { value: 100, suffix: "%", label: "Remote Service" },
            { value: 24, suffix: "/7", label: "Enquiry Support" },
            { value: 5, suffix: "★", label: "Customer Satisfaction" },
          ].map((s) => (
            <div
              key={s.label}
              className="py-10 px-6 rounded-3xl bg-card border border-border text-center relative overflow-hidden group hover:border-orange-500/20 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <StatItem value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials preview */}
      <section className="bg-[#181C23]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <SectionHeader
            badge="Testimonials"
            title={<>Trusted by <span className="text-orange-400">Businesses</span> Across England</>}
            subtitle="Don't just take our word for it — here's what our clients say."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          <div className="text-center mt-10">
            <GhostBtn onClick={() => nav("testimonials")}>
              Read All Reviews <ArrowRight className="w-4 h-4" />
            </GhostBtn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-orange-500/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <OrangeBadge>Ready to Get Started?</OrangeBadge>
          <h2 className="mt-6 mb-4 text-white">
            Ready to Simplify Your <span className="text-orange-400">Accounting?</span>
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Get your free consultation today. No pressure, no obligation — just honest advice from a qualified professional.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryBtn onClick={() => nav("contact")} className="px-8 py-4 text-base">
              Get Started Today <ArrowRight className="w-5 h-5" />
            </PrimaryBtn>
            <a href="tel:07510057761" className="inline-flex items-center gap-2 text-white/60 hover:text-orange-400 transition-colors font-semibold">
              <Phone className="w-5 h-5" />
              07510 057761
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="p-6 rounded-3xl bg-card border border-border hover:border-orange-500/20 transition-all duration-300 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <StarRow n={t.rating} />
        <div className="flex items-center gap-1 text-white/30 text-xs">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google Review
        </div>
      </div>
      <p className="text-white/70 text-sm leading-relaxed mb-5 flex-1">&ldquo;{t.review}&rdquo;</p>
      <div className="flex items-center gap-3">
        <img
          src={`https://images.unsplash.com/${t.photo}?w=80&h=80&fit=crop&auto=format`}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover bg-secondary"
        />
        <div>
          <div className="text-white font-semibold text-sm">{t.name}</div>
          <div className="text-white/40 text-xs">{t.business}</div>
        </div>
        <div className="ml-auto text-white/30 text-xs">{t.date}</div>
      </div>
    </div>
  );
}

// ── About Page ────────────────────────────────────────────────────────────────

function AboutPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <OrangeBadge>About DXW Accounting</OrangeBadge>
            <h1 className="mt-6 mb-6 text-white">Your Dedicated <span className="text-orange-400">Financial Partner</span></h1>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                DXW Accounting was founded on a simple belief: small businesses deserve the same quality of accounting advice as large corporations — delivered in plain English, at a fair and transparent price.
              </p>
              <p>
                With over 10 years of hands-on experience supporting UK businesses of all sizes, I understand the real pressures that sole traders, freelancers, and limited company directors face every day. Tax compliance, cash flow, staying on top of deadlines — I take all of that off your plate.
              </p>
              <p>
                As a Level 4 AAT Qualified accountant and QuickBooks Certified ProAdvisor, I combine professional expertise with a genuinely personal approach. When you work with DXW, you get direct access to me — not a rotating team of juniors.
              </p>
              <p>
                Operating fully remotely across England, I use the latest cloud accounting technology to provide a seamless, efficient service wherever you are. You can reach me any time, and I pride myself on always responding fast.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <PrimaryBtn onClick={() => nav("contact")}>
                Work With Me <ArrowRight className="w-4 h-4" />
              </PrimaryBtn>
              <GhostBtn onClick={() => nav("services")}>
                Our Services
              </GhostBtn>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1560250097-0dc05ae61600?w=600&h=700&fit=crop&auto=format"
              alt="DXW Accounting professional"
              className="relative w-full rounded-3xl object-cover aspect-[4/5] bg-secondary"
            />
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#0F1115]/90 backdrop-blur-md border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "10+", label: "Years Experience" },
                  { value: "AAT", label: "Level 4 Qualified" },
                  { value: "QB", label: "Certified ProAdvisor" },
                  { value: "24/7", label: "Available for Enquiries" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-orange-400 font-black text-xl font-[Manrope]">{s.value}</div>
                    <div className="text-white/50 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#181C23]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <SectionHeader
            badge="Our Values"
            title={<>What We Stand <span className="text-orange-400">For</span></>}
            subtitle="Our values aren't just words on a page — they guide every interaction we have with our clients."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.label} className="p-6 rounded-2xl bg-card border border-border text-center hover:border-orange-500/20 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h4 className="text-white font-bold mb-2">{v.label}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-white mb-4">Ready to Work Together?</h2>
        <p className="text-white/60 mb-8">Get in touch today for a free, no-obligation consultation.</p>
        <PrimaryBtn onClick={() => nav("contact")} className="px-8 py-4">
          Start the Conversation <ArrowRight className="w-5 h-5" />
        </PrimaryBtn>
      </section>
    </div>
  );
}

// ── Services Page ─────────────────────────────────────────────────────────────

function ServicesPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="pt-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 text-center">
        <OrangeBadge>What We Offer</OrangeBadge>
        <h1 className="mt-6 mb-4 text-white">
          Services Tailored to <span className="text-orange-400">Your Business</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          From sole trader tax returns to full limited company accounts — we handle every aspect of your business finances.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 lg:pb-28 space-y-8">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05 * (i % 4) }}
              className="rounded-3xl bg-card border border-border hover:border-orange-500/20 transition-all duration-300 p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-white font-bold">{s.title}</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed mb-6">{s.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {s.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                        <span className="text-white/70 text-sm">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="p-5 rounded-2xl bg-[#0F1115]/60 border border-white/5 mb-5">
                    <div className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">Ideal For</div>
                    <p className="text-white/60 text-sm leading-relaxed">{s.ideal}</p>
                  </div>
                  <PrimaryBtn onClick={() => nav("contact")} className="w-full justify-center">
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </PrimaryBtn>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}

// ── Industries Page ───────────────────────────────────────────────────────────

function IndustriesPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="pt-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 text-center">
        <OrangeBadge>Industries Served</OrangeBadge>
        <h1 className="mt-6 mb-4 text-white">
          We Understand Your <span className="text-orange-400">Industry</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Every industry has unique financial challenges. We have the experience to navigate yours.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.05 * (i % 3) }}
                className="p-7 rounded-3xl bg-card border border-border hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{ind.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{ind.description}</p>
                <button
                  onClick={() => nav("contact")}
                  className="inline-flex items-center gap-1.5 text-orange-400 text-sm font-semibold hover:gap-2.5 transition-all"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 p-10 lg:p-14 rounded-3xl bg-card border border-border text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
          <div className="relative">
            <h2 className="text-white mb-4">Don't See Your Industry?</h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              We work with businesses across all sectors. Get in touch to discuss your specific accounting needs.
            </p>
            <PrimaryBtn onClick={() => nav("contact")} className="px-8 py-4">
              Contact Us Today <ArrowRight className="w-5 h-5" />
            </PrimaryBtn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Pricing Page ──────────────────────────────────────────────────────────────

function PricingPage({ nav }: { nav: (p: Page) => void }) {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for sole traders and freelancers getting started.",
      features: [
        "Self Assessment Tax Return",
        "Basic Bookkeeping",
        "HMRC correspondence",
        "Email & phone support",
        "Annual accounts review",
      ],
      highlight: false,
    },
    {
      name: "Growth",
      description: "Ideal for limited companies and growing sole traders.",
      features: [
        "Everything in Starter",
        "Limited Company Accounts",
        "Corporation Tax",
        "Quarterly VAT Returns",
        "Management Accounts",
        "Payroll (up to 5 employees)",
      ],
      highlight: true,
    },
    {
      name: "Complete",
      description: "Full-service accounting for established businesses.",
      features: [
        "Everything in Growth",
        "Monthly Management Accounts",
        "CIS Management",
        "Tax Planning",
        "Business Advisory",
        "Unlimited support",
        "QuickBooks setup & training",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="pt-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 text-center">
        <OrangeBadge>Transparent Pricing</OrangeBadge>
        <h1 className="mt-6 mb-4 text-white">
          Simple, <span className="text-orange-400">Honest</span> Pricing
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          No hidden fees. No nasty surprises. Fixed monthly options available. Personalised quotes tailored to your exact needs.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 lg:pb-28">
        {/* Pricing pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Shield, label: "No Hidden Fees", desc: "All costs agreed upfront, no surprises." },
            { icon: TrendingUp, label: "Fixed Monthly Options", desc: "Spread the cost with predictable monthly fees." },
            { icon: CheckCircle, label: "Transparent Pricing", desc: "You see exactly what you pay for." },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.label} className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{p.label}</div>
                  <div className="text-white/50 text-xs">{p.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-orange-500/15 to-orange-500/5 border-orange-500/40 shadow-2xl shadow-orange-500/10"
                  : "bg-card border-border hover:border-orange-500/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg shadow-orange-500/30">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-2xl font-black mb-1 font-[Manrope] ${plan.highlight ? "text-orange-400" : "text-white"}`}>
                  {plan.name}
                </h3>
                <p className="text-white/50 text-sm">{plan.description}</p>
              </div>
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="text-white font-semibold">Contact for a personalised quote</div>
                <div className="text-white/40 text-xs mt-1">Tailored to your business needs</div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <PrimaryBtn
                onClick={() => nav("contact")}
                className={`w-full justify-center ${!plan.highlight ? "bg-white/10 hover:bg-white/20 shadow-none" : ""}`}
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </PrimaryBtn>
            </div>
          ))}
        </div>

        <div className="text-center p-8 rounded-3xl bg-card border border-border">
          <p className="text-white/60 mb-1">Not sure which package fits? We'll help you choose.</p>
          <p className="text-white/40 text-sm mb-6">All packages are flexible and customisable to your exact requirements.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryBtn onClick={() => nav("contact")}>
              Request a Free Quote <ArrowRight className="w-4 h-4" />
            </PrimaryBtn>
            <a href="tel:07510057761" className="inline-flex items-center gap-2 text-white/60 hover:text-orange-400 transition-colors font-medium text-sm">
              <Phone className="w-4 h-4" /> Call: 07510 057761
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Testimonials Page ──────────────────────────────────────────────────────────

function TestimonialsPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="pt-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <OrangeBadge>Client Reviews</OrangeBadge>
            <h1 className="mt-6 mb-4 text-white">
              What Our Clients <span className="text-orange-400">Say</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl">
              Real reviews from real clients. We let our work speak for itself.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border shrink-0 text-center">
            <div className="flex justify-center mb-2">
              <StarRow />
            </div>
            <div className="text-4xl font-black text-white font-[Manrope]">5.0</div>
            <div className="text-white/50 text-sm mt-1">Based on Google Reviews</div>
            <div className="flex items-center justify-center gap-1 mt-3">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-white/50 text-xs">Google Reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>

        {/* Leave a review CTA */}
        <div className="p-10 lg:p-14 rounded-3xl bg-card border border-border text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
          <div className="relative">
            <div className="flex justify-center mb-4">
              <StarRow />
            </div>
            <h2 className="text-white mb-3">Happy With Our Service?</h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Reviews help other business owners find us. If we've helped your business, we'd love to hear about it.
            </p>
            <a
              href="https://g.page/r/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0F1115] font-bold rounded-2xl hover:bg-white/90 transition-all hover:shadow-xl active:scale-95"
            >
              Leave a Google Review <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FAQ Page ──────────────────────────────────────────────────────────────────

function FAQPage({ nav }: { nav: (p: Page) => void }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="pt-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 text-center">
        <OrangeBadge>FAQs</OrangeBadge>
        <h1 className="mt-6 mb-4 text-white">
          Frequently Asked <span className="text-orange-400">Questions</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Got a question? We've answered the most common ones below. If you don't see yours, just ask.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 lg:pb-28">
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i ? "bg-card border-orange-500/30" : "bg-card border-border hover:border-white/15"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-semibold text-base transition-colors ${open === i ? "text-orange-400" : "text-white"}`}>
                  {item.q}
                </span>
                <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open === i ? "bg-orange-500/20 text-orange-400 rotate-180" : "bg-white/5 text-white/40"}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-card border border-border text-center">
          <h3 className="text-white font-bold mb-2">Still have a question?</h3>
          <p className="text-white/60 text-sm mb-6">We're here to help. Get in touch and we'll get back to you quickly.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryBtn onClick={() => nav("contact")}>
              Contact Us <ArrowRight className="w-4 h-4" />
            </PrimaryBtn>
            <a href="tel:07510057761" className="inline-flex items-center gap-2 text-white/60 hover:text-orange-400 transition-colors text-sm font-medium">
              <Phone className="w-4 h-4" /> 07510 057761
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Contact Page ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const InputCls =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all duration-200 text-sm";

  return (
    <div className="pt-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="text-center mb-14">
          <OrangeBadge>Get In Touch</OrangeBadge>
          <h1 className="mt-6 mb-4 text-white">
            Let's Talk About Your <span className="text-orange-400">Business</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Get a free, no-obligation consultation. We'll listen, understand your needs, and explain exactly how we can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-3xl bg-card border border-border">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-white/60">
                    Thank you for getting in touch. We'll respond within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/70 text-sm font-medium mb-2">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={InputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm font-medium mb-2">Business Name</label>
                      <input
                        type="text"
                        placeholder="Smith & Co Ltd"
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                        className={InputCls}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/70 text-sm font-medium mb-2">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={InputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="07700 000000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={InputCls}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">Service Required</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className={InputCls + " [&>option]:bg-[#181C23]"}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Other">Other / Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your business and what you need help with..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={InputCls + " resize-none"}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <PrimaryBtn className="flex-1 justify-center py-4">
                      Send Message <Send className="w-4 h-4" />
                    </PrimaryBtn>
                    <a
                      href="tel:07510057761"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all text-sm"
                    >
                      <Phone className="w-4 h-4 text-orange-400" />
                      Request Callback
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {[
              { icon: Phone, label: "Phone", value: "07510 057761", href: "tel:07510057761" },
              { icon: Mail, label: "Email", value: "info@dxwaccounting.co.uk", href: "mailto:info@dxwaccounting.co.uk" },
              { icon: MapPin, label: "Location", value: "Remote across England", href: null },
              { icon: Clock, label: "Availability", value: "Open to enquiries 24/7", href: null },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-white font-medium text-sm">{item.value}</div>
                  </div>
                </div>
              );
              return (
                <div key={item.label} className="p-5 rounded-2xl bg-card border border-border hover:border-orange-500/20 transition-colors">
                  {item.href ? (
                    <a href={item.href} className="block hover:opacity-80 transition-opacity">
                      {content}
                    </a>
                  ) : content}
                </div>
              );
            })}

            {/* England map visual */}
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&h=300&fit=crop&auto=format"
                alt="London aerial view — DXW Accounting serves all of England remotely"
                className="w-full h-40 object-cover opacity-60"
              />
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-400" />
                  <span className="text-white/70 text-sm font-medium">Serving all of England remotely</span>
                </div>
                <p className="text-white/40 text-xs mt-1">
                  Wherever you are in England, we can help. Fully remote, fully professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Floating elements ─────────────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/447510057761"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20c15a] flex items-center justify-center shadow-2xl shadow-black/30 hover:shadow-[#25D366]/30 transition-all hover:scale-110 active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 w-10 h-10 rounded-full bg-white/10 hover:bg-orange-500/20 backdrop-blur-md border border-white/10 hover:border-orange-500/30 flex items-center justify-center text-white/60 hover:text-orange-400 transition-all"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function CookieBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem("dxw_cookies") === "1"; } catch { return false; }
  });
  if (dismissed) return null;
  const dismiss = () => {
    try { localStorage.setItem("dxw_cookies", "1"); } catch {}
    setDismissed(true);
  };
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#181C23]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-white/60 text-sm flex-1">
          We use cookies to improve your experience. By continuing to use this site you agree to our{" "}
          <button className="text-orange-400 hover:underline">Cookie Policy</button>.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={dismiss} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-sm rounded-xl hover:bg-white/10 transition-colors">
            Decline
          </button>
          <button onClick={dismiss} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">
            Accept Cookies
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const nav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav current={page} nav={nav} />

      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {page === "home" && <HomePage nav={nav} />}
          {page === "about" && <AboutPage nav={nav} />}
          {page === "services" && <ServicesPage nav={nav} />}
          {page === "industries" && <IndustriesPage nav={nav} />}
          {page === "pricing" && <PricingPage nav={nav} />}
          {page === "testimonials" && <TestimonialsPage nav={nav} />}
          {page === "faq" && <FAQPage nav={nav} />}
          {page === "contact" && <ContactPage />}
        </motion.main>
      </AnimatePresence>

      <Footer nav={nav} />
      <WhatsAppButton />
      <BackToTop />
      <CookieBanner />
    </div>
  );
}

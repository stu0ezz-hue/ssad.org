import { useLang } from "../contexts/LanguageContext";
import { BiText, Wordmark } from "./ui";

export function Footer() {
  const { t } = useLang();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#programs", label: t.nav.programs },
    { href: "#areas", label: t.nav.areas },
    { href: "#impact", label: t.nav.impact },
    { href: "#contact", label: t.nav.contact },
  ];

  const supportLinks = [
    { href: "#cta", label: t.footer.support.donate },
    { href: "#contact", label: t.footer.support.volunteer },
    { href: "#contact", label: t.footer.support.partner },
  ];

  return (
    <footer className="bg-navy-900 text-white/85" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Wordmark light />
            <p className="mt-6 text-white/70 leading-relaxed text-[15px] max-w-md">
              <BiText value={t.footer.description} />
            </p>

            <div className="mt-6 flex gap-3">
              {[
                { name: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { name: "Instagram", d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" },
                { name: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" },
                { name: "YouTube", d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-gold-300 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.d} />
                    {s.name === "Instagram" && <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />}
                    {s.name === "LinkedIn" && <circle cx="4" cy="4" r="2" />}
                    {s.name === "YouTube" && <path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-white font-bold text-[15px] tracking-tight mb-5">
              <BiText value={t.footer.navTitle} />
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-gold-300 transition-colors text-[14.5px]"
                  >
                    <BiText value={link.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-[15px] tracking-tight mb-5">
              <BiText value={t.footer.supportTitle} />
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-gold-300 transition-colors text-[14.5px]"
                  >
                    <BiText value={link.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            <BiText value={t.footer.copyright} />
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href="#" className="text-white/60 hover:text-gold-300 transition-colors">
              <BiText value={t.footer.legal.privacy} />
            </a>
            <a href="#" className="text-white/60 hover:text-gold-300 transition-colors">
              <BiText value={t.footer.legal.terms} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

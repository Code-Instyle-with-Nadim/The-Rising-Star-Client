import Link from 'next/link';
import React from 'react';
import { NewsletterForm } from './home/newsletter-form';
import { BrandLogo } from './layout/brand-logo';
import { getCategoryHref } from "@/lib/studio-constants"

const footerColumns = [
  {
    heading: "Explore",
    links: [
      { label: "All studios", href: "/Explore-Studios" },
      { label: "Photo studios", href: getCategoryHref("Photo Studio") },
      { label: "Podcast rooms", href: getCategoryHref("Podcast Lounge") },
      { label: "Music suites", href: getCategoryHref("Music Suite") },
    ],
  },
  {
    heading: "For hosts",
    links: [
      { label: "List your space", href: "/add-studio?new=1" },
      { label: "Manage listings", href: "/my-listings" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Our story", href: "/#about" },
    ],
  },
]

const socials = [
  { label: "IG", name: "Instagram", href: "#footer" },
  { label: "FB", name: "Facebook", href: "#footer" },
  { label: "X", name: "X", href: "#footer" },
]

const Footer = () => {
  return (
    <div>
       <footer id="footer" className="bg-footer text-footer-foreground">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1.1fr]">
            <div>
              <BrandLogo />

              <p className="mt-5 max-w-xs text-sm leading-6 text-footer-foreground/65">
                Good ideas deserve a great space. Find the room, tools and
                atmosphere to bring your next big thing to life.
              </p>

              <div className="mt-6 flex items-center gap-2">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="grid size-9 place-items-center rounded-full border border-footer-foreground/20 text-[10px] font-semibold transition hover:border-brand hover:bg-brand hover:text-brand-foreground"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.heading}>
                <p className="text-sm font-semibold">{column.heading}</p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-footer-foreground/65 transition hover:text-footer-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-sm font-semibold">Stay in the creative loop</p>
              <p className="mt-3 text-sm leading-6 text-footer-foreground/65">
                Fresh spaces and inspiration, occasionally.
              </p>

              <NewsletterForm />

              <p className="mt-3 text-[10px] text-footer-foreground/45">
                By subscribing you agree to our updates.
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-footer-foreground/15 pt-6 text-[11px] text-footer-foreground/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 The Rising Star. Made for the makers.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="#" className="transition hover:text-footer-foreground">
                Terms
              </Link>
              <span aria-hidden>·</span>
              <Link href="#" className="transition hover:text-footer-foreground">
                Privacy
              </Link>
              <span aria-hidden>·</span>
              <span>Crafted for creativity</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
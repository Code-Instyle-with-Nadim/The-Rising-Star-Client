import Link from "next/link";
import React from "react";
import { NewsletterForm } from "./home/newsletter-form";
import { BrandLogo } from "./layout/brand-logo";
import { getCategoryHref } from "@/lib/studio-constants";
import { Icon } from "@iconify/react";

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
];

const socials = [
  {
    name: "Instagram",
    Icon: <i className="fa-brands fa-instagram"></i>,
    href: "#footer",
  },
  {
    name: "Facebook",
    Icon: <i className="fa-brands fa-facebook"></i>,
    href: "#footer",
  },
  {
    name: "X",
    Icon: <i className="fa-brands fa-x-twitter"></i>,
    href: "#footer",
  },
];

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
                <div className="socials flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/md-nadimul-866a6937b/"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/md.nadimul.2693"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    className="text-2xl"
                    href="https://x.com/MNadimul81543"
                    aria-label="X"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="lucide lucide-x-twitter"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </a>
                </div>
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
              <Link
                href="#"
                className="transition hover:text-footer-foreground"
              >
                Terms
              </Link>
              <span aria-hidden>·</span>
              <Link
                href="#"
                className="transition hover:text-footer-foreground"
              >
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

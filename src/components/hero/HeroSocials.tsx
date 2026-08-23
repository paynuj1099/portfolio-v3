import { Mail } from "lucide-react";
import { portfolio } from "@/config/portfolio";
const links = [
  { label: "GitHub", href: portfolio.socials.github, icon: GithubIcon, external: true },
  { label: "LinkedIn", href: portfolio.socials.linkedin, icon: LinkedinIcon, external: true },
  { label: "Email", href: `mailto:${portfolio.socials.email}`, icon: Mail, external: false },
];
function GithubIcon({ size = 20 }: { size?: number }) { return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.57-.29-5.28-1.29-5.28-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>; }
function LinkedinIcon({ size = 20 }: { size?: number }) { return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.41v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.1 20.45H3.54V8.98H7.1v11.47Z" /></svg>; }
export function HeroSocials() { return <div className="socials"><span>{portfolio.hero.socialsLabel}</span><i />{links.map(({ label, href, icon: Icon, external }) => <a href={href} key={label} aria-label={label} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}><Icon size={21} /></a>)}</div>; }

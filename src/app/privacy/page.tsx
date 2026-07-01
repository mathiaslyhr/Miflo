import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy — Miflo",
  description: "How Miflo handles your data. Short version: barely any of it.",
};

const LAST_UPDATED = "30 June 2026";

// TODO: replace "Miflo" with the registered legal name/entity once confirmed.
const CONTROLLER = "Miflo";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-10">
      <h2 className="flex items-baseline gap-3 text-xl font-medium tracking-tight">
        <span aria-hidden className="h-4 w-0.5 shrink-0 rounded bg-accent" />
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

const GLANCE = [
  { title: "No account", body: "Anonymous sign-in. No name, email, or phone." },
  { title: "No tracking", body: "No ads, no analytics, no ATT prompt." },
  { title: "No device access", body: "No camera, contacts, photos, or location." },
  { title: "Delete on request", body: "Email us and your data is removed." },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero header */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[340px] w-[640px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
          />
          <div className="relative mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
            <p className="text-sm font-medium text-accent-ink/80">Privacy</p>
            <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted">Last updated {LAST_UPDATED}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed">
              Miflo is built to need as little of your data as possible. There
              are no user accounts, no tracking, and no advertising. This page
              explains exactly what the app and this website do with information.
            </p>
          </div>
        </section>

        {/* At a glance */}
        <section className="mx-auto w-full max-w-3xl px-6 pt-12">
          <div className="grid gap-3 sm:grid-cols-2">
            {GLANCE.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-card border border-divider bg-surface/50 p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12.5l4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <article className="mx-auto w-full max-w-3xl px-6 pb-20 pt-12">
          <Section id="no-account" title="No account, no personal sign-up">
            <p>
              You don&apos;t create an account to use Miflo. When you open the
              app it signs in anonymously and stores a random device identifier
              on your phone so it can keep your nickname and reconnect you to a
              game room. We never ask for your name, email, phone number, or
              other personal details.
            </p>
          </Section>

          <Section id="what-we-store" title="What we store">
            <p>
              To run multiplayer games, our backend (Supabase, acting as a data
              processor on our behalf) stores:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                The game rooms you create or join (a room code, the anonymous
                player ids in the room, and scores).
              </li>
              <li>
                Game results used for your in-app stats (games played, wins,
                best score), tied to your anonymous device identifier.
              </li>
              <li>
                The nickname you choose, so other players in your room can see
                who&apos;s who.
              </li>
              <li>
                Any feedback you send us through the app or this website,
                including the message and which category you picked.
              </li>
            </ul>
          </Section>

          <Section id="what-we-dont" title="What we don't do">
            <ul className="list-disc space-y-1 pl-5">
              <li>No advertising and no ad networks.</li>
              <li>
                No third-party analytics or tracking, and no App Tracking
                Transparency prompt because we don&apos;t track you across apps
                or websites.
              </li>
              <li>No selling or sharing of data with data brokers.</li>
              <li>
                No access to your camera, microphone, contacts, photos, or
                location.
              </li>
            </ul>
          </Section>

          <Section id="this-website" title="This website">
            <p>
              miflo.dk is a simple marketing and support site. If you submit the
              feedback form here, your message is sent to the same backend the
              app uses (Supabase), and we use Resend to email ourselves a
              notification so we can reply. The site is hosted on Vercel, which
              may process basic request logs (such as IP address) to serve and
              protect the site. These providers act as processors and don&apos;t
              use your data for their own purposes.
            </p>
          </Section>

          <Section id="processors" title="Who processes your data">
            <p>
              We keep our list of providers short. Each only handles data to
              provide their service to us:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="text-ink">Supabase</span> — database and
                anonymous authentication for game rooms, scores, and feedback.
              </li>
              <li>
                <span className="text-ink">Vercel</span> — hosting for this
                website and its request logs.
              </li>
              <li>
                <span className="text-ink">Resend</span> — sends us an email
                when you submit feedback so we can follow up.
              </li>
            </ul>
          </Section>

          <Section id="retention" title="Data retention and deletion">
            <p>
              Game rooms are short-lived and cleared over time. Because Miflo
              has no login, your data is tied to an anonymous device identifier
              rather than to you personally. If you&apos;d like your stored game
              results or feedback removed, contact us and we&apos;ll delete them.
            </p>
          </Section>

          <Section id="your-rights" title="Your rights">
            <p>
              If you&apos;re in the EU/EEA, the GDPR gives you the right to
              access, correct, or delete your data, and to object to or restrict
              how it&apos;s used. Because Miflo has no login, we identify your
              data by the anonymous device identifier — share it (or the
              feedback you sent) when you get in touch so we can find the right
              records.
            </p>
            <p>
              To exercise any of these, email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent-ink underline underline-offset-4 hover:text-ink"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              or use the{" "}
              <a
                href="/feedback"
                className="text-accent-ink underline underline-offset-4 hover:text-ink"
              >
                feedback form
              </a>
              . You also have the right to complain to your local data
              protection authority — in Denmark that&apos;s Datatilsynet.
            </p>
          </Section>

          <Section id="children" title="Children">
            <p>
              Miflo is a general-audience football game and is not directed at
              children under 13. We do not knowingly collect personal data from
              children.
            </p>
          </Section>

          <Section id="changes" title="Changes">
            <p>
              If we change how Miflo handles data, we&apos;ll update this page
              and the &ldquo;last updated&rdquo; date above.
            </p>
          </Section>

          <Section id="contact" title="Contact">
            <p>
              Miflo is operated by {CONTROLLER} in Denmark, the controller of
              your data. Questions about privacy? Use the in-app feedback, the{" "}
              <a
                href="/feedback"
                className="text-accent-ink underline underline-offset-4 hover:text-ink"
              >
                feedback form
              </a>
              , or email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent-ink underline underline-offset-4 hover:text-ink"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>
        </article>
      </main>
    </>
  );
}

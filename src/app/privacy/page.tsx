import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy — Miflo",
  description: "How Miflo handles your data. Short version: barely any of it.",
};

const LAST_UPDATED = "30 June 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-medium tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-20">
          <h1 className="text-4xl font-medium tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted">Last updated {LAST_UPDATED}</p>

          <p className="mt-8 text-lg leading-relaxed">
            Miflo is built to need as little of your data as possible. There are
            no user accounts, no tracking, and no advertising. This page explains
            exactly what the app and this website do with information.
          </p>

          <Section title="No account, no personal sign-up">
            <p>
              You don&apos;t create an account to use Miflo. When you open the
              app it signs in anonymously and stores a random device identifier
              on your phone so it can keep your nickname and reconnect you to a
              game room. We never ask for your name, email, phone number, or
              other personal details.
            </p>
          </Section>

          <Section title="What we store">
            <p>To run multiplayer games, our backend (Supabase) stores:</p>
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

          <Section title="What we don't do">
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

          <Section title="This website">
            <p>
              miflo.dk is a simple marketing and support site. If you submit the
              feedback form here, your message is sent to the same backend the
              app uses. The site is hosted on Vercel, which may process basic
              request logs (such as IP address) to serve and protect the site.
            </p>
          </Section>

          <Section title="Data retention and deletion">
            <p>
              Game rooms are short-lived and cleared over time. Because Miflo has
              no login, your data is tied to an anonymous device identifier
              rather than to you personally. If you&apos;d like your stored game
              results or feedback removed, contact us and we&apos;ll delete them.
            </p>
          </Section>

          <Section title="Children">
            <p>
              Miflo is a general-audience football game and is not directed at
              children under 13. We do not knowingly collect personal data from
              children.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If we change how Miflo handles data, we&apos;ll update this page and
              the &ldquo;last updated&rdquo; date above.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about privacy? Use the in-app feedback, the{" "}
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
      <SiteFooter />
    </>
  );
}

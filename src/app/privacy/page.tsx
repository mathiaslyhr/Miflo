import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Eyebrow, GlassCard } from "@/components/glass";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy — Miflo",
  description: "How Miflo handles your data. Short version: barely any of it.",
};

const LAST_UPDATED = "12 July 2026";

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
      <h2 className="flex items-baseline gap-3 text-xl font-medium tracking-tight text-[#0d0d16]">
        <span aria-hidden className="h-4 w-0.5 shrink-0 rounded bg-[#0d0d16]" />
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-[#0d0d16]/60">
        {children}
      </div>
    </section>
  );
}

const GLANCE = [
  { title: "No account", body: "Anonymous sign-in. No name, email, or phone." },
  { title: "No tracking", body: "No ads, no analytics, no ATT prompt." },
  {
    title: "You choose what's shared",
    body: "Friends, a nickname and a picture only if you opt in.",
  },
  { title: "Delete on request", body: "Email us and your data is removed." },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero header */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
            <Eyebrow>Privacy</Eyebrow>
            <h1
              className="mt-4 text-balance font-medium leading-[1.05] tracking-tight text-[#0d0d16]"
              style={{ fontSize: "clamp(2.5rem,6vw,3.75rem)" }}
            >
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-[#0d0d16]/50">
              Last updated {LAST_UPDATED}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0d0d16]/70">
              Miflo is built to need as little of your data as possible. There
              are no user accounts, no tracking, and no advertising. This page
              explains exactly what the app and this website do with information.
            </p>
          </div>
        </section>

        {/* At a glance */}
        <section className="relative mx-auto w-full max-w-3xl px-6 pt-12">
          <div className="grid gap-3 sm:grid-cols-2">
            {GLANCE.map((item) => (
              <GlassCard key={item.title} className="flex items-center gap-4 !p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0d0d16] text-white">
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
                  <h3 className="font-medium text-[#0d0d16]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#0d0d16]/55">
                    {item.body}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <article className="mx-auto w-full max-w-3xl px-6 pb-20 pt-12">
          <Section id="no-account" title="No account, no personal sign-up">
            <p>
              You don&apos;t create an account to use Miflo. When you open the
              app it signs in anonymously and stores a random device identifier
              on your phone so it can keep your nickname and reconnect you to a
              party. We never ask for your name, email, phone number, or other
              personal details.
            </p>
            <p>
              Because there&apos;s no login, everything is tied to that
              anonymous identifier rather than to you personally. It lives on
              this phone, so deleting or reinstalling the app clears it and
              there&apos;s nothing for us to hand back or restore.
            </p>
          </Section>

          <Section id="what-we-store" title="What we store">
            <p>
              To run the games, our backend (Supabase, acting as a data
              processor on our behalf) stores information tied to your anonymous
              identifier:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                The parties you create or join: a party code, the anonymous
                player ids in the party, nicknames, live game state and scores.
              </li>
              <li>
                If you turn on Friends: a display name you choose, a friend code
                we generate for you, who you&apos;re friends with, and pending
                friend requests.
              </li>
              <li>
                Your daily-game results shared with friends: which game, whether
                you finished, your score and your streak. We never store or
                share the answer itself.
              </li>
              <li>
                An optional profile picture, if you set one (see below).
              </li>
              <li>
                Any feedback you send us through the app or this website,
                including the message and which category you picked.
              </li>
            </ul>
            <p>
              Your solo daily puzzles, guesses and streaks are kept on your
              phone and never leave it. Only the summary above (score and
              streak, never the answer) is shared, and only with the friends you
              choose.
            </p>
          </Section>

          <Section id="profile-picture" title="Profile picture and photo access">
            <p>
              Setting a profile picture is optional. If you choose one, the app
              asks permission to open your photo library so you can pick an
              image. Only the photo you select is used. It&apos;s uploaded to our
              storage and shown to your friends and to other players in a party,
              so pick something you&apos;re happy for them to see. We don&apos;t
              browse, scan or upload anything else from your photos, and
              removing the picture is a tap away in the app.
            </p>
          </Section>

          <Section id="notifications" title="Notifications">
            <p>
              If you allow notifications, the app registers a push token with
              Apple&apos;s Push Notification service and stores it against your
              anonymous identifier so we can send you friend requests, a heads
              up when someone accepts, and party invites. Other players can never
              read your token.
            </p>
            <p>
              The daily reminder and streak-saver nudges are scheduled on your
              phone by the app itself. They stay entirely on your device and
              nothing about them is sent to us.
            </p>
          </Section>

          <Section id="crash-reports" title="Crash reports">
            <p>
              To fix the bugs that make the app crash, we use Sentry to collect
              anonymous diagnostic reports (things like the error and which
              screen it happened on). Performance tracing is off, and any user
              identifier is stripped before a report is sent, so these reports
              aren&apos;t linked to you and aren&apos;t used to track you. We
              don&apos;t use any third-party analytics.
            </p>
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
                No access to your camera, microphone, contacts or location, and
                no access to your photos beyond the single image you pick for a
                profile picture.
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
                <span className="text-ink">Supabase</span>: database and
                anonymous authentication for parties, friends, scores, and
                feedback.
              </li>
              <li>
                <span className="text-ink">Vercel</span>: hosting for this
                website and its request logs.
              </li>
              <li>
                <span className="text-ink">Resend</span>: sends us an email when
                you submit feedback so we can follow up.
              </li>
              <li>
                <span className="text-ink">Apple</span>: delivers push
                notifications to your device through the Apple Push Notification
                service.
              </li>
            </ul>
          </Section>

          <Section id="retention" title="Data retention and deletion">
            <p>
              Parties are short-lived and cleared over time. Because Miflo has
              no login, your data is tied to an anonymous device identifier
              rather than to you personally. If you&apos;d like your stored game
              results, profile, picture or feedback removed, contact us and
              we&apos;ll delete them.
            </p>
            <p>
              Deleting the app also clears the anonymous identifier and
              everything kept on your phone, and leaves any profile you created
              with no way to sign back into it.
            </p>
          </Section>

          <Section id="your-rights" title="Your rights">
            <p>
              If you&apos;re in the EU/EEA, the GDPR gives you the right to
              access, correct, or delete your data, and to object to or restrict
              how it&apos;s used. Because Miflo has no login, we identify your
              data by the anonymous device identifier, so share it (or the
              feedback you sent) when you get in touch and we can find the right
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
              protection authority, which in Denmark is Datatilsynet.
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

          <Section id="disclaimer" title="Football disclaimer">
            <p>
              Miflo is not affiliated with, sponsored by, or endorsed by any
              football league, club, player or governing body. Club, competition
              and country names are used for identification purposes only. Player
              names and career data are factual information used for trivia. All
              artwork in Miflo is original illustration.
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

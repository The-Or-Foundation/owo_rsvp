import type { Metadata } from "next";
import Image from "next/image";
import { Archivo_Black, Rubik } from "next/font/google";
import {
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Ticket,
} from "lucide-react";
import RSVPCard from "@/components/Card";
import ReserveBar from "@/components/ReserveBar";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
});

const rubik = Rubik({
  weight: "900",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OWO Fashion Runway & Exhibition 2026 | RSVP",
  description:
    "RSVP for the OWO Fashion Runway and Exhibition 2026 by The Or Foundation's graduating class of Kantamanto upcycling designers. Sunday 25 October at Untamed Empire.",
};

const PILLARS = [
  "Upcycling is Africa Fashion",
  "Upcycling for Ghana's Entertainment Industry",
  "Upcycling for Ghana's Corporate Industry",
  "Commercialising Upcycling Fashion in Ghana",
];

const SESSIONS = [
  {
    name: "OWO Fashion Runway",
    time: ["2:30 PM"],
    description:
      "The opening act of OWO Festival 2026, showing collections from our graduating class.",
  },
  {
    name: "OWO Exhibition",
    time: ["3:45 PM", "– 7:30 PM"],
    description:
      "An installation showcasing collections and accessories from our graduating class.",
  },
];

const PHONE_DISPLAY = "+233 20 619 3834";
const PHONE_LINK = "tel:+233206193834";
const EMAIL = "eugene@theor.org";
const SHORT_DATE = "Sun, Oct 25 • 2:30 PM";

// Orange used on the left half of the session cards, as on the landing page
const CARD_ORANGE = "bg-[linear-gradient(90deg,#EC6A2C,#F28A2E)]";

/**
 * Event page + RSVP, laid out like an Eventbrite listing: a cover banner,
 * the event details and blurb, a "Reserve a spot" box (sticky beside the
 * content on laptops, a bottom bar on phones) and the RSVP form at the end.
 * RSVPs are saved to a Google Sheet (app/api/rsvp/route.ts).
 */
export default function RSVP() {
  return (
    <div className="min-h-screen pb-24 lg:pb-16">
      {/* Details: banner, title, overview and the reserve box */}
      <div className="bg-[#FDF2F5] pt-4 sm:pt-8 pb-14 sm:pb-20 rounded-b-[2rem] sm:rounded-b-[3rem] shadow-lg">
        <div className="mx-auto max-w-6xl px-4">
          {/* Cover banner, built from the landing page poster. Sized in cqw
              (1% of the banner's width) so it keeps its look at any width. */}
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F5473A] bg-[url(/owo_landing_bg.png)] bg-[length:100%_100%] [container-type:inline-size]">
            <Image
              src="/owo_wooo.png"
              alt=""
              width={3544}
              height={4500}
              priority
              sizes="12vw"
              className="absolute top-0 left-0 w-[11cqw] h-auto pointer-events-none select-none"
            />
            <Image
              src="/owo_wooo_2.png"
              alt=""
              width={3544}
              height={4500}
              priority
              sizes="12vw"
              className="absolute top-0 right-0 w-[11cqw] h-auto pointer-events-none select-none"
            />
            <Image
              src="/owo_wooo_3.png"
              alt="OWO Festival 2026"
              width={18440}
              height={4172}
              priority
              sizes="35vw"
              className="absolute left-1/2 -translate-x-1/2 top-[3cqw] w-[32cqw] h-auto pointer-events-none select-none"
            />
            <p className="absolute left-1/2 -translate-x-1/2 top-[12.5cqw] text-center text-white uppercase whitespace-nowrap leading-none">
              <span className="block font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-bold text-[4.6cqw] tracking-[-0.01em]">
                Fashion Runway &amp;
              </span>
              <span className={`${rubik.className} block text-[9.4cqw] leading-[0.85]`}>
                Exhibition
              </span>
            </p>
            {/* Model in front of the title so her hair overlaps it, as on the landing page */}
            <Image
              src="/owo_wooo_6.png"
              alt="Model in an upcycled embroidered suit"
              width={5625}
              height={4500}
              priority
              sizes="50vw"
              className="absolute left-[calc(50%-23cqw)] top-[20cqw] w-[46cqw] max-w-none h-auto pointer-events-none select-none"
            />
            <Image
              src="/owo_wooo_5.png"
              alt=""
              width={19422}
              height={5321}
              priority
              sizes="105vw"
              className="absolute left-1/2 -translate-x-1/2 top-[38cqw] w-[104cqw] max-w-none h-auto pointer-events-none select-none"
            />
          </div>

          <div className="mt-8 sm:mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <div className="text-[#2B2B2B] font-['Avenir_Next',Avenir,'Helvetica_Neue',Helvetica,Arial,sans-serif]">
              <h1
                className={`${archivoBlack.className} text-[#111418] text-3xl sm:text-5xl leading-[1.05]`}
              >
                OWO Fashion Runway &amp; Exhibition 2026
              </h1>

              {/* Host */}
              <div className="mt-5 flex items-center gap-3">
                <Image
                  src="/owo-icon.png"
                  alt=""
                  width={512}
                  height={512}
                  className="size-12 rounded-full bg-white object-contain p-1 shadow"
                />
                <p className="leading-snug">
                  by <span className="font-bold text-[#111418]">The Or Foundation</span>
                  <br />
                  <span className="text-sm text-[#5A5A5A]">
                    in partnership with the UNIDO Textile Remanufacturing Program
                  </span>
                </p>
              </div>

              {/* Where and when */}
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-3">
                  <MapPin className="size-5 shrink-0 text-[#E97A29]" aria-hidden="true" />
                  Untamed Empire
                </li>
                <li className="flex items-center gap-3">
                  <CalendarDays className="size-5 shrink-0 text-[#E97A29]" aria-hidden="true" />
                  Sunday, 25 October 2026 • 2:30 PM – 7:30 PM
                </li>
              </ul>

              <section className="mt-10">
                <h2 className={`${archivoBlack.className} text-[#111418] text-2xl sm:text-3xl`}>
                  Overview
                </h2>
                <p className="mt-4 text-lg leading-relaxed">
                  The Or Foundation presents the 4th edition of the OWO Fashion
                  Runway and Exhibition 2026 by the graduating class of 10
                  Kantamanto-based upcycling designers and 3 sustainable fashion
                  entrepreneurs from The Or Foundation, in partnership with the
                  UNIDO Textile Remanufacturing Program.
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                  The showcase this year sits within the grand theme of{" "}
                  <span className="font-bold text-[#111418]">Upcycling Bazaar</span>,
                  organised around 4 thematic pillars capturing a strong spectrum
                  of Kantamanto&apos;s diversity of fashion innovation:
                </p>
                <ul className="mt-5 flex flex-col items-start gap-3">
                  {PILLARS.map((pillar, i) => (
                    <li
                      key={pillar}
                      className={`inline-block bg-[#63DE9F] px-3 py-1.5 text-[#0B0B0B] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-bold italic uppercase text-sm sm:text-base leading-tight ${
                        i % 2 ? "rotate-[1deg]" : "-rotate-[1deg]"
                      }`}
                    >
                      {pillar}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-12">
                <h2 className={`${archivoBlack.className} text-[#111418] text-2xl sm:text-3xl`}>
                  Schedule
                </h2>
                <div className="mt-5 space-y-4">
                  {SESSIONS.map((session) => (
                    <div
                      key={session.name}
                      className="flex overflow-hidden rounded-2xl shadow-md"
                    >
                      <div className={`${CARD_ORANGE} flex-1 p-5 sm:p-6 text-white`}>
                        <h3 className={`${archivoBlack.className} uppercase text-lg sm:text-xl leading-tight`}>
                          {session.name}
                        </h3>
                        <p className="mt-2 text-sm sm:text-base leading-snug text-white/95">
                          {session.description}
                        </p>
                      </div>
                      <div
                        className={`${archivoBlack.className} flex w-28 sm:w-40 shrink-0 flex-col items-center justify-center bg-[#111418] px-3 text-center uppercase text-white text-base sm:text-xl leading-tight`}
                      >
                        <Clock className="mb-2 size-5 text-[#63DE9F]" aria-hidden="true" />
                        {session.time.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className={`${archivoBlack.className} text-[#111418] text-2xl sm:text-3xl`}>
                  Good to know
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-black/10 bg-white p-5">
                    <h3 className="font-bold text-[#111418]">Highlights</h3>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center gap-3">
                        <Ticket className="size-5 shrink-0 text-[#E97A29]" aria-hidden="true" />
                        Free, RSVP to attend
                      </li>
                      <li className="flex items-center gap-3">
                        <Clock className="size-5 shrink-0 text-[#E97A29]" aria-hidden="true" />
                        5 hours, 2:30 PM – 7:30 PM
                      </li>
                      <li className="flex items-center gap-3">
                        <MapPin className="size-5 shrink-0 text-[#E97A29]" aria-hidden="true" />
                        In person at Untamed Empire
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-black/10 bg-white p-5">
                    <h3 className="font-bold text-[#111418]">Enquiries</h3>
                    <ul className="mt-3 space-y-2">
                      <li>
                        <a
                          href={PHONE_LINK}
                          className="flex items-center gap-3 hover:text-[#E97A29]"
                        >
                          <Phone className="size-5 shrink-0 text-[#E97A29]" aria-hidden="true" />
                          {PHONE_DISPLAY}
                        </a>
                      </li>
                      <li>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="flex items-center gap-3 break-all hover:text-[#E97A29]"
                        >
                          <Mail className="size-5 shrink-0 text-[#E97A29]" aria-hidden="true" />
                          {EMAIL}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="mt-4 flex items-start gap-3 rounded-2xl bg-[#63DE9F]/25 border border-[#63DE9F] p-5 text-[#111418]">
                  <ShoppingBag className="mt-0.5 size-5 shrink-0 text-[#111418]" aria-hidden="true" />
                  <span>
                    <span className="font-bold">Shop the collections:</span> you can
                    place a purchase request for the collection pieces on the day!
                  </span>
                </p>
              </section>
            </div>

            {/* Reserve box, beside the content on laptops (phones get ReserveBar) */}
            <aside className="hidden lg:block">
              <div className="sticky top-8 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <p className="font-bold text-[#111418]">Free</p>
                <p className="text-[#4B4B4B]">{SHORT_DATE}</p>
                <a
                  href="#rsvp"
                  className="mt-4 flex items-center justify-center rounded-lg bg-[#E97A29] px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#63DE9F]"
                >
                  Reserve a spot
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* RSVP form, on the page's gradient background */}
      <section id="rsvp" className="scroll-mt-4 flex flex-col items-center px-4 pt-14 sm:pt-20">
        <h2
          className={`${archivoBlack.className} text-center text-white uppercase text-3xl sm:text-5xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]`}
        >
          Reserve your spot
        </h2>

        <RSVPCard />

        {/* Event details, the same width as the form card above. The skater
            is centred on the cards' right edge (as far as the screen margin
            allows): his head overlaps the form, clear of the RSVP button, and
            his board lands on this card. */}
        <div className="relative max-w-5xl w-full mx-auto mt-24 sm:mt-28 px-4">
          <div
            className={`${archivoBlack.className} flex flex-col items-start gap-1.5 sm:grid sm:grid-cols-3 sm:items-center sm:gap-2 rounded-2xl sm:rounded-4xl bg-[#FDF2F5] shadow-lg pl-6 pr-[34%] py-6 sm:pl-10 sm:pr-[14%] sm:py-10 sm:text-center uppercase leading-[0.95] text-[#E97A29] text-lg sm:text-[clamp(1.25rem,2.6vw,2rem)]`}
          >
            <p>Sun, 25 Oct</p>
            <p>
              <span className="sm:block">Untamed</span>{" "}
              <span className="sm:block">Empire</span>
            </p>
            <p>12pm - 8pm</p>
          </div>

          <Image
            src="/owo_rsvp_skater.png"
            alt=""
            width={254}
            height={424}
            sizes="(min-width: 640px) 260px, 110px"
            className="absolute z-10 h-auto pointer-events-none select-none right-[2%] bottom-[12%] w-[30%] sm:right-[max(calc(1rem_-_10%),calc(50%_-_50vw_+_20px))] sm:bottom-0 sm:w-[20%] xl:right-[max(calc(1rem_-_11%),calc(50%_-_50vw_+_20px))] xl:bottom-[30%] xl:w-[22%] sm:max-w-[254px]"
          />
        </div>
      </section>

      <ReserveBar date={SHORT_DATE} />
    </div>
  );
}

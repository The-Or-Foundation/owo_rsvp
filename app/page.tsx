import type { Metadata } from "next";
import Image from "next/image";
import SplashScreen from "@/components/SplashScreen";
import HeroReveal from "@/components/HeroReveal";
import { Archivo_Black, Rubik } from "next/font/google";

const rubik = Rubik({
  weight: "900",
  subsets: ["latin"],
});

const TICKETS_URL = "https://tix.africa/discover/owo";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
});

// Icon placement is measured from the design, as a share of the card:
// left and width are % of the card's width, bottom is % of its height
// (negative pokes out below the card)
const ACTIVITIES = [
  {
    name: ["Kayayei", "Night"],
    date: ["Saturday", "Oct 3rd"],
    icon: {
      src: "/activity-icons/kayayei-night.png",
      width: 869,
      height: 900,
      left: 49,
      bottom: -4,
      size: 17.4,
    },
  },
  {
    name: ["OWO Block", "Party"],
    date: ["Sunday", "Oct 4th"],
    icon: {
      src: "/activity-icons/block-party.png",
      width: 900,
      height: 795,
      left: 44.7,
      bottom: -1,
      size: 23,
    },
  },
  {
    name: ["OWO×Tide Turners", "Beach Cleanup"],
    date: ["Saturday", "Oct 10th"],
    icon: {
      src: "/activity-icons/beach-cleanup.png",
      width: 900,
      height: 861,
      left: 50.6,
      bottom: 17,
      size: 21.9,
    },
  },
  {
    name: ["Shop for", "OWO-Day"],
    date: ["Sunday", "Oct 11th"],
    icon: {
      src: "/activity-icons/shop-for-owo-day.png",
      width: 807,
      height: 900,
      left: 47.4,
      bottom: -5,
      size: 17.2,
    },
  },
  {
    name: ["OWO×Kanta", "Health Walk"],
    date: ["Sunday", "Oct 18th"],
    icon: {
      src: "/activity-icons/health-walk.png",
      width: 393,
      height: 900,
      left: 52.1,
      bottom: -13,
      size: 9,
    },
  },
  {
    name: ["OWO Circle Talk:", "Remade in Ghana"],
    date: ["Saturday", "Oct 24th"],
    icon: {
      src: "/activity-icons/circle-talk.png",
      width: 760,
      height: 900,
      left: 52.4,
      bottom: -7,
      size: 17.2,
    },
  },
];

// Orange used on the left half of every card
const CARD_ORANGE = "bg-[linear-gradient(90deg,#EC6A2C,#F28A2E)]";

export const metadata: Metadata = {
  title: "The Upcycling Bazaar | OWO Festival",
  description:
    "Show up and Show out for Ghana's Largest celebration of Upcycling and Reuse",
};

export default function Landing() {
  return (
    <main className="min-h-[100svh] w-full bg-white">
      <SplashScreen />

      {/* Hero poster: everything is sized in vw so it keeps the design's proportions */}
      <HeroReveal className="relative w-full overflow-hidden bg-[#F5473A] bg-[url(/owo_landing_bg.png)] bg-[length:100%_100%] bg-no-repeat">
        {/* Stage: sized to fit both the screen's width and height (100:71), so
            the whole poster shows without scrolling on laptops. Everything
            inside is measured in cqw (1% of the stage's width). It isn't
            positioned, so absolute children still use the full-width section
            and the stars stay in the screen corners. */}
        <div className="mx-auto w-[min(100%,140.85svh)] aspect-[100/71] [container-type:inline-size]">
          {/* Chrome star, top-left corner */}
          <Image
            src="/owo_wooo.png"
            alt=""
            width={3544}
            height={4500}
            priority
            sizes="(max-width: 640px) 28vw, 13vw"
            className="intro-star-left absolute top-0 left-0 w-[28cqw] sm:w-[13cqw] h-auto pointer-events-none select-none"
          />

          {/* Chrome star, top-right corner */}
          <Image
            src="/owo_wooo_2.png"
            alt=""
            width={3544}
            height={4500}
            priority
            sizes="(max-width: 640px) 28vw, 13vw"
            className="intro-star-right absolute top-0 right-0 w-[28cqw] sm:w-[13cqw] h-auto pointer-events-none select-none"
          />

          {/* "20 26" year, centred just below the stars */}
          <Image
            src="/owo_wooo_3.png"
            alt="2026"
            width={18440}
            height={4172}
            priority
            sizes="50vw"
            className="intro-logo absolute left-1/2 -translate-x-1/2 top-[6cqw] w-[50cqw] h-auto pointer-events-none select-none"
          />

          {/* Slide A: the Bazaar poster */}
          <div className="hero-slide hero-slide-a absolute inset-0">
            {/* Title, below the logo */}
            <h1 className="intro-title absolute left-1/2 -translate-x-1/2 top-[22cqw] text-center text-white uppercase whitespace-nowrap leading-none">
              <span className="block font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-bold text-[7.9cqw] tracking-[-0.01em]">
                The Upcycling
              </span>
              <span
                className={`${rubik.className} block text-[14.7cqw] leading-[0.85]`}
              >
                Bazaar
              </span>
            </h1>

            {/* Model, in front of the title so her hair overlaps "BAZAAR" */}
            <Image
              src="/owo_wooo_6.png"
              alt="Model in an upcycled embroidered suit"
              width={5625}
              height={4500}
              priority
              sizes="70vw"
              className="intro-model absolute left-[calc(50%-34cqw)] top-[32.7cqw] w-[69cqw] h-auto pointer-events-none select-none"
            />
          </div>

          {/* Slide B: new location and tickets, revealed once by a light transition (lx-* in globals.css) */}
          <div className="hero-slide hero-slide-b absolute inset-0">
            <p className="lx-tag absolute left-1/2 top-[18.4cqw] w-full flex flex-col items-center -translate-x-1/2 text-[#0B0B0B] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] leading-none">
              <span className="inline-block -rotate-[1.5deg] bg-[#63DE9F] px-[0.8cqw] py-[0.25cqw] text-[1.7cqw] uppercase">
                Happening at the
              </span>
              <span className="-mt-[0.2cqw] inline-block -rotate-[2deg] bg-[#63DE9F] px-[1cqw] py-[0.35cqw] text-[3.3cqw] font-bold italic uppercase">
                New Location
              </span>
            </p>

            <h2 className="lx-title absolute left-1/2 top-[23.4cqw] -translate-x-1/2 text-center text-white uppercase whitespace-nowrap leading-none">
              <span className="lx-untamed lx-sweep block font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-bold text-[10.4cqw] tracking-[-0.02em] leading-[0.8]">
                Untamed
              </span>
              <span
                className={`${rubik.className} lx-empire lx-sweep block mt-[1.1cqw] text-[12.9cqw] leading-[0.8]`}
              >
                Empire
              </span>
            </h2>

            <p
              className={`${archivoBlack.className} lx-pill absolute left-[calc(50%-43cqw)] top-[48.9cqw] flex items-center justify-center w-[20cqw] h-[9.2cqw] rounded-[50%] bg-[#111418] text-center text-white uppercase text-[2.9cqw] leading-[0.95]`}
            >
              25th
              <br />
              Oct
            </p>

            <a
              href={TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lx-cta absolute left-1/2 top-[48.9cqw] sm:top-[50.9cqw] -translate-x-1/2 flex items-center justify-center w-[42cqw] sm:w-[37.5cqw] h-[9cqw] sm:h-[4.9cqw] rounded-[1.6cqw] sm:rounded-[1cqw] border border-[#E9C3A8] bg-white font-['Avenir_Next',Avenir,'Helvetica_Neue',Helvetica,Arial,sans-serif] font-semibold text-[3.6cqw] sm:text-[2.4cqw] text-[#E07B36] transition-colors duration-200 hover:bg-[#FFF3EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Buy Ticket
            </a>

            <p
              className={`${archivoBlack.className} lx-pill absolute right-[calc(50%-43cqw)] top-[48.9cqw] flex items-center justify-center w-[20cqw] h-[9.2cqw] rounded-[50%] bg-[#111418] text-center text-white uppercase text-[2.9cqw] leading-[0.95]`}
            >
              Sun
              <br />
              12pm
            </p>

            {/* Light transition, following the OWO reel: green blade with the
                tag snaps in from the right, cyan light floods in around a V
                from the top, a yellow cone shoots from the left, then the
                light collapses to a green bar where the title lands */}
            <div
              aria-hidden="true"
              className="lx-blade absolute left-[34%] right-0 top-[44%] h-[13%]"
            >
              <span className="absolute right-[7%] bottom-[12%] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[2.2cqw] font-bold italic uppercase text-[#0B0B0B]">
                New Location
              </span>
            </div>
            <div aria-hidden="true" className="lx-cyan absolute inset-0" />
            <div aria-hidden="true" className="lx-warm absolute inset-0" />
            <div
              aria-hidden="true"
              className="lx-ray absolute left-[10%] w-[52%] top-0 h-[64%]"
            />
            <div
              aria-hidden="true"
              className="lx-cone absolute left-0 w-[62%] top-[40%] h-[42%]"
            />
            <div
              aria-hidden="true"
              className="lx-bar absolute left-1/2 top-[40%] w-[28cqw] h-[3.2cqw] -translate-x-1/2"
            />
          </div>

          {/* Chrome OWO, in front of the model and cut off by the bottom of the hero */}
          <Image
            src="/owo_wooo_5.png"
            alt=""
            width={19422}
            height={5321}
            priority
            sizes="117vw"
            className="intro-owo absolute left-1/2 -translate-x-1/2 top-[60.7cqw] w-[max(117cqw,100vw)] max-w-none h-auto pointer-events-none select-none"
          />
        </div>
      </HeroReveal>

      {/* Activities line-up. Phones get a single column, so sizes there are scaled up */}
      <section
        className={`${archivoBlack.className} intro-rest uppercase text-white px-[6vw] sm:px-[8.75vw] pt-[8vw] sm:pt-[5.2vw] pb-[12vw] sm:pb-[8vw]`}
      >
        <h2 className="flex justify-center">
          <Image
            src="/owo_activities_heading.png"
            alt="Activities Line-up"
            width={15573}
            height={1196}
            sizes="(max-width: 640px) 80vw, 55vw"
            className="w-[80vw] sm:w-[55vw] h-auto"
          />
        </h2>

        <ul className="mt-[10vw] sm:mt-[5vw] grid grid-cols-1 sm:grid-cols-2 gap-x-[3.5vw] gap-y-[8vw] sm:gap-y-[5vw]">
          {ACTIVITIES.map((activity) => (
            <li
              key={activity.name.join(" ")}
              className="relative flex items-center justify-between h-[15vw] sm:h-[6.8vw] px-[3.5vw] sm:px-[1.6vw]"
            >
              {/* Card background is clipped to the rounded corners; the icon is not */}
              <div className="absolute inset-0 rounded-[2.6vw] sm:rounded-[1.2vw] overflow-hidden bg-[#111418]">
                <div
                  className={`absolute inset-y-0 left-0 w-[58%] ${CARD_ORANGE}`}
                />
              </div>
              <p className="relative text-[3.2vw] sm:text-[1.45vw] leading-[1]">
                {activity.name[0]}
                <br />
                {activity.name[1]}
              </p>
              <Image
                src={activity.icon.src}
                alt=""
                width={activity.icon.width}
                height={activity.icon.height}
                sizes="(max-width: 640px) 22vw, 10vw"
                className="activity-icon absolute h-auto select-none"
                style={{
                  left: `${activity.icon.left}%`,
                  bottom: `${activity.icon.bottom}%`,
                  width: `${activity.icon.size}%`,
                }}
              />
              <p className="relative text-right text-[3.5vw] sm:text-[1.55vw] leading-[0.95]">
                {activity.date[0]}
                <br />
                {activity.date[1]}
              </p>
            </li>
          ))}
        </ul>

        {/* Headline event */}
        <div className="relative mt-[14vw] sm:mt-[6vw]">
          <div className="relative flex items-center justify-between h-[26vw] sm:h-[14.2vw] rounded-[4vw] sm:rounded-[2.5vw] overflow-hidden px-[5vw] sm:px-[4vw] bg-[#111418]">
            <div
              className={`absolute inset-y-0 left-0 w-[51%] ${CARD_ORANGE}`}
            />
            <p className="relative leading-[0.9]">
              <span className="block text-[6vw] sm:text-[4.9vw]">OWO Day</span>
              <span className="block mt-[0.6vw] text-[2.6vw] sm:text-[2.1vw]">
                @ Untamed Empire
              </span>
            </p>
            <p className="relative text-right text-[5vw] sm:text-[4vw] leading-[0.95]">
              Sunday
              <br />
              Oct 25th
            </p>
          </div>
          <Image
            src="/owo_day_model.png"
            alt="OWO Day guest in a cowrie-shell necklace"
            width={703}
            height={1200}
            sizes="(max-width: 640px) 13vw, 10vw"
            className="absolute left-[51%] -translate-x-1/2 bottom-0 w-[12.7vw] sm:w-[9.9vw] h-auto pointer-events-none select-none"
          />
        </div>
      </section>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Previous home page (the 2025 RSVP form), kept for reference.
// Its components (components/Card.tsx, components/EventDetails.tsx) and the
// /api/rsvp route are still in the repo.
// ---------------------------------------------------------------------------
//
// import RSVPCard from "@/components/Card";
// import EventDetailsCard from "@/components/EventDetails";
// import { Twitter, Instagram, Facebook } from "lucide-react";
//
// export default function Home() {
//   return (
//     <>
//       {/* <Background /> */}
//       <div className="min-h-screen bg-gradient-to-br p-4 flex flex-col items-center">
//         <RSVPCard />
//         <EventDetailsCard />
//
//         {/* Social Media Icons + Handles */}
//         <div className="mt-10 flex space-x-8 justify-center">
//           <a
//             href="https://www.instagram.com/obroniwawuoctober/?igsh=MTR5ZzM3anZjZTEycg%3D%3D#"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center space-x-2 text-black hover:text-pink-500 transition-colors duration-200"
//           >
//             <Instagram size={28} />
//             <span>@obroniwawuoctober</span>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }

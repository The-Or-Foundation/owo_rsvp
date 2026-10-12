import type { Metadata } from "next";
import Image from "next/image";
import { Archivo_Black } from "next/font/google";
import RSVPCard from "@/components/Card";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RSVP | OWO Festival",
  description:
    "RSVP for OWO 2026 and we'll send you a free ticket voucher by email",
};

// RSVPs are saved to a Google Sheet (app/api/rsvp/route.ts)
export default function RSVP() {
  return (
    <div className="relative min-h-screen p-4 pb-16 flex flex-col items-center">
      {/* Chrome stars in the top corners, sized like the landing page's
          (13% of its poster width; bigger on tall screens), behind the form */}
      <Image
        src="/owo_wooo.png"
        alt=""
        width={3544}
        height={4500}
        priority
        sizes="(max-aspect-ratio: 4/5) 28vw, 13vw"
        className="absolute top-0 left-0 wide:w-[min(13vw,18.3svh)] tall:w-[28vw] h-auto pointer-events-none select-none"
      />
      <Image
        src="/owo_wooo_2.png"
        alt=""
        width={3544}
        height={4500}
        priority
        sizes="(max-aspect-ratio: 4/5) 28vw, 13vw"
        className="absolute top-0 right-0 wide:w-[min(13vw,18.3svh)] tall:w-[28vw] h-auto pointer-events-none select-none"
      />

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
          priority
          sizes="(min-width: 640px) 260px, 110px"
          className="absolute z-10 h-auto pointer-events-none select-none right-[2%] bottom-[12%] w-[30%] sm:right-[max(calc(1rem_-_10%),calc(50%_-_50vw_+_20px))] sm:bottom-0 sm:w-[20%] xl:right-[max(calc(1rem_-_11%),calc(50%_-_50vw_+_20px))] xl:bottom-[30%] xl:w-[22%] sm:max-w-[254px]"
        />
      </div>
    </div>
  );
}

import RSVPCard from "@/components/Card";
import EventDetailsCard from "@/components/EventDetails";
import { Twitter, Instagram, Facebook } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* <Background /> */}
      <div className="min-h-screen bg-gradient-to-br p-4 flex flex-col items-center">
        <RSVPCard />
        <EventDetailsCard />

        {/* Social Media Icons + Handles */}
        <div className="mt-10 flex space-x-8 justify-center">
          <a
            href="https://www.instagram.com/obroniwawuoctober/?igsh=MTR5ZzM3anZjZTEycg%3D%3D#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-black hover:text-pink-500 transition-colors duration-200"
          >
            <Instagram size={28} />
            <span>@obroniwawuoctober</span>
          </a>
        </div>
      </div>
    </>
  );
}

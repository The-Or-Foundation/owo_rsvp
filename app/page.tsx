import RSVPCard from "@/components/Card";
import EventDetailsCard from "@/components/EventDetails";

export default function Home() {
  return (
    <>
      {/* <Background /> */}
      <div className="min-h-screen bg-gradient-to-br p-4">
        <RSVPCard />
        <EventDetailsCard />
      </div>
    </>
  );
}

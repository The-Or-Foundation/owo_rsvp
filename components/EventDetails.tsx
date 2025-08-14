import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function EventDetailsCard() {
  return (
    <div className="relative max-w-5xl w-full mx-auto mt-16 sm:mt-24 px-2 sm:px-4 mb-8 sm:mb-16">
      <Card className="bg-[#FDF2F5] rounded-2xl sm:rounded-4xl shadow-lg overflow-hidden">
        <CardContent className="py-1 px-3 sm:px-6 md:px-10 flex justify-center items-center">
          <Image
            src="/Layer_1.png"
            alt="Event Details"
            width={800}
            height={220}
            className="object-contain w-full h-auto max-w-full"
            priority
          />
        </CardContent>
      </Card>
    </div>
  );
}

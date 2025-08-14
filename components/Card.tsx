"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hook/mobilehook";

export default function RSVPCard() {
  const [hoveredInput, setHoveredInput] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [phoneWarning, setPhoneWarning] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const isMobile = useIsMobile();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const baseInputClasses =
    "mt-1 w-full max-w-xs bg-white border rounded-md py-6 px-5 text-base transition-all duration-200 cursor-text " +
    "hover:!border-[#24F1AF] focus:!border-[#24F1AF] focus:ring-0";

  const allowedPhoneRegex = /^[0-9+\-()\s]*$/;

  // Handle input changes
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setErrors((prev) => ({ ...prev, [id]: false }));

    if (id === "phone") {
      if (!allowedPhoneRegex.test(value)) {
        setPhoneWarning(true);
      } else {
        setPhoneWarning(false);
      }
      const filtered = value.replace(/[^0-9+\-()\s]/g, "");
      setFormData((prev) => ({ ...prev, [id]: filtered }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: { [key: string]: boolean } = {};
    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.lastName.trim()) newErrors.lastName = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstMissing = Object.keys(newErrors)[0];
      if (firstMissing === "firstName") firstNameRef.current?.focus();
      if (firstMissing === "lastName") lastNameRef.current?.focus();
      toast.error("Please fill the required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      toast.success("RSVP Successful 🎉 — Thanks for confirming!");
      setSuccess(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      setPhoneWarning(false);
      setErrors({});

      // Reload form after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 10000);
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-5xl w-full mx-auto mt-10 px-4 sm:px-4">
      <Card className="bg-[#FDF2F5] rounded-4xl sm:rounded-4xl shadow-lg overflow-hidden">
        <div
          className={
            isMobile
              ? "absolute -top-6 left-1/2 transform -translate-x-1/2 w-[180px] h-[100px]"
              : "absolute -top-12 left-1/2 transform -translate-x-1/2 w-[350px] h-[250px]"
          }
        >
          <Image
            src="/owo_logo.gif"
            alt="OWO Festival Logo"
            width={isMobile ? 180 : 350}
            height={isMobile ? 100 : 250}
            priority
          />
        </div>

        <CardContent
          className={isMobile ? "pt-24 px-4 pb-8" : "pt-48 px-6 md:px-10 pb-8"}
        >
          {success ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-pink-50">
              <h2 className="text-4xl font-bold text-black">
                RSVP Successful{" "}
                <span role="img" aria-label="celebration">
                  🎉
                </span>
              </h2>
              <p className="mt-4 text-lg text-black max-w-md">
                Thank you for confirming your attendance! <br />
                We’ve sent the event details to your email.
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:ml-20">
                {/* First Name */}
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-base text-[#1A1A1A] font-medium"
                  >
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    ref={firstNameRef}
                    className={`${baseInputClasses} ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.firstName}
                    placeholder={
                      hoveredInput === "firstName"
                        ? ""
                        : "Enter your first name"
                    }
                    onChange={handleChange}
                    onMouseEnter={() => {
                      setHoveredInput("firstName");
                      firstNameRef.current?.focus();
                    }}
                    onMouseLeave={() => setHoveredInput("")}
                    aria-required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      First name is required.
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-base text-[#1A1A1A] font-medium"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    ref={lastNameRef}
                    className={`${baseInputClasses} ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.lastName}
                    placeholder={
                      hoveredInput === "lastName" ? "" : "Enter your last name"
                    }
                    onChange={handleChange}
                    onMouseEnter={() => {
                      setHoveredInput("lastName");
                      lastNameRef.current?.focus();
                    }}
                    onMouseLeave={() => setHoveredInput("")}
                    aria-required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      Last name is required.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-14 md:ml-20">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-base text-[#1A1A1A] font-medium"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    ref={emailRef}
                    className={`${baseInputClasses} border-gray-300`}
                    value={formData.email}
                    placeholder={
                      hoveredInput === "email" ? "" : "Enter your email"
                    }
                    onChange={handleChange}
                    onMouseEnter={() => {
                      setHoveredInput("email");
                      emailRef.current?.focus();
                    }}
                    onMouseLeave={() => setHoveredInput("")}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-base text-[#1A1A1A] font-medium"
                  >
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    ref={phoneRef}
                    className={`${baseInputClasses} border-gray-300`}
                    value={formData.phone}
                    placeholder={
                      hoveredInput === "phone" ? "" : "Enter your phone number"
                    }
                    onChange={handleChange}
                    onMouseEnter={() => {
                      setHoveredInput("phone");
                      phoneRef.current?.focus();
                    }}
                    onMouseLeave={() => setHoveredInput("")}
                  />
                  {phoneWarning && (
                    <p className="text-red-500 text-xs mt-1">
                      Allowed: numbers, + - ( ) and spaces.
                    </p>
                  )}
                </div>

                <div className="pt-14 pb-10 col-span-1 md:col-span-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-11/12 bg-[#E97A29] hover:bg-[#24F1AF] text-white hover:text-[#E97A29] text-lg font-semibold py-6 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {loading && (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    )}
                    {loading ? "Submitting..." : "RSVP Here"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardContent>

        <div
          className={
            isMobile
              ? "absolute -bottom-24 right-1 z-10"
              : "absolute -bottom-36 -right-28 z-10"
          }
        >
          <Image
            src="/owo_guy.png"
            alt="Corner Decoration"
            width={isMobile ? 140 : 260}
            height={isMobile ? 100 : 200}
            priority
            className="object-contain"
          />
        </div>
      </Card>
    </div>
  );
}

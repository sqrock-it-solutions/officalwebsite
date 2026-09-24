"use client";

import { ArrowRight, Users, Award, Shield } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Careers
            </span>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-black sm:text-5xl md:text-6xl">
              Build Your Career.
              <br />
              Build What Matters.
            </h1>
            <p className="mb-8 max-w-lg text-base text-gray-600 md:text-lg">
              At SQROCK, we don't just build software — we build solutions that
              create real impact. Join our team of passionate problem solvers
              and grow with a culture that empowers you.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              <Button className="bg-black text-white hover:bg-gray-800">
                <Link href={"#joblist"} className="flex">
                View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
           
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> No Obligation
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4" /> Free Expert Advice
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> 100% Confidential
              </span>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
              {/* Placeholder image - replace with actual image */}
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-gray-400">Team Image</span>
              </div>
              
              Uncomment when you have the actual image:
              <Image
                src="/carrierhero.png"
                alt="SQROCK team at work"
                fill
                className="object-cover"
              />
             
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-100 sm:-bottom-6 sm:-left-6 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gray-300"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">Join 50+</p>
                  <p className="text-xs text-gray-500">Amazing People</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
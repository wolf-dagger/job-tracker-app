"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const ImageTabs = () => {
  const [active, setActive] = useState("organize");
  return (
    <>
      <section className="border-t bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Tabs */}
            <div className="flex gap-2 justify-center mb-8">
              <Button
                onClick={() => setActive("organize")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${active === "organize" ? "bg-pink-500 text-white" : ""}`}
              >
                Organize Application
              </Button>
              <Button
                onClick={() => setActive("hire")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${active === "hire" ? "bg-pink-500 text-white" : ""}`}
              >
                Get Hired
              </Button>
              <Button
                onClick={() => setActive("boards")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${active === "boards" ? "bg-pink-500 text-white" : ""}`}
              >
                Manage Boards
              </Button>
            </div>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
              {active === "organize" && (
                <Image
                  src={"/hero-images/hero1.png"}
                  alt="Organize Application"
                  width={"1200"}
                  height={"800"}
                />
              )}
              {active === "hire" && (
                <Image
                  src={"/hero-images/hero2.png"}
                  alt="Get Hired"
                  width={"1200"}
                  height={"800"}
                />
              )}
              {active === "boards" && (
                <Image
                  src={"/hero-images/hero3.png"}
                  alt="Manage Boards"
                  width={"1200"}
                  height={"800"}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageTabs;

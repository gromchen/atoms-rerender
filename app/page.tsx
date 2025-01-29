"use client";

import dynamic from "next/dynamic";

const Main = dynamic(() => import("./main").then((module) => module.Main), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <Main />
    </div>
  );
}

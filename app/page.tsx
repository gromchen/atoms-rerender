"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRenderInfo } from "@uidotdev/usehooks";
import { atom, useAtom } from "jotai";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        <UseAtomComponent />
      </main>
    </div>
  );
}

const countAtom = atom(0);

function UseAtomComponent() {
  const info = useRenderInfo("UseAtomComponent");

  const [count, setCount] = useAtom(countAtom);

  return (
    <Card>
      <CardHeader>
        <CardTitle>useAtom</CardTitle>
      </CardHeader>

      <CardContent>
        <code>{JSON.stringify({ count, info }, null, 2)}</code>
      </CardContent>

      <CardFooter>
        <Button onClick={() => setCount((prev) => prev + 1)}>+1</Button>
      </CardFooter>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRenderCount } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { ReactNode, useCallback, useEffect, useState } from "react";

export function Main() {
  return (
    <main className="flex gap-4 flex-wrap items-center">
      <UseAtomComponent />
      <UseCount />
      <UseAtomValue />
      <UseSetAtom />
      <UseAtomSetter />
      <UseCountSetter />
      <UseCountGetterSetter />
    </main>
  );
}

const countAtom = atom(0);

function useCount() {
  const [count, setCount] = useAtom(countAtom);

  return {
    count,
    setCount,
  };
}

function useCountSetter() {
  const setCount = useSetAtom(countAtom);

  return {
    setCount,
  };
}

function useCountGetterSetter() {
  const count = useAtomValue(countAtom);
  const setCount = useSetAtom(countAtom);

  return {
    count,
    setCount,
  };
}

function UseAtomComponent() {
  const [count, setCount] = useAtom(countAtom);

  const handleCountIncrement = useCallback(
    () => setCount((c) => c + 1),
    [setCount]
  );

  return (
    <CountCard
      title="useAtom"
      description="const [count, setCount] = useAtom(countAtom);"
      count={count}
      onIncrement={handleCountIncrement}
    />
  );
}

function UseCount() {
  const { count, setCount } = useCount();

  const handleIncrement = useCallback(() => setCount((c) => c + 1), [setCount]);

  return (
    <CountCard
      title="useCount"
      description="const { count, setCount } = useCount();"
      count={count}
      onIncrement={handleIncrement}
    />
  );
}

function UseAtomValue() {
  const count = useAtomValue(countAtom);

  return (
    <CountCard
      title="useAtomValue"
      description="const count = useAtomValue(countAtom);"
      count={count}
      onIncrement={undefined}
    />
  );
}

function UseSetAtom() {
  const setCount = useSetAtom(countAtom);

  const handleIncrement = useCallback(() => setCount((c) => c + 1), [setCount]);

  return (
    <CountCard
      title="useSetAtom"
      description="const setCount = useSetAtom(countAtom);"
      count="N/A"
      onIncrement={handleIncrement}
    />
  );
}

function UseAtomSetter() {
  const [, setCount] = useAtom(countAtom);

  const handleIncrement = useCallback(() => setCount((c) => c + 1), [setCount]);

  return (
    <CountCard
      title="useAtom: setter"
      description="const [, setCount] = useAtom(countAtom);"
      count="N/A"
      onIncrement={handleIncrement}
    />
  );
}

function UseCountSetter() {
  const { setCount } = useCountSetter();

  const handleIncrement = useCallback(() => setCount((c) => c + 1), [setCount]);

  return (
    <CountCard
      title="useCount: setter"
      description="const { setCount } = useCountSetter();"
      count="N/A"
      onIncrement={handleIncrement}
    />
  );
}

function UseCountGetterSetter() {
  const { setCount } = useCountGetterSetter();

  const handleIncrement = useCallback(() => setCount((c) => c + 1), [setCount]);

  return (
    <CountCard
      title="useCount: getter/setter"
      description="const { setCount } = useCountGetterSetter();"
      count="N/A"
      onIncrement={handleIncrement}
    />
  );
}

function CountCard({
  title,
  description,
  count,
  onIncrement,
}: {
  title: string;
  description: string;
  count: ReactNode;
  onIncrement: (() => void) | undefined;
}) {
  const renderCount = useRenderCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        <CardDescription>
          <code>{description}</code>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col">
        <code>
          Count: <MotionB>{count}</MotionB>
        </code>

        <code>
          Render count: <MotionB>{renderCount}</MotionB>
        </code>
      </CardContent>

      <CardFooter>
        <Button onClick={onIncrement} disabled={!onIncrement}>
          Increment
        </Button>
      </CardFooter>
    </Card>
  );
}

function MotionB({ children }: { children: ReactNode }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((k) => k + 1);
  }, [children]);

  return (
    <motion.b
      key={key}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.b>
  );
}

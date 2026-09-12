"use client";

import { useEffect } from "react";
import { revealBatch } from "@/lib/animations";

export default function AnimationRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    revealBatch(document.body);
  }, []);

  return <>{children}</>;
}

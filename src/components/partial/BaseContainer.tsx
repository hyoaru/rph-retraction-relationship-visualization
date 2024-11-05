import React from "react";

import { cn } from "@/lib/utils";

export default function BaseContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto px-4 md:container", className)}>{children}</div>
  );
}
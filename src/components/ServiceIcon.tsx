"use client";

import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Props {
  name: string;
  size?: number;
  className?: string;
}

export default function ServiceIcon({
  name,
  size = 30,
  className = "",
}: Props) {
  const Icon =
    (Icons[name as keyof typeof Icons] as LucideIcon) ??
    Icons.Circle;

  return <Icon size={size} className={className} />;
}
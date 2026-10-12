import { cn } from "@/lib/utils";

export const RadialBackground = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 size-full pointer-events-none [background:radial-gradient(125%_125%_at_50%_100%,rgba(242,105,80,0.22)_0%,rgba(244,75,46,0.07)_45%,transparent_80%)]",
        className
      )}
    />
  );
};

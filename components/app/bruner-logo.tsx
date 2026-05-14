import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrunerLogo({
  className,
  markClassName,
  showText = true,
  subtitle
}: {
  className?: string;
  markClassName?: string;
  showText?: boolean;
  subtitle?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1 shadow-glow ring-1 ring-white/15",
          markClassName
        )}
        aria-hidden="true"
      >
        <Image
          src="/brand/digital-360-logo.jpg"
          alt=""
          fill
          sizes="44px"
          className="object-contain p-0.5"
          priority
        />
      </div>
      {showText ? (
        <div className="min-w-0 leading-tight">
          <div className="truncate text-lg font-semibold tracking-normal text-foreground">Digital360</div>
          <div className="truncate text-xs text-muted-foreground">{subtitle ?? "by BrunerDigital"}</div>
        </div>
      ) : null}
    </div>
  );
}

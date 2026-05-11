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
          "relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground shadow-glow",
          markClassName
        )}
        aria-hidden="true"
      >
        <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.32),transparent_42%,rgba(2,6,23,0.18))]" />
        <span className="relative text-sm font-black tracking-normal">BD</span>
      </div>
      {showText ? (
        <div className="min-w-0 leading-tight">
          <div className="truncate text-lg font-semibold tracking-normal text-foreground">BrunerDigital</div>
          {subtitle ? <div className="truncate text-xs text-muted-foreground">{subtitle}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

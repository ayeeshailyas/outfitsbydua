export default function Logo({ className = "", light = false }) {
  const base = light ? "text-white" : "text-on-surface";
  const sub = light ? "text-white/70" : "text-secondary";

  return (
    <span className={`inline-flex items-baseline gap-[3px] select-none ${className}`}>
      <span
        className={`font-logo-serif ${base}`}
        style={{
          fontWeight: 600,
          letterSpacing: "0.08em",
          fontSize: "1.4em",
        }}
      >
        OUTFITS
      </span>
      <span
        className={`font-logo-italic italic ${sub}`}
        style={{
          fontWeight: 300,
          letterSpacing: "0.01em",
          fontSize: "0.95em",
        }}
      >
        byduaJP
      </span>
    </span>
  );
}

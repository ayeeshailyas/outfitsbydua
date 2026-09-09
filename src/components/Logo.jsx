export default function Logo({ className = "", light = false }) {
  return (
    <span
      className={`relative inline-flex h-[3.8em] w-[6em] overflow-hidden select-none ${className}`}
      aria-label="Outfit by DuaJP"
    >
      <img
        src="/images/logo.png"
        alt="Outfit by DuaJP"
        className="absolute left-1/2 top-12 w-full max-w-none -translate-x-1/2 -translate-y-[54%]"
      />
    </span>
  );
}

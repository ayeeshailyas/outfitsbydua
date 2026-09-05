import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const NAV_LINKS = [
  { to: "/women", label: "Women" },
  { to: "/men", label: "Men" },
  { to: "/kids", label: "Kids" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/sale", label: "Sale" },
];

export default function Header() {
  const { count: cartCount, openCart } = useCart();
  const { count: wishlistCount, openWishlist } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };

    window.addEventListener("resize", closeMenuOnDesktop);
    return () => window.removeEventListener("resize", closeMenuOnDesktop);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 glass-header transition-shadow duration-300 ${
        scrolled ? "shadow-ambient border-b border-outline-variant/60" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-container-max mx-auto flex items-center justify-between px-margin-mobile md:px-margin-desktop h-[76px]">
        {/* Mobile menu trigger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 -ml-2"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <span className="block w-5 h-px bg-on-surface mb-1.5" />
          <span className="block w-5 h-px bg-on-surface" />
        </button>

        <Link to="/" className="lg:mr-8">
          <Logo className="text-xl" />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-body text-label-caps uppercase fade-underline pb-1 ${
                  isActive ? "text-on-surface" : "text-on-surface-variant"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="w-9 h-9 flex items-center justify-center text-on-surface hover:text-secondary transition-colors"
          >
            <IconSearch />
          </button>
          <button
            aria-label={`Wishlist, ${wishlistCount} items`}
            onClick={openWishlist}
            className="relative w-9 h-9 flex items-center justify-center text-on-surface hover:text-secondary transition-colors"
          >
            <IconHeart />
            {wishlistCount > 0 && <Badge count={wishlistCount} />}
          </button>
          <button
            aria-label={`Shopping bag, ${cartCount} items`}
            onClick={openCart}
            className="relative w-9 h-9 flex items-center justify-center text-on-surface hover:text-secondary transition-colors"
          >
            <IconBag />
            {cartCount > 0 && <Badge count={cartCount} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden border-t border-outline-variant/60 bg-surface-container-lowest"
          >
            <form
              onSubmit={submitSearch}
              className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-5 flex items-center gap-4"
            >
              <IconSearch />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, categories..."
                className="flex-1 bg-transparent border-b border-outline-variant focus:border-on-surface outline-none py-2 font-body text-body-md placeholder:text-on-surface-variant transition-colors"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-label-caps uppercase text-on-surface-variant"
              >
                Close
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                className="mobile-menu-panel fixed top-0 left-0 bottom-0 w-[82%] max-w-sm z-50 flex flex-col px-margin-mobile py-6 shadow-elevated lg:hidden"
              >
                <div className="flex items-center justify-between mb-10">
                  <Logo />
                  <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center">
                    <IconClose />
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-headline-md py-3 border-b border-outline-variant/60 text-on-surface"
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto text-label-caps uppercase text-on-surface-variant pt-8">
                  Curated silhouettes for the discerning collector.
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}

function Badge({ count }) {
  return (
    <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.7 2.4 4 6.2 4c2 0 3.6 1.1 4.8 2.8C12.2 5.1 13.8 4 15.8 4c3.8 0 5.7 3.7 4.2 7.2-2.5 4.7-10 9.3-10 9.3z" strokeLinejoin="round" />
    </svg>
  );
}
function IconBag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l-1 12.5a1 1 0 01-1 .9H8a1 1 0 01-1-.9L6 8z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 116 0v2" strokeLinecap="round" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
    </svg>
  );
}

export { IconSearch, IconHeart, IconBag, IconClose };

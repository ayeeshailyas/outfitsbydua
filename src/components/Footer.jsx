import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/60 mt-section-gap-mobile md:mt-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <Logo className="text-lg" />
          <p className="font-body text-body-md text-on-surface-variant mt-4 max-w-[220px]">
            Curating premium silhouettes for the discerning collector.
          </p>
        </div>

        <div>
          <h4 className="text-label-caps uppercase text-on-surface-variant mb-4">Support</h4>
          <ul className="flex flex-col gap-3 font-body text-body-md">
            <li><Link to="/about" className="fade-underline">About</Link></li>
            <li><Link to="/contact" className="fade-underline">Contact</Link></li>
            <li><Link to="/shipping" className="fade-underline">Shipping</Link></li>
            <li><Link to="/returns" className="fade-underline">Returns</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-label-caps uppercase text-on-surface-variant mb-4">Shop</h4>
          <ul className="flex flex-col gap-3 font-body text-body-md">
            <li><Link to="/women" className="fade-underline">Women</Link></li>
            <li><Link to="/men" className="fade-underline">Men</Link></li>
            <li><Link to="/kids" className="fade-underline">Kids</Link></li>
            <li><Link to="/sale" className="fade-underline">Sale</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-label-caps uppercase text-on-surface-variant mb-4">Newsletter</h4>
          <form onSubmit={onSubmit} className="flex items-center border-b border-outline-variant focus-within:border-on-surface transition-colors">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-transparent outline-none py-2 font-body text-body-md placeholder:text-on-surface-variant"
            />
            <button type="submit" aria-label="Subscribe" className="p-2 text-on-surface">
              →
            </button>
          </form>
          {submitted && (
            <p className="text-label-caps text-secondary mt-2">Thank you for subscribing.</p>
          )}
        </div>
      </div>

      <div className="border-t border-outline-variant/60">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 text-label-caps uppercase text-on-surface-variant text-center">
          © {new Date().getFullYear()} Futsbydua. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

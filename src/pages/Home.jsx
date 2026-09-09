import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } },
};

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[86vh] min-h-[680px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
          src="/images/hero.png"
          alt="Futsbydua Summer Collection"
          className="absolute inset-0 w-full h-full object-cover object-[center_18%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/30 via-transparent to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-margin-mobile">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-label-caps uppercase text-white/90 mb-4"
          >
            The New Season Edit
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="font-display text-display-lg-mobile md:text-display-lg text-white"
          >
            Summer Collection 2026
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <Link
              to="/women-wear"
              className="inline-block mt-8 bg-[#f6f8f8] font-bold text-black rounded-full px-8 py-4 text-label-caps uppercase shadow-[0_8px_20px_rgba(104,45,52,0.24)] hover:bg-[#874f57] hover:bg-[#793e45] transition-all duration-300"
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Explore by category */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24"
      >
        <div className="mb-8">
          <div>
            <h2 className="font-display text-headline-md md:text-3xl">Explore by Category</h2>
            <p className="font-body text-body-md text-on-surface-variant mt-1">Curated essentials for every wardrobe.</p>
          </div>
          <Link to="/women-wear" className="hidden sm:inline text-label-caps uppercase fade-underline pb-1">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
          {[
            { to: "/women-wear", label: "Women Wear", img: "/images/wear/wear_category.jpeg" },
            { to: "/jewellary", label: "Jewellary", img: "/images/jewellary/catagory.jpeg" },
            { to: "/handbags", label: "Handbags", img: "/images/bags/bag_category.jpeg" },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="relative img-hover-zoom rounded-sm aspect-[4/5] block">
              <img
                src={c.img}
                alt={c.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/50 to-transparent" />
              <span className="absolute bottom-5 left-5 font-display text-headline-md text-white">{c.label}</span>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Current obsessions */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24"
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-label-caps uppercase text-secondary mb-1">Signature Pieces</p>
            <h2 className="font-display text-headline-md md:text-3xl">Current Obsessions</h2>
          </div>
        </div>

        <div className="overflow-hidden pb-2">
          <div className="product-marquee flex w-max gap-gutter hover:[animation-play-state:paused]">
            {[...newArrivals, ...newArrivals].map((p, index) => (
              <div key={`${p.id}-${index}`} className="w-[240px] sm:w-[280px] shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      

      {/* Newsletter CTA */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-20 md:mt-32 bg-secondary text-on-secondary"
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 text-center">
          <h2 className="font-display text-headline-md md:text-3xl">Join the Inner Circle</h2>
          <p className="font-body text-body-md text-on-secondary/80 max-w-md mx-auto mt-3">
            Subscribe for early access to new collections, exclusive events, and curated editorial content.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center justify-center gap-3 max-w-sm mx-auto mt-8 border-b border-on-secondary/40 focus-within:border-on-secondary transition-colors"
          >
            <input
              type="email"
              required
              placeholder="Email Address"
              className="flex-1 bg-transparent outline-none py-2 font-body text-body-md placeholder:text-on-secondary/60"
            />
            <button type="submit" aria-label="Subscribe" className="text-on-secondary">→</button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}

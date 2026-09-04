import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { products as ALL_PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

const TITLES = {
  women: {
    title: "Women's Collection",
    tagline: "Discover our curated selection of effortless, timeless pieces designed for the modern woman.",
  },
  men: {
    title: "Men's Collection",
    tagline: "Considered tailoring and everyday staples, built with quiet confidence.",
  },
  kids: {
    title: "Kids' Collection",
    tagline: "Soft fabrics and durable cuts, made for play and everything in between.",
  },
  "new-arrivals": {
    title: "New Arrivals",
    tagline: "The latest additions to the Futsbydua wardrobe.",
  },
  sale: {
    title: "Sale",
    tagline: "Considered pieces, now at a considered price.",
  },
};

export default function CategoryPage({ mode }) {
  const { category } = useParams();
  const activeCategory = mode || category;
  const meta = TITLES[activeCategory] || TITLES.women;

  const baseProducts = useMemo(() => {
    if (activeCategory === "new-arrivals") return ALL_PRODUCTS.filter((p) => p.isNew);
    if (activeCategory === "sale") return ALL_PRODUCTS.filter((p) => p.onSale);
    return ALL_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const subcategories = useMemo(
    () => [...new Set(baseProducts.map((p) => p.subcategory))],
    [baseProducts]
  );
  const maxPrice = useMemo(
    () => Math.max(...baseProducts.map((p) => p.price), 100),
    [baseProducts]
  );

  const [activeSubcategories, setActiveSubcategories] = useState([]);
  const [activeAgeGroups, setActiveAgeGroups] = useState([]);
  const [priceRange, setPriceRange] = useState(maxPrice);
  const [sort, setSort] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const toggleSubcategory = (sub) =>
    setActiveSubcategories((prev) => (prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]));

  const toggleAgeGroup = (ag) =>
    setActiveAgeGroups((prev) => (prev.includes(ag) ? prev.filter((a) => a !== ag) : [...prev, ag]));

  const clearFilters = () => {
    setActiveSubcategories([]);
    setActiveAgeGroups([]);
    setPriceRange(maxPrice);
  };

  const filtered = useMemo(() => {
    let list = baseProducts.filter((p) => {
      const priceVal = p.onSale ? p.salePrice : p.price;
      if (priceVal > priceRange) return false;
      if (activeSubcategories.length && !activeSubcategories.includes(p.subcategory)) return false;
      if (activeAgeGroups.length && !activeAgeGroups.includes(p.ageGroup)) return false;
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => (a.onSale ? a.salePrice : a.price) - (b.onSale ? b.salePrice : b.price));
    if (sort === "price-desc") list = [...list].sort((a, b) => (b.onSale ? b.salePrice : b.price) - (a.onSale ? a.salePrice : a.price));
    if (sort === "newest") list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  }, [baseProducts, activeSubcategories, activeAgeGroups, priceRange, sort]);

  const visible = filtered.slice(0, visibleCount);

  const filterProps = {
    subcategories,
    activeSubcategories,
    toggleSubcategory,
    activeAgeGroups,
    toggleAgeGroup,
    priceRange,
    setPriceRange,
    maxPrice,
    onClear: clearFilters,
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      <p className="text-label-caps uppercase text-on-surface-variant mb-3">
        Collection Overview / <span className="text-on-surface">{meta.title}</span>
      </p>
      <h1 className="font-display text-display-lg-mobile md:text-display-lg">{meta.title}</h1>
      <p className="font-body text-body-lg text-on-surface-variant max-w-xl mt-4">{meta.tagline}</p>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 mt-12">
        {/* Desktop sidebar */}
        <aside className="hidden md:block">
          <Filters {...filterProps} />
        </aside>

        <div>
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-4 mb-8 flex-wrap gap-3">
            <p className="font-body text-body-md text-on-surface-variant">
              Showing {visible.length} of {filtered.length} items
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="md:hidden text-label-caps uppercase border border-outline-variant rounded-full px-4 py-2"
              >
                Filters
              </button>
              <label className="flex items-center gap-2 text-label-caps uppercase text-on-surface-variant">
                Sort by:
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent border-none outline-none text-on-surface font-body text-body-md"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </label>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-body text-body-lg text-on-surface-variant">No pieces match these filters yet.</p>
              <button onClick={clearFilters} className="mt-4 text-label-caps uppercase border-b border-on-surface pb-1">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-gutter md:gap-y-12">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-14">
              <button
                onClick={() => setVisibleCount((c) => c + 8)}
                className="border border-on-surface rounded-full px-8 py-4 text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-colors duration-300"
              >
                Load More Items
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-inverse-surface/40 z-50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="fixed inset-x-0 bottom-0 top-16 bg-surface-container-lowest z-50 rounded-t-lg flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/60">
                <h2 className="font-display text-headline-md">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters" className="w-8 h-8">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <Filters {...filterProps} />
              </div>
              <div className="px-6 py-5 border-t border-outline-variant/60">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-primary text-on-primary rounded-full py-4 text-label-caps uppercase"
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

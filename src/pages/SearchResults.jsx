import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();

  const results = useMemo(() => {
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.colorway.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      <p className="text-label-caps uppercase text-on-surface-variant mb-3">Search Results</p>
      <h1 className="font-display text-display-lg-mobile md:text-display-lg">"{q}"</h1>
      <p className="font-body text-body-md text-on-surface-variant mt-3">{results.length} items found</p>

      {results.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-body text-body-lg text-on-surface-variant">
            No pieces matched your search. Try another term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-gutter md:gap-y-12 mt-10">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

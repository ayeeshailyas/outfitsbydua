import { AGE_GROUPS } from "../data/products";

export default function Filters({
  subcategories,
  activeSubcategories,
  toggleSubcategory,
  activeAgeGroups,
  toggleAgeGroup,
  priceRange,
  setPriceRange,
  maxPrice,
  onClear,
}) {
  return (
    <div className="flex flex-col gap-8">
      <FilterGroup title="Category">
        <div className="flex flex-col gap-3">
          {subcategories.map((sub) => (
            <label key={sub} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeSubcategories.includes(sub)}
                onChange={() => toggleSubcategory(sub)}
                className="accent-on-surface w-4 h-4"
              />
              <span className="font-body text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                {sub}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Age Group">
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map((ag) => (
            <button
              key={ag.id}
              onClick={() => toggleAgeGroup(ag.id)}
              className={`px-4 py-2 rounded-full border text-label-caps uppercase transition-colors duration-300 ${
                activeAgeGroups.includes(ag.id)
                  ? "bg-primary text-on-primary border-primary"
                  : "border-outline-variant text-on-surface-variant hover:border-on-surface"
              }`}
            >
              {ag.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={10}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-on-surface"
          />
          <div className="flex items-center justify-between mt-2 font-body text-body-md text-on-surface-variant">
            <span>$0</span>
            <span>${priceRange}</span>
          </div>
        </div>
      </FilterGroup>

      <button
        onClick={onClear}
        className="text-label-caps uppercase text-on-surface-variant border-b border-outline-variant self-start pb-1 hover:text-on-surface hover:border-on-surface transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-outline-variant/60 pb-8">
      <h3 className="text-label-caps uppercase text-on-surface mb-4">{title}</h3>
      {children}
    </div>
  );
}

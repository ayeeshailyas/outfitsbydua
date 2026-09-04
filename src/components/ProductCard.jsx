import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group">
      <div className="relative img-hover-zoom rounded-sm bg-surface-container-low aspect-[4/5]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </Link>

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-surface-container-lowest/90 text-on-surface text-label-caps uppercase px-3 py-1 rounded-full">
            New
          </span>
        )}
        {product.onSale && (
          <span className="absolute top-3 left-3 bg-primary text-on-primary text-label-caps uppercase px-3 py-1 rounded-full">
            Sale
          </span>
        )}

        <button
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 flex items-center justify-center opacity-0 group-hover:opacity-100 md:transition-opacity duration-300 max-md:opacity-100"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            className={wishlisted ? "text-primary" : "text-on-surface"}
          >
            <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.7 2.4 4 6.2 4c2 0 3.6 1.1 4.8 2.8C12.2 5.1 13.8 4 15.8 4c3.8 0 5.7 3.7 4.2 7.2-2.5 4.7-10 9.3-10 9.3z" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block mt-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-body text-body-md text-on-surface">{product.name}</h3>
          <div className="text-right shrink-0">
            {product.onSale ? (
              <div className="flex items-center gap-2">
                <span className="font-body text-body-md text-on-surface-variant line-through">${product.price}</span>
                <span className="font-body text-body-md text-primary">${product.salePrice}</span>
              </div>
            ) : (
              <span className="font-body text-body-md text-on-surface">${product.price}</span>
            )}
          </div>
        </div>
        <p className="font-body text-label-caps uppercase text-on-surface-variant mt-1">{product.colorway}</p>
        {product.colors?.length > 1 && (
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((c) => (
              <span
                key={c}
                className="w-3.5 h-3.5 rounded-full border border-outline-variant"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}

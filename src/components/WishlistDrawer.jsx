import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";

export default function WishlistDrawer() {
  const { items, isOpen, closeWishlist, removeItem } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = (item) => {
    const product = getProductById(item.id);
    if (!product) return;
    addItem(product, { size: item.size, color: item.colorway });
    removeItem(item.id);
  };

  const moveAllToCart = () => {
    items.filter((i) => i.inStock).forEach(moveToCart);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-inverse-surface/40 z-50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-surface-container-lowest z-50 flex flex-col shadow-elevated"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-outline-variant/60">
              <h2 className="font-display text-headline-md">Wishlist ({items.length})</h2>
              <button aria-label="Close wishlist" onClick={closeWishlist} className="w-8 h-8 flex items-center justify-center">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                  <p className="font-body text-body-lg text-on-surface-variant">Your wishlist is empty.</p>
                  <Link to="/women" onClick={closeWishlist} className="text-label-caps uppercase border-b border-on-surface pb-1">
                    Discover the Collection
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <Link to={`/product/${item.id}`} onClick={closeWishlist} className="w-20 h-24 shrink-0 bg-surface-container-low rounded-sm overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link to={`/product/${item.id}`} onClick={closeWishlist} className="font-body text-body-md fade-underline">
                            {item.name}
                          </Link>
                          <button
                            aria-label="Remove from wishlist"
                            onClick={() => removeItem(item.id)}
                            className="text-on-surface-variant hover:text-primary transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-label-caps uppercase text-on-surface-variant mt-1">
                          {item.colorway}{item.size ? ` / ${item.size}` : ""}
                        </p>
                        <p className="font-body text-body-md mt-1">${item.price}</p>
                        <button
                          onClick={() => item.inStock && moveToCart(item)}
                          disabled={!item.inStock}
                          className={`mt-3 text-label-caps uppercase rounded-full py-2.5 border transition-colors ${
                            item.inStock
                              ? "border-primary text-primary hover:bg-primary hover:text-on-primary"
                              : "border-outline-variant text-on-surface-variant cursor-not-allowed"
                          }`}
                        >
                          {item.inStock ? "Move to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-outline-variant/60">
                <button
                  onClick={moveAllToCart}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary rounded-full py-4 text-label-caps uppercase hover:bg-secondary transition-colors duration-300"
                >
                  Move All Available to Cart
                </button>
                <p className="text-label-caps text-on-surface-variant text-center mt-3">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

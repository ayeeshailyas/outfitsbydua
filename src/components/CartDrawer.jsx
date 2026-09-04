import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FREE_SHIPPING_THRESHOLD } from "../config";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
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
              <h2 className="font-display text-headline-md">Shopping Bag ({items.length})</h2>
              <button aria-label="Close cart" onClick={closeCart} className="w-8 h-8 flex items-center justify-center">
                ✕
              </button>
            </div>

            {items.length > 0 && (
              <div className="px-6 py-4 border-b border-outline-variant/60">
                <p className="text-label-caps uppercase text-on-surface-variant mb-2">
                  {remaining > 0
                    ? `You are $${remaining.toFixed(0)} away from free shipping`
                    : "You've unlocked free shipping"}
                </p>
                <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                  <p className="font-body text-body-lg text-on-surface-variant">Your bag is empty.</p>
                  <Link
                    to="/women"
                    onClick={closeCart}
                    className="text-label-caps uppercase border-b border-on-surface pb-1"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => (
                    <li key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="w-20 h-24 shrink-0 bg-surface-container-low rounded-sm overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-body text-body-md">{item.name}</h3>
                          <button
                            aria-label="Remove item"
                            onClick={() => removeItem(item.id, item.size, item.color)}
                            className="text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                        <p className="text-label-caps uppercase text-on-surface-variant mt-1">
                          {item.color} / {item.size}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div className="flex items-center border border-outline-variant rounded-full">
                            <button
                              className="w-7 h-7 flex items-center justify-center"
                              onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-6 text-center font-body text-body-md">{item.qty}</span>
                            <button
                              className="w-7 h-7 flex items-center justify-center"
                              onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-body text-body-md">${(item.price * item.qty).toFixed(0)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-outline-variant/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-body-md">Subtotal</span>
                  <span className="font-display text-headline-md">${subtotal.toFixed(0)}</span>
                </div>
                <p className="text-label-caps text-on-surface-variant mb-5">
                  Taxes and shipping calculated at checkout.
                </p>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary rounded-full py-4 text-label-caps uppercase hover:bg-secondary transition-colors duration-300"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0l1 13a1 1 0 001 1h6a1 1 0 001-1l1-13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "futsbydua_cart";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// A cart line is identified by product id + size + color combo.
const lineKey = (item) => `${item.id}__${item.size}__${item.color}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitial);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, { size, color, qty = 1 } = {}) => {
    setItems((prev) => {
      const key = lineKey({ id: product.id, size, color });
      const existing = prev.find((i) => lineKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i) === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.onSale ? product.salePrice : product.price,
          image: product.images[0],
          size: size || product.sizes?.[0],
          color: color || product.colorway,
          qty,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (id, size, color) => {
    setItems((prev) => prev.filter((i) => lineKey(i) !== lineKey({ id, size, color })));
  };

  const updateQty = (id, size, color, qty) => {
    setItems((prev) =>
      prev.map((i) =>
        lineKey(i) === lineKey({ id, size, color }) ? { ...i, qty: Math.max(1, qty) } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    subtotal,
    count,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = (item) => {
    const product = getProductById(item.id);
    if (!product) return;
    addItem(product, { size: item.size, color: item.colorway });
    removeItem(item.id);
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg">My Wishlist</h1>
      <p className="font-body text-body-md text-on-surface-variant mt-3">{items.length} saved items</p>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-body text-body-lg text-on-surface-variant">Nothing saved yet.</p>
          <Link to="/women" className="inline-block mt-4 text-label-caps uppercase border-b border-on-surface pb-1">
            Discover the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-gutter md:gap-y-12 mt-10">
          {items.map((item) => (
            <div key={item.id}>
              <Link to={`/product/${item.id}`} className="block img-hover-zoom rounded-sm bg-surface-container-low aspect-[4/5]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="mt-4">
                <Link to={`/product/${item.id}`} className="font-body text-body-md fade-underline">{item.name}</Link>
                <p className="text-label-caps uppercase text-on-surface-variant mt-1">{item.colorway}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-body text-body-md">${item.price}</span>
                  <button onClick={() => removeItem(item.id)} className="text-label-caps uppercase text-on-surface-variant hover:text-primary">
                    Remove
                  </button>
                </div>
                <button
                  onClick={() => moveToCart(item)}
                  className="w-full mt-3 border border-primary text-primary rounded-full py-2.5 text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-colors duration-300"
                >
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

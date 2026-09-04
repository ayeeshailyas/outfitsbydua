import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProductById, getRelatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { buildWhatsAppLink } from "../config";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product?.sizes?.[0]);
  const [color, setColor] = useState(product?.colorway);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile py-24 text-center">
        <p className="font-display text-headline-md">Product not found.</p>
        <button onClick={() => navigate("/")} className="mt-4 text-label-caps uppercase border-b border-on-surface pb-1">
          Return Home
        </button>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const wishlisted = isWishlisted(product.id);
  const displayPrice = product.onSale ? product.salePrice : product.price;

  const handleAddToCart = () => {
    addItem(product, { size, color });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = `Hi Futsbydua! I'm interested in the ${product.name} (${color}${size ? `, size ${size}` : ""}) — $${displayPrice}. Is it available?`;

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-14">
      <p className="text-label-caps uppercase text-on-surface-variant mb-6">
        <Link to={`/${product.category}`} className="fade-underline">{product.category}</Link> / {product.subcategory} / <span className="text-on-surface">{product.name}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Gallery */}
        <div>
          <div className="rounded-sm overflow-hidden bg-surface-container-low aspect-[4/5]">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 rounded-sm overflow-hidden border ${
                    activeImage === i ? "border-on-surface" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-label-caps uppercase text-secondary mb-2">{product.subcategory}</p>
          <h1 className="font-display text-headline-md md:text-3xl">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3">
            {product.onSale ? (
              <>
                <span className="font-body text-body-lg text-on-surface-variant line-through">${product.price}</span>
                <span className="font-body text-body-lg text-primary">${product.salePrice}</span>
              </>
            ) : (
              <span className="font-body text-body-lg">${product.price}</span>
            )}
          </div>

          <p className="font-body text-body-md text-on-surface-variant mt-6 max-w-md leading-relaxed">
            {product.description}
          </p>

          {product.colors?.length > 1 && (
            <div className="mt-8">
              <p className="text-label-caps uppercase text-on-surface-variant mb-3">Color — {color}</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(product.colorway)}
                    aria-label={`Color swatch`}
                    className="w-8 h-8 rounded-full border-2 border-outline-variant hover:border-on-surface transition-colors"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-label-caps uppercase text-on-surface-variant">Size</p>
                <button className="text-label-caps uppercase fade-underline pb-0.5">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-[48px] px-4 py-2.5 rounded-full border text-body-md transition-colors duration-300 ${
                      size === s
                        ? "bg-primary text-on-primary border-primary"
                        : "border-outline-variant text-on-surface hover:border-on-surface"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-10">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-on-primary rounded-full py-4 text-label-caps uppercase hover:bg-secondary transition-colors duration-300"
            >
              {added ? "Added to Bag ✓" : "Add to Cart"}
            </button>

            <a
              href={buildWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-4 text-label-caps uppercase hover:opacity-90 transition-opacity duration-300"
            >
              Order via WhatsApp
            </a>

            <button
              onClick={() => toggleWishlist(product)}
              className={`w-full rounded-full py-4 text-label-caps uppercase border transition-colors duration-300 ${
                wishlisted ? "border-primary text-primary" : "border-outline-variant text-on-surface hover:border-on-surface"
              }`}
            >
              {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-outline-variant/60 flex flex-col gap-3 text-body-md text-on-surface-variant font-body">
            <p>Complimentary shipping on all orders over $900.</p>
            <p>Free returns within 30 days of delivery.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 md:mt-32">
          <h2 className="font-display text-headline-md md:text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-gutter md:gap-y-12">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

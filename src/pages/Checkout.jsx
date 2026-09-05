import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { BRAND_NAME, buildWhatsAppLink, FREE_SHIPPING_THRESHOLD } from "../config";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", notes: "" });
  const [method, setMethod] = useState("whatsapp");

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const buildOrderMessage = () => {
    const lines = items.map(
      (i) => `• ${i.name} (${i.color}${i.size ? ` / ${i.size}` : ""}) x${i.qty} — $${(i.price * i.qty).toFixed(0)}`
    );
    return [
      `Hi ${BRAND_NAME}! I'd like to place an order:`,
      ``,
      ...lines,
      ``,
      `Subtotal: $${subtotal.toFixed(0)}`,
      `Shipping: ${shipping === 0 ? "Free" : `$${shipping}`}`,
      `Total: $${total.toFixed(0)}`,
      ``,
      `Name: ${form.name || "-"}`,
      `Phone: ${form.phone || "-"}`,
      `Address: ${form.address || "-"}, ${form.city || "-"}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    const link = buildWhatsAppLink(buildOrderMessage());
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleCardCheckout = (e) => {
    e.preventDefault();
    alert("Card payments are launching soon. Please use 'Order via WhatsApp' to complete your purchase today.");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile py-24 text-center">
        <h1 className="font-display text-headline-md">Your bag is empty</h1>
        <p className="font-body text-body-md text-on-surface-variant mt-2">Add something beautiful before checking out.</p>
        <Link to="/women" className="inline-block mt-6 text-label-caps uppercase border-b border-on-surface pb-1">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg mb-10">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12">
        <div>
          <h2 className="text-label-caps uppercase text-on-surface-variant mb-5">Shipping Details</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" name="name" value={form.name} onChange={onChange} required className="sm:col-span-2" />
            <Field label="Phone Number" name="phone" value={form.phone} onChange={onChange} required />
            <Field label="City" name="city" value={form.city} onChange={onChange} required />
            <Field label="Delivery Address" name="address" value={form.address} onChange={onChange} required className="sm:col-span-2" />
            <Field label="Order Notes (optional)" name="notes" value={form.notes} onChange={onChange} className="sm:col-span-2" />
          </form>

          <h2 className="text-label-caps uppercase text-on-surface-variant mt-10 mb-5">Payment Method</h2>
          <div className="flex flex-col gap-3">
            <label
              className={`flex items-center gap-4 border rounded-md px-5 py-4 cursor-pointer transition-colors ${
                method === "whatsapp" ? "border-on-surface bg-surface-container-low" : "border-outline-variant"
              }`}
            >
              <input
                type="radio"
                name="method"
                checked={method === "whatsapp"}
                onChange={() => setMethod("whatsapp")}
                className="accent-on-surface w-4 h-4"
              />
              <div className="flex-1">
                <p className="font-body text-body-md">Order via WhatsApp</p>
                <p className="text-label-caps text-on-surface-variant mt-0.5">
                  Send your order to our team and confirm payment on chat. Fastest way to check out today.
                </p>
              </div>
              <span className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 004.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2z" />
                </svg>
              </span>
            </label>

            <label
              className={`flex items-center gap-4 border rounded-md px-5 py-4 cursor-pointer transition-colors ${
                method === "card" ? "border-on-surface bg-surface-container-low" : "border-outline-variant"
              }`}
            >
              <input
                type="radio"
                name="method"
                checked={method === "card"}
                onChange={() => setMethod("card")}
                className="accent-on-surface w-4 h-4"
              />
              <div className="flex-1">
                <p className="font-body text-body-md">Pay by Card</p>
                <p className="text-label-caps text-on-surface-variant mt-0.5">Secure payment gateway — coming soon.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-surface-container-low rounded-md p-6 h-fit">
          <h2 className="text-label-caps uppercase text-on-surface-variant mb-5">Order Summary</h2>
          <ul className="flex flex-col gap-4 mb-6">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                <div className="w-14 h-16 rounded-sm overflow-hidden shrink-0 bg-surface-container">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-body text-body-md">{item.name}</p>
                  <p className="text-label-caps uppercase text-on-surface-variant">
                    {item.color} / {item.size} × {item.qty}
                  </p>
                </div>
                <p className="font-body text-body-md">${(item.price * item.qty).toFixed(0)}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 border-t border-outline-variant/60 pt-4 font-body text-body-md">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Subtotal</span>
              <span>${subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
            </div>
            <div className="flex justify-between font-display text-headline-md pt-2">
              <span>Total</span>
              <span>${total.toFixed(0)}</span>
            </div>
          </div>

          {method === "whatsapp" ? (
            <button
              onClick={handleWhatsAppOrder}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-4 text-label-caps uppercase hover:opacity-90 transition-opacity duration-300"
            >
              Send Order on WhatsApp
            </button>
          ) : (
            <button
              onClick={handleCardCheckout}
              className="w-full mt-6 bg-primary text-on-primary rounded-full py-4 text-label-caps uppercase hover:bg-secondary transition-colors duration-300"
            >
              Pay ${total.toFixed(0)}
            </button>
          )}
          <p className="text-label-caps text-on-surface-variant text-center mt-3">
            Your order details are only shared once you send the message.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, required, className = "" }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-label-caps uppercase text-on-surface-variant">{label}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-transparent border-b border-outline-variant focus:border-on-surface outline-none py-2 font-body text-body-md transition-colors"
      />
    </label>
  );
}

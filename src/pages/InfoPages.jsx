function InfoLayout({ eyebrow, title, children }) {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-14 md:py-20">
      <p className="text-label-caps uppercase text-secondary mb-3">{eyebrow}</p>
      <h1 className="font-display text-display-lg-mobile md:text-display-lg mb-8">{title}</h1>
      <div className="font-body text-body-lg text-on-surface-variant max-w-2xl flex flex-col gap-5 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function About() {
  return (
    <InfoLayout eyebrow="Our Story" title="About Futsbydua">
      <p>
        Futsbydua was founded on a simple belief: fewer, better things. We design considered
        pieces for women, men and children — built from honest materials, cut with restraint,
        and made to be worn for years rather than seasons.
      </p>
      <p>
        Every collection is developed in small batches with a focus on craftsmanship over
        volume. We work with mills and ateliers who share our commitment to quality and
        responsible production.
      </p>
    </InfoLayout>
  );
}

export function Contact() {
  return (
    <InfoLayout eyebrow="Get in Touch" title="Contact Us">
      <p>Have a question about an order, a piece, or a partnership? We'd love to hear from you.</p>
      <p>Email: hello@futsbydua.com</p>
      <p>WhatsApp: Use the chat icon in the bottom-right corner of any page for the fastest response.</p>
      <p>Studio hours: Monday – Saturday, 10am – 7pm.</p>
    </InfoLayout>
  );
}

export function Shipping() {
  return (
    <InfoLayout eyebrow="Delivery" title="Shipping Information">
      <p>Complimentary standard shipping on all orders over $900.</p>
      <p>Orders below the threshold ship for a flat rate of $25 and typically arrive within 3–7 business days.</p>
      <p>Every order is tracked and insured door-to-door, whether placed through checkout or via WhatsApp.</p>
    </InfoLayout>
  );
}

export function Returns() {
  return (
    <InfoLayout eyebrow="Returns & Exchanges" title="Returns Policy">
      <p>We accept returns within 30 days of delivery for unworn items in original condition with tags attached.</p>
      <p>To start a return, message our team on WhatsApp or email hello@futsbydua.com with your order number.</p>
      <p>Sale items are final sale unless otherwise noted at checkout.</p>
    </InfoLayout>
  );
}

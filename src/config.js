// Update this with the brand's real WhatsApp Business number,
// in international format without symbols, e.g. "923001234567".
export const WHATSAPP_NUMBER = "923001234567";

export const FREE_SHIPPING_THRESHOLD = 900;

export const buildWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

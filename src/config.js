// Update this with the brand's real WhatsApp Business number,
// in international format without symbols, e.g. "923001234567".
export const WHATSAPP_NUMBER = "923366605533";

export const FREE_SHIPPING_THRESHOLD = 900;

export const buildWhatsAppLink = (message) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

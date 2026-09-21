// Centralized business information (NAP) and external links.
// Replace WHATSAPP_NUMBER with the real number before launch.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dryasminbarakat.com";

export const DOCTOR_NAME_AR = "د. ياسمين بركات";
export const DOCTOR_NAME_EN = "Dr. Yasmin Barakat";

// Placeholder — replace with the real WhatsApp number in international format (no "+", no spaces).
export const WHATSAPP_NUMBER = "201015937936";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/dr_yasmine_barakat_nutrition",
  facebook: "https://www.facebook.com/share/19iuJzQ5xc/?mibextid=wwXIfr",
  googleMaps: "https://maps.app.goo.gl/TpTRE5gvntmRY2nh9",
};

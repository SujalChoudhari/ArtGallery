export const SITE_URL = "https://art.sujal.xyz";

/**
 * Configure your WhatsApp phone number here (with international country code, no + or spaces).
 * Can also be overridden via NEXT_PUBLIC_WHATSAPP_PHONE environment variable.
 * Default is configured for India (+91).
 */
export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919999999999";

export interface WhatsAppInquiryParams {
    id: number;
    title: string;
    slug: string;
    price?: number;
    currency?: string;
    currentUrl?: string;
}

/**
 * Generates a WhatsApp click-to-chat URL with a prefilled message containing the artwork title,
 * drawing number, price, and the direct link to the piece.
 */
export function getWhatsAppInquiryUrl({
    id,
    title,
    slug,
    price,
    currency = "₹",
    currentUrl,
}: WhatsAppInquiryParams): string {
    const cleanPhone = WHATSAPP_PHONE.replace(/[^0-9]/g, "");
    const artworkUrl = currentUrl || `${SITE_URL}/art/${slug}`;
    const priceFormatted = price ? `${currency}${price.toLocaleString("en-IN")}` : undefined;

    const lines = [
        `Hi Sujal! I'm interested in purchasing your drawing:`,
        `"${title}" (Drawing no. ${id})`,
        priceFormatted ? `Listed Price: ${priceFormatted}` : null,
        `Artwork link: ${artworkUrl}`,
    ].filter(Boolean);

    const message = lines.join("\n\n");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

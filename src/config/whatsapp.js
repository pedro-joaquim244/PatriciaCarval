import { profissional } from '../data/profissional';

export const WHATSAPP_NUMBER = profissional.whatsapp;
export const WHATSAPP_MESSAGE = profissional.whatsappMessage;

export function getWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '');
  if (!/^55\d{10,11}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

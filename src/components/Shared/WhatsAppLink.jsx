import { getWhatsAppUrl } from '../../config/whatsapp';

export default function WhatsAppLink({ children, className = '', message, ...props }) {
  const href = getWhatsAppUrl(message);
  if (!href) {
    return <span className={`${className} whatsapp-link is-disabled`} aria-disabled="true" title="Configure o número de WhatsApp em src/data/profissional.js" {...props}>{children}</span>;
  }
  return <a className={`${className} whatsapp-link`} href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}


import WhatsAppLink from '../Shared/WhatsAppLink';
import SectionLabel from '../Shared/SectionLabel';
import { profissional } from '../../data/profissional';
import ctaPhoto from '../../assets/optimized/doutora-imagem3.webp';
import '../../styles/cta.css';

export default function CTA() {

  return (
    <section id="contato" className="cta-section" aria-labelledby="cta-title">
      <div className="page-container cta-grid">
        <div className="cta-copy">
        <SectionLabel number="10" data-reveal>ENTRE EM CONTATO</SectionLabel>
        <h2 id="cta-title" data-reveal>Seu primeiro passo<br />pode ser uma <em>conversa.</em></h2>
        <p className="cta-description" data-reveal>Fale diretamente com Patrícia para obter informações sobre os atendimentos, consultar disponibilidade e esclarecer suas dúvidas.</p>
        <div className="contact-options" data-reveal><p className="format-description">Atendimento pelo WhatsApp profissional: {profissional.telefone}.</p><WhatsAppLink className="arrow-link button button-dark cta-button"><span>Agendar pelo WhatsApp</span><i className="bi bi-whatsapp" aria-hidden="true" /></WhatsAppLink></div>
        <span className="cta-note">INFORMAÇÕES DIRETAS, COM CLAREZA E ACOLHIMENTO.</span>
        </div>
        <div className="cta-visual"><div className="cta-brand-panel" data-image-reveal><img src={ctaPhoto} width="1254" height="1254" loading="lazy" decoding="async" alt="Retrato da psicóloga Patrícia Slonski em seu consultório" /></div><p className="cta-photo-note">Seu próximo capítulo<br /><em>pode começar aqui.</em></p></div>
      </div>
    </section>
  );
}

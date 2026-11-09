import locationPhoto from '../../assets/optimized/atendimento-psicologa.webp';
import { profissional } from '../../data/profissional';
import SectionLabel from '../Shared/SectionLabel';
import WhatsAppLink from '../Shared/WhatsAppLink';
import '../../styles/location.css';

export default function Location() {
  return (
    <section id="localizacao" className="location-section section-space" aria-labelledby="location-title">
      <div className="page-container location-grid">
        <figure className="location-visual" data-image-reveal>
          <img src={locationPhoto} width="1143" height="1376" loading="lazy" decoding="async" alt="Patrícia Slonski durante um atendimento psicológico" />
        </figure>
        <div className="location-copy">
          <SectionLabel number="08" data-reveal>LOCALIZAÇÃO</SectionLabel>
          <h2 id="location-title" className="display-title" data-reveal>Consultório em<br /><em>Curitiba — PR.</em></h2>
          <address data-reveal>
            <strong>{profissional.endereco.logradouro}</strong>
            <span>{profissional.endereco.complemento}</span>
            <span>{profissional.endereco.bairro} · {profissional.endereco.cidade} — {profissional.endereco.estado}</span>
            <span>CEP {profissional.endereco.cep}</span>
          </address>
          <p className="location-hours" data-reveal><i className="bi bi-clock" aria-hidden="true" /> {profissional.funcionamentoConfirmado} Confirme os demais horários antes da visita.</p>
          <div className="location-actions" data-reveal>
            <a className="arrow-link button button-dark" href={profissional.googleMapsUrl} target="_blank" rel="noopener noreferrer"><span>Abrir no Google Maps</span><i className="bi bi-geo-alt" aria-hidden="true" /></a>
            <WhatsAppLink className="text-link">Falar pelo WhatsApp <i className="bi bi-whatsapp" aria-hidden="true" /></WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}


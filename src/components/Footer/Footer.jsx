import { profissional } from '../../data/profissional';

import SectionLink from '../Shared/SectionLink';
import WhatsAppLink from '../Shared/WhatsAppLink';
import '../../styles/footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-main">
          <div className="footer-brand">
            <SectionLink section="inicio" className="footer-name" aria-label="Patrícia Slonski — voltar ao início">
              <span>Patrícia</span> <em>Slonski</em>
            </SectionLink>
            <p>Psicóloga — {profissional.crp}</p>
            <small>Atendimento online e presencial.</small>
          </div>

          <nav className="footer-column footer-navigation" aria-label="Navegação do rodapé">
            <p className="eyebrow">EXPLORE</p>
            <SectionLink section="inicio">Início</SectionLink>
            <SectionLink section="sobre">Sobre</SectionLink>
            <SectionLink section="atendimento">Atendimento</SectionLink>
            <SectionLink section="consultorio">Consultório</SectionLink>
            <SectionLink section="avaliacoes">Avaliações</SectionLink>
            <SectionLink section="localizacao">Localização</SectionLink>
          </nav>

          <div className="footer-column footer-contact">
            <div className="footer-column-heading">
              <p className="eyebrow">CONTATO</p>
              <SectionLink section="inicio" className="back-top" aria-label="Voltar ao início da página">
                <i className="bi bi-arrow-up" aria-hidden="true" />
              </SectionLink>
            </div>
            <WhatsAppLink className="footer-contact-link">
              <i className="bi bi-whatsapp" aria-hidden="true" />
              <span>WhatsApp<strong>{profissional.telefone}</strong></span>
            </WhatsAppLink>
            <address className="footer-address">
              <span>{profissional.endereco.logradouro}</span>
              <span>{profissional.endereco.complemento}</span>
              <span>{profissional.endereco.bairro} · {profissional.endereco.cidade} — {profissional.endereco.estado}</span>
            </address>
            <a className="footer-map-link" href={profissional.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Google Maps <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
           
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profissional.nomeCurto}. Todos os direitos reservados.</span>
          <span>Atendimento online e presencial · Curitiba — PR</span>
        </div>
      </div>
    </footer>
  );
}

import { profissional } from '../../data/profissional';
import SectionLabel from '../Shared/SectionLabel';
import WhatsAppLink from '../Shared/WhatsAppLink';
import '../../styles/services.css';

const informationCards = [
  {
    icon: 'bi-door-open',
    title: 'Atendimento presencial',
    text: 'Encontros realizados no consultório profissional de Patrícia Slonski, no bairro Sítio Cercado, em Curitiba.',
    detail: 'Curitiba — Paraná',
  },
  {
    icon: 'bi-camera-video',
    title: 'Atendimento online',
    text: 'Modalidade confirmada para quem busca realizar o atendimento a distância. Consulte disponibilidade e orientações pelo WhatsApp.',
    detail: 'Informações no contato inicial',
  },
  {
    icon: 'bi-chat-heart',
    title: 'Primeiro contato',
    text: 'Converse diretamente com Patrícia para esclarecer dúvidas sobre horários, formatos e como funciona o início do atendimento.',
    detail: profissional.telefone,
  },
];

export default function Services() {
  return (
    <section id="atendimento" className="services-section section-space page-container" aria-labelledby="services-title">
      <div className="section-intro row g-0">
        <SectionLabel number="05" className="col-lg-4" data-reveal>ATENDIMENTOS</SectionLabel>
        <h2 id="services-title" className="display-title col-lg-8" data-reveal>Online ou presencial,<br />o primeiro passo é<br /><em>uma conversa.</em></h2>
      </div>
      <div className="service-info-grid">
        {informationCards.map((card, index) => (
          <article className="service-info-card" data-reveal key={card.title}>
            <span className="service-number" aria-hidden="true">0{index + 1}</span>
            <i className={`bi ${card.icon}`} aria-hidden="true" />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <span className="service-card-detail">{card.detail}</span>
          </article>
        ))}
      </div>
      <div className="services-booking-cta" data-reveal>
        <div><span className="eyebrow">INFORMAÇÕES PROFISSIONAIS</span><p>Abordagem terapêutica, formação e públicos atendidos serão adicionados após confirmação direta com a profissional.</p></div>
        <WhatsAppLink className="arrow-link button button-dark"><span>Falar com Patrícia</span><i className="bi bi-whatsapp" aria-hidden="true" /></WhatsAppLink>
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import SectionLabel from '../Shared/SectionLabel';
import WhatsAppLink from '../Shared/WhatsAppLink';
import AudienceItem from './AudienceItem';
import { profissional } from '../../data/profissional';

const topics = profissional.camposPendentes;

export default function Audience() {
  const [opened, setOpened] = useState(null);
  const buttons = useRef([]);
  const navigateTopics = (event, index) => {
    const destinations = { ArrowDown: (index + 1) % topics.length, ArrowUp: (index - 1 + topics.length) % topics.length, Home: 0, End: topics.length - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    buttons.current[destinations[event.key]]?.focus();
  };

  return (
    <section className="audience-section section-space page-container" aria-labelledby="audience-title">
      <div className="row g-0 justify-content-between">
        <div className="col-lg-6">
          <SectionLabel number="07" data-reveal>PRÓXIMAS ATUALIZAÇÕES</SectionLabel>
          <h2 id="audience-title" className="display-title" data-reveal>Um espaço pronto<br />para receber os<br /><em>dados definitivos.</em></h2>
          <p className="audience-description" data-reveal>Estes campos permanecem reservados até que as informações profissionais sejam confirmadas:</p>
        </div>
        <div className="col-lg-5">
          <ul className="audience-list">
            {topics.map((topic, index) => <AudienceItem key={topic.titulo} topic={{ title: topic.titulo, description: topic.descricao }} index={index} opened={opened === index}
              buttonRef={element => { buttons.current[index] = element; }}
              onToggle={() => setOpened(current => current === index ? null : index)}
              onKeyDown={event => navigateTopics(event, index)} />)}
          </ul>
          <p className="audience-footnote">Nenhum dado pendente é apresentado como fato nesta demonstração.</p>
          <WhatsAppLink className="text-link audience-cta">Falar com Patrícia <i className="bi bi-whatsapp" aria-hidden="true" /></WhatsAppLink>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../../lib/motion';
import SectionLabel from '../Shared/SectionLabel';
import { profissional } from '../../data/profissional';
import '../../styles/faq.css';

const questions = [
  ['Onde fica o consultório?', `Na ${profissional.endereco.textoCompleto}. O botão de localização abre o perfil público no Google Maps.`],
  ['Quais são os horários de funcionamento?', `${profissional.funcionamentoConfirmado} Os demais dias e horários devem ser confirmados diretamente pelo WhatsApp antes da visita.`],
  ['Há atendimento online?', 'Sim. As modalidades online e presencial estão confirmadas. Entre em contato com Patrícia para consultar disponibilidade e orientações para cada formato.'],
  ['Quais especialidades são atendidas?', 'As especialidades, a abordagem terapêutica e os públicos atendidos ainda não foram confirmados para publicação neste site.'],
  ['Como posso entrar em contato?', `Use os botões de WhatsApp do site para enviar uma mensagem ao número profissional ${profissional.telefone}.`],
];

export default function FAQ() {
  const [opened, setOpened] = useState(0);
  const buttonRefs = useRef([]);

  useEffect(() => {
    // A resposta altera a posição do contato e dos seus reveals.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [opened]);

  const navigateQuestions = (event, index) => {
    const destinations = { ArrowDown: (index + 1) % questions.length, ArrowUp: (index - 1 + questions.length) % questions.length, Home: 0, End: questions.length - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    buttonRefs.current[destinations[event.key]]?.focus();
  };
  return (
    <section id="faq" className="faq-section section-space page-container" aria-labelledby="faq-title">
      <div className="row g-0 justify-content-between">
        <div className="col-lg-5">
          <SectionLabel number="09" data-reveal>DÚVIDAS FREQUENTES</SectionLabel>
          <h2 id="faq-title" className="display-title" data-reveal>Antes de começar,<br />algumas dúvidas<br />são <em>naturais.</em></h2>
          <p className="faq-intro" data-reveal>Conhecer o processo também<br />faz parte de se sentir à vontade.</p>
        </div>
        <div className="col-lg-6 faq-list">
          {questions.map(([question, answer], index) => (
            <div key={question} className={`faq-item ${opened === index ? 'is-open' : ''}`}>
              <h3>
                <button ref={(element) => { buttonRefs.current[index] = element; }} type="button" id={`faq-question-${index}`} aria-expanded={opened === index} aria-controls={`faq-answer-${index}`} onKeyDown={(event) => navigateQuestions(event, index)} onClick={() => setOpened(opened === index ? null : index)}>
                  <span className="faq-number">0{index + 1}</span><span>{question}</span>
                  <i className="bi bi-plus-lg faq-plus" aria-hidden="true" />
                </button>
              </h3>
              <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className="faq-answer" hidden={opened !== index}><p>{answer}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

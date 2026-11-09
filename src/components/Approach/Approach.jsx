import { useRef } from 'react';
import { images } from '../../config/site';
import { ScrollTrigger, useScrollScene } from '../../lib/motion';
import Photo from '../Shared/Photo';
import SectionLabel from '../Shared/SectionLabel';
import '../../styles/approach.css';

const steps = [
  { title: 'Registro profissional', text: 'O número do CRP será publicado somente após confirmação e validação.', note: 'INFORMAÇÃO EM CONFIRMAÇÃO.', image: images.listening },
  { title: 'Abordagem terapêutica', text: 'A abordagem de trabalho será apresentada quando os dados definitivos forem fornecidos.', note: 'CONTEÚDO RESERVADO PARA ATUALIZAÇÃO.', image: images.understanding },
  { title: 'Modalidades e especialidades', text: 'Formatos de atendimento, públicos e especialidades ainda não estão sendo apresentados como fatos.', note: 'TRANSPARÊNCIA ANTES DE PUBLICAR.', image: images.growth },
];

function animateApproach({ desktop, reduced }, root) {
  if (!desktop || reduced) return;
  const items = [...root.querySelectorAll('.approach-step')];
  const photos = [...root.querySelectorAll('.approach-image')];
  const indicators = [...root.querySelectorAll('.approach-indicator')];
  const counter = root.querySelector('.approach-current');
  const caption = root.querySelector('.approach-image-label');
  root.classList.add('story-enabled');
  const activate = (index) => {
    items.forEach((item, i) => item.classList.toggle('is-active', i === index));
    photos.forEach((photo, i) => photo.classList.toggle('is-active', i === index));
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('is-active', i === index);
      if (i === index) indicator.setAttribute('aria-current', 'step');
      else indicator.removeAttribute('aria-current');
    });
    counter.textContent = `0${index + 1}`;
    caption.textContent = steps[index].note;
  };
  items.forEach((item, index) => ScrollTrigger.create({
    trigger: item, start: 'top 45%', end: 'bottom 45%',
    onEnter: () => activate(index), onEnterBack: () => activate(index),
  }));
  return () => { activate(0); root.classList.remove('story-enabled'); };
}

export default function Approach() {
  const ref = useRef(null);
  useScrollScene(ref, animateApproach);
  const goToStep = (index) => {
    const item = ref.current.querySelectorAll('.approach-step')[index];
    window.scrollTo({
      top: window.scrollY + item.getBoundingClientRect().top - window.innerHeight * .35,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };
  return (
    <section id="informacoes" ref={ref} className="approach-section section-space" aria-labelledby="approach-title">
      <div className="page-container approach-grid">
        <div className="approach-sticky">
          <SectionLabel number="04">INFORMAÇÕES PROFISSIONAIS</SectionLabel>
          <h2 id="approach-title" className="display-title">Uma apresentação<br />construída com<br /><em>transparência.</em></h2>
          <div className="approach-images" aria-hidden="true">
            {steps.map((step, index) => <Photo image={step.image} sizes="(max-width: 650px) 100vw, (max-width: 1600px) 45vw, 680px" key={step.title} className={`approach-image ${index === 0 ? 'is-active' : ''}`} alt="" />)}
            <span className="approach-image-label">{steps[0].note}</span>
          </div>
          <div className="approach-progress">
            <span aria-hidden="true"><span className="approach-current">01</span><span className="approach-total"> / 03</span></span>
            <div role="group" aria-label="Informações profissionais pendentes">
              {steps.map((step, index) => <button key={step.title} type="button" className={`approach-indicator ${index === 0 ? 'is-active' : ''}`} aria-label={`Ver informação 0${index + 1}: ${step.title}`} aria-current={index === 0 ? 'step' : undefined} onClick={() => goToStep(index)} />)}
            </div>
          </div>
        </div>
        <div className="approach-steps">
          {steps.map((step, index) => (
            <article className={`approach-step ${index === 0 ? 'is-active' : ''}`} key={step.title}>
              <span className="step-number" aria-hidden="true">0{index + 1}</span>
              <div className="step-copy"><h3>{step.title}</h3><p>{step.text}</p><span className="eyebrow step-note">{step.note}</span></div>
              <i className="bi bi-arrow-down-right" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

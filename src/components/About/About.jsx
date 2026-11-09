import { useRef } from 'react';
import aboutPhoto from '../../assets/optimized/doutora-imagem2.webp';
import { profissional } from '../../data/profissional';
import Photo from '../Shared/Photo';
import ArrowLink from '../Shared/ArrowLink';
import SectionLabel from '../Shared/SectionLabel';
import { gsap, useScrollScene } from '../../lib/motion';
import '../../styles/about.css';

const aboutImage = {
  src: aboutPhoto,
  width: 1254,
  height: 1254,
  alt: 'Retrato da psicóloga Patrícia Slonski usando roupa clara',
  position: '50% 20%',
};

function animatePortraits({ desktop, tablet, reduced }, root) {
  if (reduced) return;
  const portrait = root.querySelector('.portrait-frame');
  const detailPhoto = root.querySelector('.about-detail-photo');
  const detail = root.querySelector('.about-detail');
  const reveal = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 85%', end: 'center 60%', scrub: 1 } })
    .fromTo(portrait, { clipPath: 'inset(35% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'none' });
  if (detailPhoto) reveal.fromTo(detailPhoto, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: .7, ease: 'none' }, .25);
  if (desktop || tablet) {
    const parallax = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1 } })
      .fromTo('.portrait-frame img', { yPercent: -3, scale: 1.1 }, { yPercent: 3, scale: 1.1, ease: 'none' }, 0);
    if (detail) parallax.fromTo(detail, { y: desktop ? 45 : 16 }, { y: desktop ? -45 : -16, ease: 'none' }, 0);
  }
}

export default function About() {
  const ref = useRef(null);
  useScrollScene(ref, animatePortraits);
  return (
    <section id="sobre" ref={ref} className="about-section section-space" aria-labelledby="about-title">
      <div className="page-container row align-items-center g-0 justify-content-between">
        <div className="col-lg-5 about-visual">
          <span className="portrait-number" aria-hidden="true">03</span><span className="portrait-side-label eyebrow">PSICÓLOGA · CURITIBA</span>
          <figure className="portrait-frame"><Photo image={aboutImage} sizes="(max-width: 650px) 90vw, (max-width: 1600px) 40vw, 580px" /></figure>
          <div className="portrait-caption"><span>{profissional.nomeCurto}</span><span className="eyebrow">{profissional.crp}</span></div>
        </div>
        <div className="col-lg-6 about-copy"><SectionLabel number="03" data-reveal>SOBRE A PSICÓLOGA</SectionLabel><h2 id="about-title" className="display-title" aria-label={profissional.sobre.titulo} data-reveal>{profissional.sobre.tituloLinhas.slice(0, -1).map((linha) => <span key={linha}>{linha}<br />{' '}</span>)}<em>{profissional.sobre.tituloLinhas.at(-1)}</em></h2><div className="about-body" data-reveal><p>{profissional.sobre.texto}</p><p>{profissional.sobre.complemento}</p></div><div className="about-credentials" data-reveal><span>{profissional.crp}<small>Registro profissional confirmado</small></span><span>Online e presencial<small>Consultório em Curitiba</small></span></div><ArrowLink className="text-link" href="#atendimento">Conheça os atendimentos</ArrowLink></div>
      </div>
    </section>
  );
}

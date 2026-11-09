import { useRef } from 'react';
import heroPhoto from '../../assets/optimized/doutora-imagem1.webp';
import { profissional } from '../../data/profissional';
import { gsap, useScrollScene } from '../../lib/motion';
import WhatsAppLink from '../Shared/WhatsAppLink';
import CircularBadge from '../Shared/CircularBadge';
import Photo from '../Shared/Photo';
import FloralMark from '../Shared/FloralMark';
import '../../styles/hero.css';

const heroImage = {
  src: heroPhoto,
  width: 1254,
  height: 1254,
  alt: 'Retrato da psicóloga Patrícia Slonski usando roupa vermelha',
  position: '50% 30%',
};

function animateHero({ desktop, reduced }, root) {
  if (reduced) return;
  const photo = root.querySelector('.hero-photo');
  const photoImage = photo?.querySelector('img');
  if (!photo || !photoImage) return;

  if (!desktop) {
    gsap.fromTo(photoImage, { scale: 1.07 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: photo, start: 'top 80%', end: 'bottom 20%', scrub: true, invalidateOnRefresh: true },
    });
    return;
  }
  const timeline = gsap.timeline({
    scrollTrigger: {
      id: 'hero-expand', trigger: root, start: 'top top', end: () => `+=${Math.round(root.clientHeight * .82)}`,
      scrub: 1, pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
    }
  });
  // Medidas sem transformações mantêm o cálculo estável ao redimensionar.
  timeline.to('.hero-copy', { y: -32, autoAlpha: 0, duration: 0.45, ease: 'none' }, 0)
    .to('.hero-meta, .photo-note, .hero-side-note, .hero-badge', { autoAlpha: 0, duration: 0.3, ease: 'none' }, 0)
    .to(photo, {
      x: () => root.getBoundingClientRect().left - photo.getBoundingClientRect().left,
      y: () => root.getBoundingClientRect().top - photo.getBoundingClientRect().top,
      width: () => root.clientWidth,
      height: () => root.clientHeight,
      borderRadius: 0,
      duration: 1, ease: 'none',
    }, 0.08)
    .fromTo(photoImage, { scale: 1.025 }, { scale: 1, duration: 1, ease: 'none' }, 0.08)
    .fromTo('.hero-photo-shade', { opacity: 0 }, { opacity: 0.92, duration: 0.5 }, 0.65)
    .fromTo('.hero-photo-message', { opacity: 0, y: 25 }, { opacity: .72, y: 0, duration: 0.3 }, .62);
}

export default function Hero() {
  const ref = useRef(null);
  useScrollScene(ref, animateHero);
  return (
    <section id="inicio" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><FloralMark /> PSICÓLOGA · {profissional.crp} · CURITIBA</p>
          <h1 id="hero-title" aria-label={profissional.hero.titulo}>
            <span>{profissional.hero.tituloInicio} </span>
            <em>{profissional.hero.tituloDestaque}</em>
            <span> {profissional.hero.tituloFim}</span>
          </h1>
          <p className="hero-description">{profissional.hero.subtitulo}</p>
          <div className="hero-actions"><WhatsAppLink className="arrow-link button button-dark"><span>Entre em contato</span><i className="bi bi-whatsapp" aria-hidden="true" /></WhatsAppLink><a className="text-link" href="#localizacao">Conheça o consultório <i className="bi bi-arrow-down" aria-hidden="true" /></a></div>
          <ul className="hero-trust-list" aria-label="Informações profissionais"><li><i className="bi bi-camera-video" aria-hidden="true" /> Atendimento online e presencial</li><li><i className="bi bi-geo-alt" aria-hidden="true" /> {profissional.localizacao}</li></ul>
        </div>
        <figure className="hero-photo">
          <Photo image={heroImage} loading="eager" fetchPriority="high" sizes="(max-width: 650px) 100vw, 50vw" />
          <div className="hero-photo-shade" />
        </figure>
      </div>
      <CircularBadge className="hero-badge" />
      <span className="photo-note">Patrícia Slonski · Psicóloga</span>
      <span className="hero-side-note" aria-hidden="true">PRESENÇA. ESCUTA. CUIDADO.</span>
      <div className="hero-photo-message" aria-hidden="true"><span className="eyebrow">SEU TEMPO. SEU ESPAÇO.</span><p>Você pode<br /><em>simplesmente ser.</em></p></div>
      <div className="hero-meta"><span>{profissional.crp} <span className="meta-divider">/</span> CURITIBA</span><a href="#processo">CONTINUE A CONHECER. <span className="scroll-circle"><i className="bi bi-arrow-down" aria-hidden="true" /></span></a><span className="hero-index">01 — 10</span></div>
    </section>
  );
}

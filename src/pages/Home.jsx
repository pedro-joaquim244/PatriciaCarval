import { useEffect, useRef } from 'react';

import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Process from '../components/Process/Process';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import FAQ from '../components/FAQ/FAQ';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';
import MobileContact from '../components/MobileContact/MobileContact';
import EditorialMarquee from '../components/EditorialMarquee/EditorialMarquee';
import Credentials from '../components/Credentials/Credentials';
import Reviews from '../components/Reviews/Reviews';
import Location from '../components/Location/Location';
import BrandSignature from '../components/BrandSignature/BrandSignature';
import Office from '../components/Office/Office';

import { gsap, ScrollTrigger, useScrollScene } from '../lib/motion';

function animatePage({ desktop, reduced }, root) {
  if (reduced) return;
  // Um reveal agrupado por composição, em vez de um ScrollTrigger por texto.
  gsap.utils.toArray('main section', root).forEach((section) => {
    const elements = section.querySelectorAll('[data-reveal]');
    if (elements.length) gsap.from(elements, { y: desktop ? 24 : 12, opacity: 0, stagger: .07, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 86%', once: true } });
  });
  gsap.utils.toArray('.process-section, .manifesto-section', root).forEach((section) => {
    gsap.from(section.querySelectorAll('[data-line]'), { y: desktop ? 45 : 16, x: (index) => desktop ? (index % 2 ? 24 : -24) : 0, opacity: .25, stagger: .2, ease: 'none', scrollTrigger: { trigger: section, start: 'top 78%', end: 'center 55%', scrub: 1 } });
  });
  gsap.utils.toArray('[data-image-reveal]', root).forEach((element) => {
    gsap.fromTo(element, { clipPath: 'inset(10% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'none', scrollTrigger: { trigger: element, start: 'top 90%', end: 'top 35%', scrub: 1 } });
  });
  gsap.utils.toArray('[data-badge-ring]', root).forEach((element) => {
    gsap.to(element, { rotation: desktop ? 100 : 30, transformOrigin: '50% 50%', ease: 'none', scrollTrigger: { trigger: element.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
}

export default function Home() {
  const ref = useRef(null);

  useScrollScene(ref, animatePage);
  useEffect(() => {
    let disposed = false;
    let frame;
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    const scheduleRefresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(refresh);
    };
    const onImageLoad = (event) => {
      if (event.target instanceof HTMLImageElement) scheduleRefresh();
    };
    // O navegador já restaura hashes e a posição do histórico. Reaplicar o
    // hash depois do carregamento das fontes fazia a página voltar para uma
    // seção enquanto a pessoa já estava rolando.
    document.fonts.ready.then(() => { if (!disposed) scheduleRefresh(); });
    ref.current?.addEventListener('load', onImageLoad, true);
    window.addEventListener('load', scheduleRefresh);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      ref.current?.removeEventListener('load', onImageLoad, true);
      window.removeEventListener('load', scheduleRefresh);
    };
  }, []);
  return (
    <div ref={ref}>
      <Navbar />
      <main id="conteudo" tabIndex={-1}>
        <Hero /><Process /><EditorialMarquee /><About /><Credentials />
        <BrandSignature /><Services /><Office /><Reviews /><Location /><FAQ /><CTA />
      </main>
      <Footer /><MobileContact />
    </div>
  );
}

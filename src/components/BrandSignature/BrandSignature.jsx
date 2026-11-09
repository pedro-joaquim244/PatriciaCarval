import banner from '../../assets/optimized/banner.webp';
import SectionLabel from '../Shared/SectionLabel';
import '../../styles/brand-signature.css';

export default function BrandSignature() {
  return (
    <section className="brand-signature section-space" aria-labelledby="brand-signature-title">
      <div className="page-container">
        <div className="brand-signature-intro">
          <SectionLabel number="04" data-reveal>IDENTIDADE PROFISSIONAL</SectionLabel>
          <h2 id="brand-signature-title" data-reveal>Uma marca construída em torno de presença, cuidado e escuta.</h2>
        </div>
        <figure className="brand-banner" data-image-reveal>
          <img src={banner} width="1774" height="887" loading="lazy" decoding="async" alt="Banner oficial de Patrícia Slonski, psicóloga, CRP 08/24593" />
        </figure>
      </div>
    </section>
  );
}


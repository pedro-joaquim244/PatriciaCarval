import officeOne from '../../assets/optimized/escritorio1.webp';
import officeTwo from '../../assets/optimized/escritorio2.webp';
import SectionLabel from '../Shared/SectionLabel';
import '../../styles/office.css';

const officeImages = [
  {
    src: officeOne,
    width: 1229,
    height: 1280,
    alt: 'Poltrona e planta no consultório de Patrícia Slonski',
    caption: 'Um espaço reservado e acolhedor.',
  },
  {
    src: officeTwo,
    width: 1113,
    height: 1414,
    alt: 'Duas poltronas e mesa no consultório de Patrícia Slonski',
    caption: 'Consultório no bairro Sítio Cercado, em Curitiba.',
  },
];

export default function Office() {
  return (
    <section id="consultorio" className="office-section section-space" aria-labelledby="office-title">
      <div className="page-container">
        <div className="office-heading">
          <SectionLabel number="06" data-reveal>O CONSULTÓRIO</SectionLabel>
          <h2 id="office-title" className="display-title" data-reveal>Um ambiente pensado<br />para <em>acolher você.</em></h2>
          <p data-reveal>Fotografias reais do espaço de atendimento presencial em Curitiba.</p>
        </div>
        <div className="office-gallery">
          {officeImages.map((image) => (
            <figure className="office-photo" data-image-reveal key={image.src}>
              <img src={image.src} width={image.width} height={image.height} loading="lazy" decoding="async" alt={image.alt} />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


import { profissional } from '../../data/profissional';
import SectionLabel from '../Shared/SectionLabel';
import '../../styles/reviews.css';

function Stars() {
  return (
    <span className="review-stars" aria-label="5 de 5 estrelas">
      {[...Array(5)].map((_, index) => <i className="bi bi-star-fill" aria-hidden="true" key={index} />)}
    </span>
  );
}

export default function Reviews() {
  return (
    <section id="avaliacoes" className="reviews-section section-space" aria-labelledby="reviews-title">
      <div className="page-container">
        <div className="reviews-heading">
          <div>
            <SectionLabel number="07" data-reveal>AVALIAÇÕES PÚBLICAS</SectionLabel>
            <h2 id="reviews-title" className="display-title" data-reveal>Confiança construída<br />em cada <em>encontro.</em></h2>
          </div>
          <div className="reviews-score" data-reveal>
            <strong>{profissional.avaliacao.nota}</strong>
            <div><Stars /><span>{profissional.avaliacao.total} avaliações no Google Maps</span></div>
          </div>
        </div>

        <div className="review-grid">
          {profissional.avaliacoes.map((avaliacao, index) => (
            <figure className="review-card" data-reveal key={avaliacao.autor}>
              <span className="review-index" aria-hidden="true">0{index + 1}</span>
              <Stars />
              <blockquote>“{avaliacao.texto}”</blockquote>
              <figcaption>
                <strong>{avaliacao.autor}</strong>
                <span>Avaliação pública · {avaliacao.origem}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="reviews-source">
          <p>{profissional.avaliacao.observacao} As avaliações refletem experiências individuais e não representam promessa de resultado.</p>
          <a href={profissional.googleMapsUrl} target="_blank" rel="noopener noreferrer">Ver perfil no Google Maps <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}


import { informacoesResumo } from '../../data/profissional';

export default function Credentials() {
  return (
    <section className="credentials-section page-container" aria-label="Informações profissionais">
      <dl className="credentials-list">{informacoesResumo.map(([label, value]) => <div key={label}><dt className="eyebrow">{label}</dt><dd>{value}</dd></div>)}</dl>
    </section>
  );
}

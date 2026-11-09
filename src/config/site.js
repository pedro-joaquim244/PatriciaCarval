import imageManifest from './image-manifest.json';

// Base correta para funcionar tanto localmente quanto no GitHub Pages.
const BASE_URL = import.meta.env.BASE_URL;

// Fontes preservadas em public/images; variantes geradas por npm run images:prepare.
function photo(name, alt, position = 'center') {
  const asset = imageManifest[name];
  return {
    src: `${BASE_URL}${asset.src}`,
    srcSet: asset.variants.map(variant => `${BASE_URL}${variant.src} ${variant.width}w`).join(', '),
    width: asset.width, height: asset.height, alt, position,
  };
}

export const images = {
  hero: photo('sala', 'Sala acolhedora com sofá de linho, plantas e luz natural', '48% 55%'),
  portrait: photo('botanica', 'Composição botânica provisória, sem representar a profissional', '50% 50%'),
  detail: photo('escrita', 'Caderno aberto e uma xícara sobre uma mesa de madeira'),
  listening: photo('escuta', 'Poltrona clara com manta e uma mesa lateral junto à janela', '60% 55%'),
  understanding: photo('escrita', 'Caderno aberto e uma xícara sobre uma mesa de madeira', '50% 60%'),
  growth: photo('caminho', 'Caminho entre árvores e vegetação iluminado pela luz da manhã'),
  inPerson: photo('presencial', 'Ambiente ilustrativo com poltronas, sofá e plantas'),
  online: photo('online', 'Notebook em uma mesa junto à janela, em composição ilustrativa'),
  nature: photo('natureza', 'Luz do sol atravessando as árvores de uma floresta verde'),
  closing: photo('recomeco', 'Porta aberta para um jardim tranquilo iluminado pelo sol'),
};

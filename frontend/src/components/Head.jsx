import { Helmet } from 'react-helmet-async';

function Head({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
      <title>LandMark - Marketing Agency</title>
      <meta name="description" content="Agence marketing digital au Maroc, Landmark vous accompagne en branding, contenu et stratégie à Oujda, Casablanca et Tanger." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}

export default Head;
import { Helmet } from 'react-helmet-async';

function Head({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
      <title>LandMark - Marketing Agency</title>
      <meta name="description" content="Page de services de Landmark. Découvrez nos solutions pour booster votre marque." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}

export default Head;
export const URL = 'https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/';

export const fontainesEndpointExport = URL + 'fontaines-a-boire/exports/json';
export const fontainesEndpoint = URL + 'fontaines-a-boire/records?select=no_voirie_pair%2C%20no_voirie_impair%2C%20voie%2C%20commune&refine=dispo%3AOUI&limit=100';

export const activitesEndpointExport = URL + 'ilots-de-fraicheur-equipements-activites/exports/json';
export const activitesEndpoint = URL + 'ilots-de-fraicheur-equipements-activites/records?select=nom%2C%20type%2C%20payant%2C%20adresse%2C%20arrondissement&limit=100';

export const espacesEndpointExport = URL + 'ilots-de-fraicheur-espaces-verts-frais/exports/json';
export const espacesEndpoint = URL + 'ilots-de-fraicheur-espaces-verts-frais/records?select=nom%2C%20type%2C%20adresse%2C%20arrondissement&limit=100';
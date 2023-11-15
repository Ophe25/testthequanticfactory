export const URL = 'https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/';

export const fontainesEndpointExport = URL + 'fontaines-a-boire/exports/json';
export const fontainesEndpoint = URL + 'fontaines-a-boire/records?select=no_voirie_pair%2C%20no_voirie_impair%2C%20voie%2C%20commune&refine=dispo%3AOUI';

export const activitesEndpointExport = URL + 'ilots-de-fraicheur-equipements-activites/exports/json';
export const activitesEndpoint = URL + 'ilots-de-fraicheur-equipements-activites/records';

export const espacesEndpointExport = URL + 'ilots-de-fraicheur-espaces-verts-frais/exports/json';
export const espacesEndpoint = URL + 'ilots-de-fraicheur-espaces-verts-frais/records';
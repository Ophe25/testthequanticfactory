import { fontainesEndpoint, activitesEndpoint, espacesEndpoint, fontainesEndpointExport, activitesEndpointExport, espacesEndpointExport } from './constantes';

function api() {

    // Fontaines

    const getFontainesExport = () => {
        var url = fontainesEndpointExport

        return fetch(url, {
            type: "GET",
        }).then((res) => res.json());
    };

    const getFontaines = (filtres) => {
        var url = fontainesEndpoint
        if (Array.isArray(filtres)) {
            url += '&'
            filtres.forEach((filtre, index) => {
                url += filtre.name + '=' + filtre.value
                if (index !== (filtres.length - 1)) {
                    url += '&'
                }
            });
        }
        return fetch(url, {
            type: "GET",
        }).then((res) => res.json());
    };

    // Activités


    const getActivitesExport = () => {
        var url = activitesEndpointExport

        return fetch(url, {
            type: "GET",
        }).then((res) => res.json());
    };

    const getActivites = (filtres) => {
        var url = activitesEndpoint
        if (Array.isArray(filtres)) {
            url += '?'
            filtres.forEach((filtre, index) => {
                url += filtre.name + '=' + filtre.value
                if (index !== (filtres.length - 1)) {
                    url += '&'
                }
            });
        }
        return fetch(url, {
            type: "GET",
        }).then((res) => res.json());
    };

    // Espaces verts frais

    const getEspacesExport = () => {
        var url = espacesEndpointExport

        return fetch(url, {
            type: "GET",
        }).then((res) => res.json());
    };

    const getEspaces = (filtres) => {
        var url = espacesEndpoint
        if (Array.isArray(filtres)) {
            url += '?'
            filtres.forEach((filtre, index) => {
                url += filtre.name + '=' + filtre.value
                if (index !== (filtres.length - 1)) {
                    url += '&'
                }
            });
        }
        return fetch(url, {
            type: "GET",
        }).then((res) => res.json());
    };

    return {
        getFontaines,
        getFontainesExport,

        getActivites,
        getActivitesExport,

        getEspacesExport,
        getEspaces,
    };
}

export default api();
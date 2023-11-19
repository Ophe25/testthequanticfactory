import api from "../API/api"


export function getFontainesFiltre(filtres) {

    api.getFontaines(filtres).then((json) => {
        return json
    })
}


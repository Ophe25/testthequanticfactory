import api from "../API/api"


export function getFontainesFiltre(filtres) {

    api.getFontaines(filtres).then((json) => {
        console.log('test', json)
        return json
    })
}


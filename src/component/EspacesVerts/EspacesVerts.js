import { useEffect, useState } from 'react';
import { getFontainesFiltre } from '../../utilities/utils';
import api from '../../API/api';

function EspacesVerts() {

    const [currentFiltres, setCurrentFiltres] = useState([]);
    const [filtresArrondissement, setFiltresArrondissement] = useState([]);
    const [filtresType, setFiltresType] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [espaces, setEspaces] = useState([]);

    // api.getFontaines('refine=dispo:NON').then((json) => {
    //     console.log('test', json)
    // })



    useEffect(() => {
        api.getEspacesExport().then((espaces) => {
            console.log('test', espaces)

            var filtreArrondissement = []
            var filtreType = []
            espaces.forEach(espace => {
                if (filtreArrondissement.indexOf(espace.arrondissement) === -1) {
                    filtreArrondissement.push(espace.arrondissement)
                }
                if (filtreType.indexOf(espace.type) === -1) {
                    filtreType.push(espace.type)
                }
            });

            setFiltresArrondissement(filtreArrondissement)
            setFiltresType(filtreType)
            setCurrentFiltres([])
            setIsMounted(true)
        })
    }, []);

    useEffect(() => {
        api.getEspaces(currentFiltres).then((espaces) => {
            setEspaces(espaces);
        })
    }, [currentFiltres]);

    function _filtreEspaces(name, value) {
        console.log('filtres', currentFiltres)

        const index = currentFiltres.findIndex((filtre) => filtre.value === value)

        var filtreCpy = [...currentFiltres]

        if (index !== -1) {
            filtreCpy.splice(index, 1)
        } else {
            filtreCpy.push({ name, value })
        }
        setCurrentFiltres(filtreCpy)

    }
    console.log('test', espaces)




    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <p>Type</p>
                {filtresType.map(filtreType => <p onClick={() => {
                    _filtreEspaces('refine', 'type:"' + filtreType + '"')
                }}>{filtreType}</p>)}
            </div>
            <div style={{ marginLeft: 20, marginRight: 20 }}>
                <p>Arrondissements</p>
                {filtresArrondissement.map(filtreArrondissement => <p onClick={() => {
                    _filtreEspaces('refine', 'arrondissement:"' + filtreArrondissement + '"')
                }}>{filtreArrondissement}</p>)}
            </div>
        </div>
    );
}

export default EspacesVerts;

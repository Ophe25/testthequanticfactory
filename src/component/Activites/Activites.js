import { useEffect, useState } from 'react';
import { getFontainesFiltre } from '../../utilities/utils';
import api from '../../API/api';

function Activites() {

    const [currentFiltres, setCurrentFiltres] = useState([]);
    const [filtresArrondissement, setFiltresArrondissement] = useState([]);
    const [filtresType, setFiltresType] = useState([]);
    const [filtresPayant, setFiltresPayant] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [activites, setActivites] = useState([]);

    // api.getFontaines('refine=dispo:NON').then((json) => {
    //     console.log('test', json)
    // })



    useEffect(() => {
        api.getActivitesExport().then((activites) => {
            // console.log('test', activites)

            var filtreArrondissement = []
            var filtreType = []
            var filtrePayant = []
            activites.forEach(activite => {
                if (filtreArrondissement.indexOf(activite.arrondissement) === -1) {
                    filtreArrondissement.push(activite.arrondissement)
                }
                if (filtreType.indexOf(activite.type) === -1) {
                    filtreType.push(activite.type)
                }
                if (filtrePayant.indexOf(activite.payant) === -1) {
                    filtrePayant.push(activite.payant)
                }
            });

            setFiltresArrondissement(filtreArrondissement)
            setFiltresType(filtreType)
            setFiltresPayant(filtrePayant)
            setCurrentFiltres([])
            setIsMounted(true)
        })
    }, []);

    useEffect(() => {
        api.getActivites(currentFiltres).then((activites) => {
            setActivites(activites);
        })
    }, [currentFiltres]);

    function _filtreActivites(name, value) {
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
    console.log('test', activites)




    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <p>Type</p>
                {filtresType.map(filtreType => <p onClick={() => {
                    _filtreActivites('refine', 'type:"' + filtreType + '"')
                }}>{filtreType}</p>)}
            </div>
            <div style={{ marginLeft: 20, marginRight: 20 }}>
                <p>Commune</p>
                {filtresArrondissement.map(filtreArrondissement => <p onClick={() => {
                    _filtreActivites('refine', 'arrondissement:"' + filtreArrondissement + '"')
                }}>{filtreArrondissement}</p>)}
            </div>
            <div>
                <p>Payant</p>
                {filtresPayant.map(filtrePayant => <p onClick={() => {
                    _filtreActivites('refine', 'payant:"' + filtrePayant + '"')
                }}>{filtrePayant}</p>)}
            </div>
        </div>
    );
}

export default Activites;

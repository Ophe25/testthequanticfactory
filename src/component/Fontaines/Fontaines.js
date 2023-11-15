import { useEffect, useState } from 'react';
import { getFontainesFiltre } from '../../utilities/utils';
import api from '../../API/api';

function Fontaines() {

    const [currentFiltres, setCurrentFiltres] = useState([]);
    const [filtres, setFiltres] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [fontaines, setFontaines] = useState([]);

    // api.getFontaines('refine=dispo:NON').then((json) => {
    //     console.log('test', json)
    // })



    useEffect(() => {
        api.getFontainesExport().then((fontaines) => {
            console.log('test', fontaines)

            var filtreCommune = []
            fontaines.forEach(fontaine => {
                if (filtreCommune.indexOf(fontaine.commune) === -1 && fontaine.dispo === 'OUI') {
                    filtreCommune.push(fontaine.commune)
                }
            });
            setFiltres(filtreCommune)
            setCurrentFiltres([])
            setIsMounted(true)
        })
    }, []);

    useEffect(() => {
        api.getFontaines(currentFiltres).then((fontaines) => {
            setFontaines(fontaines);
        })
    }, [currentFiltres]);

    function _filtreFontaine(name, value) {
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



    return (
        <div>
            <p>Commune</p>
            {filtres.map(filtre => <p onClick={() => {
                _filtreFontaine('refine', 'commune:"' + filtre + '"')
            }}>{filtre}</p>)}
        </div>
    );
}

export default Fontaines;

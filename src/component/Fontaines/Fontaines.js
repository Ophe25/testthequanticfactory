import { useEffect, useState } from 'react';
import { getFontainesFiltre } from '../../utilities/utils';
import api from '../../API/api';
import { Table } from 'react-bootstrap';

function Fontaines() {

    const [currentFiltres, setCurrentFiltres] = useState([]);
    const [filtres, setFiltres] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [fontaines, setFontaines] = useState([]);

    console.log('fontaines', fontaines)

    useEffect(() => {
        api.getFontainesExport().then((fontaines) => {
            // console.log('test', fontaines)

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


    console.log('fontaines1', fontaines)

    return (
        <div>
            <div
                style={{
                    backgroundColor: '#5f259f',
                    width: '100%',
                    height: '30vh',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                }}>
                <img
                    src={require('../../assets/image/Fontaines.JPG')}
                    height={160}
                    style={{
                        alignSelf: 'center',
                        borderRadius: 17,
                        marginLeft: 30,
                    }}
                />
                <div style={{ textAlign: 'end', alignSelf: 'center', paddingRight: 30 }}>
                    <p style={{ margin: 0, fontSize: 28, color: 'white' }}>Fontaines à boire</p>
                    <p style={{ margin: 0, fontSize: 25, fontFamily: 'nexaLight', color: 'white' }}>{fontaines.total_count + ' fontaines trouvées'}</p>
                </div>
            </div>
            {/* <p>Commune</p>
            {filtres.map(filtre => <p onClick={() => {
                _filtreFontaine('refine', 'commune:"' + filtre + '"')
            }}>{filtre}</p>)} */}

            <Table
                style={{
                    backgroundColor: 'rgba(95, 37, 159, 0.35)',
                    margin: 40,
                    width: '95%',
                    borderRadius: 15,
                    padding: 10,
                    textAlign: 'center',
                }}
            >
                <thead>
                    <tr>
                        <th>Adresse</th>
                        <th>Commune</th>
                    </tr>
                </thead>
                <tbody>
                    {fontaines.results.map((fontaine) =>
                        <tr>
                            <td>{((fontaine.no_voirie_pair === null ? fontaine.no_voirie_impair : fontaine.no_voirie_pair) || (fontaine.no_voirie_pair === null && fontaine.no_voirie_impair === null ? '' : <></>)) + ' ' + fontaine.voie}</td>
                            <td>{fontaine.commune}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Fontaines;

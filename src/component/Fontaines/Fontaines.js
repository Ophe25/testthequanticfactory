import { useEffect, useState } from 'react';
import { getFontainesFiltre } from '../../utilities/utils';
import api from '../../API/api';
import { Table } from 'react-bootstrap';

function Fontaines({ navigation }) {

    const [currentFiltres, setCurrentFiltres] = useState([]);
    const [filtres, setFiltres] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [fontaines, setFontaines] = useState([]);

    // console.log('fontaines', fontaines)

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
            console.log('fontaines2', fontaines)

            setFontaines(fontaines);
        })
    }, [currentFiltres]);

    function _filtreFontaine(name, value) {
        // console.log('filtres', currentFiltres)

        const index = currentFiltres.findIndex((filtre) => filtre.value === value)

        var filtreCpy = [...currentFiltres]

        if (index !== -1) {
            filtreCpy.splice(index, 1)
        } else {
            filtreCpy.push({ name, value })
        }
        setCurrentFiltres(filtreCpy)

    }


    // console.log('fontaines1', fontaines)

    return (

        <div>
            {isMounted ?
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
                        <p onClick={() => navigation.goBack()}>Retour</p>
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
                            <h1 style={{ margin: 0, color: 'white' }}>Fontaines à boire</h1>
                            <p style={{ margin: 0, fontSize: 25, fontFamily: 'nexaLight', color: 'white' }}>{fontaines.total_count + ' fontaines trouvées'}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', overflow: 'scroll' }}>
                        <div
                            style={{
                                backgroundColor: 'rgba(95, 37, 159, 0.70)',
                                width: 'fit-content',
                                padding: 10,
                                margin: 20,
                                borderRadius: 20,
                                flex: 1
                            }}>
                            <h3 style={{ margin: 0, color: 'white', textAlign: 'center' }}>Filtres</h3>
                            <p style={{ color: 'white', fontFamily: 'nexaHeavy' }}>Commune :</p>
                            {filtres.map(filtre =>
                                <p
                                    style={{
                                        marginLeft: 10,
                                        cursor: 'pointer',
                                        color: (currentFiltres.findIndex((filtre) => filtre.value == 'commune:"' + filtre + '"')) === -1 ? 'white' : '#5f259f',
                                    }}
                                    onClick={() => {
                                        _filtreFontaine('refine', 'commune:"' + filtre + '"')
                                    }}>{filtre.toLowerCase()}</p>)}
                        </div>
                        <Table
                            style={{
                                margin: '20px 30px 20px 10px',
                                flex: 6,
                                borderRadius: 20,
                                textAlign: 'center',
                                borderCollapse: 'collapse',

                            }}
                        >
                            <thead>
                                <tr style={{
                                    backgroundColor: 'rgba(95, 37, 159, 0.35)', borderTopLeftRadius: 20, borderTopRightRadius: 20
                                }}>
                                    <th style={{ borderTopLeftRadius: 20 }}>Adresse</th>
                                    <th style={{ borderTopRightRadius: 20 }}>Commune</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fontaines?.results?.map((fontaine, i) =>
                                    <tr style={{
                                        backgroundColor: i % 2 ? 'rgba(95, 37, 159, 0.35)' : 'rgba(95, 37, 159, 0.15)',
                                        height: 'fit-content'
                                    }}>
                                        <td>{((fontaine.no_voirie_pair === null ? fontaine.no_voirie_impair : fontaine.no_voirie_pair) || (fontaine.no_voirie_pair === null && fontaine.no_voirie_impair === null ? '' : <></>)) + ' ' + fontaine.voie.toLowerCase()}</td>
                                        <td >{fontaine.commune.toLowerCase()}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    );
}

export default Fontaines;

import { useEffect, useState } from 'react';
import { getFontainesFiltre } from '../../utilities/utils';
import api from '../../API/api';
import { Table } from 'react-bootstrap';

function Activites({ navigation }) {

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

    return (
        // <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                            <h1 style={{ margin: 0, color: 'white' }}>Équipements et activités</h1>
                            <p style={{ margin: 0, fontSize: 25, fontFamily: 'nexaLight', color: 'white' }}>{activites.total_count + ' équipements et activités trouvées'}</p>
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
                            <div>
                                <p style={{ color: 'white', fontFamily: 'nexaHeavy' }}>Type :</p>
                                {filtresType.map(filtreType =>
                                    <p
                                        style={{
                                            marginLeft: 10,
                                            cursor: 'pointer',
                                            color: (currentFiltres.findIndex((filtre) => filtre.value == 'type:"' + filtreType + '"')) === -1 ? 'white' : '#5f259f',
                                        }}
                                        onClick={() => {
                                            _filtreActivites('refine', 'type:"' + filtreType + '"')
                                        }}>{filtreType}</p>)}
                            </div>
                            <div>
                                <p style={{ color: 'white', fontFamily: 'nexaHeavy' }}>Commune :</p>
                                {filtresArrondissement.map(filtreArrondissement =>
                                    <p
                                        style={{
                                            marginLeft: 10,
                                            cursor: 'pointer',
                                            color: (currentFiltres.findIndex((filtre) => filtre.value == 'arrondissement:"' + filtreArrondissement + '"')) === -1 ? 'white' : '#5f259f',
                                        }}
                                        onClick={() => {
                                            _filtreActivites('refine', 'arrondissement:"' + filtreArrondissement + '"')
                                        }}>{filtreArrondissement}</p>)}
                            </div>
                            <div>
                                <p style={{ color: 'white', fontFamily: 'nexaHeavy' }}>Payant :</p>
                                {filtresPayant.map(filtrePayant =>
                                    <p
                                        style={{
                                            marginLeft: 10,
                                            cursor: 'pointer',
                                            color: (currentFiltres.findIndex((filtre) => filtre.value == 'payant:"' + filtrePayant + '"')) === -1 ? 'white' : '#5f259f',
                                        }}
                                        onClick={() => {
                                            _filtreActivites('refine', 'payant:"' + filtrePayant + '"')
                                        }}>{filtrePayant}</p>)}
                            </div>

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
                                    <th style={{ borderTopLeftRadius: 20 }}>Nom</th>
                                    <th >Type</th>
                                    <th >Adresse</th>
                                    <th >Arrondissement</th>
                                    <th style={{ borderTopRightRadius: 20 }}>Payant</th>

                                </tr>
                            </thead>
                            <tbody>
                                {activites?.results?.map((activite, i) =>
                                    <tr style={{
                                        backgroundColor: i % 2 ? 'rgba(95, 37, 159, 0.35)' : 'rgba(95, 37, 159, 0.15)',
                                        height: 'fit-content'
                                    }}>
                                        <td> {activite.nom} </td>
                                        <td> {activite.type} </td>
                                        <td> {activite.adresse} </td>
                                        <td> {activite.arrondissement} </td>
                                        {/* <td>{((fontaine.no_voirie_pair === null ? fontaine.no_voirie_impair : fontaine.no_voirie_pair) || (fontaine.no_voirie_pair === null && fontaine.no_voirie_impair === null ? '' : <></>)) + ' ' + fontaine.voie.toLowerCase()}</td> */}
                                        <td >{activite.payant}</td>
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

// const [currentFiltres, setCurrentFiltres] = useState([]);
// const [filtres, setFiltres] = useState([]);
// const [isMounted, setIsMounted] = useState(false);
// const [fontaines, setFontaines] = useState([]);

// // console.log('fontaines', fontaines)

// useEffect(() => {
//     api.getFontainesExport().then((fontaines) => {
//         // console.log('test', fontaines)

//         var filtreCommune = []
//         fontaines.forEach(fontaine => {
//             if (filtreCommune.indexOf(fontaine.commune) === -1 && fontaine.dispo === 'OUI') {
//                 filtreCommune.push(fontaine.commune)
//             }
//         });
//         setFiltres(filtreCommune)
//         setCurrentFiltres([])
//         setIsMounted(true)
//     })
// }, []);

// useEffect(() => {
//     api.getFontaines(currentFiltres).then((fontaines) => {
//         console.log('fontaines2', fontaines)

//         setFontaines(fontaines);
//     })
// }, [currentFiltres]);

// function _filtreFontaine(name, value) {
//     // console.log('filtres', currentFiltres)

//     const index = currentFiltres.findIndex((filtre) => filtre.value === value)

//     var filtreCpy = [...currentFiltres]

//     if (index !== -1) {
//         filtreCpy.splice(index, 1)
//     } else {
//         filtreCpy.push({ name, value })
//     }
//     setCurrentFiltres(filtreCpy)

// }

{/* <div>
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
            </div> */}


export default Activites;


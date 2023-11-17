import { useEffect, useState } from 'react';
import { getFontainesFiltre } from '../../utilities/utils';
import api from '../../API/api';
import { Table } from 'react-bootstrap';

function EspacesVerts({ navigation }) {

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
                            <h1 style={{ margin: 0, color: 'white' }}>Espaces verts</h1>
                            <p style={{ margin: 0, fontSize: 25, fontFamily: 'nexaLight', color: 'white' }}>{espaces.total_count + ' espaces verts trouvées'}</p>
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
                                <p style={{ color: 'white', fontFamily: 'nexaHeavy' }}>Type</p>
                                {filtresType.map(filtreType =>
                                    <p
                                        style={{
                                            marginLeft: 10,
                                            cursor: 'pointer',
                                            color: (currentFiltres.findIndex((filtre) => filtre.value == 'type:"' + filtreType + '"')) === -1 ? 'white' : '#5f259f',
                                        }}
                                        onClick={() => {
                                            _filtreEspaces('refine', 'type:"' + filtreType + '"')
                                        }}>{filtreType}</p>)}
                            </div>
                            <div>
                                <p style={{ color: 'white', fontFamily: 'nexaHeavy' }}>Arrondissements</p>
                                {filtresArrondissement.map(filtreArrondissement =>
                                    <p
                                        style={{
                                            marginLeft: 10,
                                            cursor: 'pointer',
                                            color: (currentFiltres.findIndex((filtre) => filtre.value == 'arrondissement:"' + filtreArrondissement + '"')) === -1 ? 'white' : '#5f259f',
                                        }}
                                        onClick={() => {
                                            _filtreEspaces('refine', 'arrondissement:"' + filtreArrondissement + '"')
                                        }}>{filtreArrondissement}</p>)}
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
                                    <th>Type</th>
                                    <th>Adresse</th>
                                    <th style={{ borderTopRightRadius: 20 }}>Arrondissement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {espaces?.results?.map((espace, i) =>
                                    <tr style={{
                                        backgroundColor: i % 2 ? 'rgba(95, 37, 159, 0.35)' : 'rgba(95, 37, 159, 0.15)',
                                        height: 'fit-content'
                                    }}>
                                        <td>{espace.nom.toLowerCase()}</td>
                                        <td>{espace.type}</td>
                                        <td>{espace.adresse.toLowerCase()}</td>
                                        <td >{espace.arrondissement}</td>
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

export default EspacesVerts;

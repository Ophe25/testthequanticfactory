import { useEffect, useState } from 'react';
import api from '../../API/api';
import { Backdrop, CircularProgress, Pagination, Table } from '@mui/material';
import Header from '../Header';
import Progress from '../Progress';

function EspacesVerts({ navigation }) {

    const [currentFiltres, setCurrentFiltres] = useState([]);
    const [filtresArrondissement, setFiltresArrondissement] = useState([]);
    const [filtresType, setFiltresType] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [espaces, setEspaces] = useState([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        api.getEspacesExport().then((espaces) => {

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

        const index = currentFiltres.findIndex((filtre) => filtre.value === value && filtre.name === name)

        var filtreCpy = [...currentFiltres]

        if (currentFiltres.findIndex((filtre) => filtre.name === 'offset') !== -1) {
            filtreCpy.splice(index, 1)
            filtreCpy.push({ name, value })
        } else {
            if (index !== -1) {
                filtreCpy.splice(index, 1)
            } else {
                filtreCpy.push({ name, value })
            }
        }
        setCurrentFiltres(filtreCpy)

    }

    function _changePage(event, value) {
        setPage(value)
        var idFirstRow = (value - 1) * 10
        _filtreEspaces('offset', idFirstRow)
    }

    return (
        <div>
            {isMounted ?
                <div>

                    <Header nom='Espaces Verts' nbResults={espaces.total_count} url={require('../../assets/image/espaceVerts.jpg')} navigation={() => navigation.goBack()} />

                    <div className='body'>
                        <div className='filtres'>
                            <h3>Filtres</h3>
                            <div>
                                <h4>Type :</h4>
                                {filtresType.map((filtreType, id) =>
                                    <p
                                        key={id}
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
                                <h4>Arrondissements</h4>
                                {filtresArrondissement.map((filtreArrondissement, id) =>
                                    <p
                                        key={id}
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
                        <div className='tableau-datasets'>
                            <Table>
                                <thead>
                                    <tr className='table-header'>
                                        <th style={{ borderTopLeftRadius: 20 }}>Nom</th>
                                        <th>Type</th>
                                        <th>Adresse</th>
                                        <th style={{ borderTopRightRadius: 20 }}>Arrondissement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {espaces?.results?.map((espace, i) =>
                                        <tr
                                            id={i}
                                            style={{
                                                backgroundColor: i % 2 ? 'rgba(95, 37, 159, 0.35)' : 'rgba(95, 37, 159, 0.15)',

                                            }}>
                                            <td style={{ borderBottomLeftRadius: i + 1 === espaces.results.length ? 20 : 0 }}>{espace.nom.toLowerCase()}</td>
                                            <td>{espace.type}</td>
                                            <td>{espace.adresse?.toLowerCase()}</td>
                                            <td style={{ borderBottomRightRadius: i + 1 === espaces.results.length ? 20 : 0 }}>{espace.arrondissement}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <div className='pagination'>
                                <Pagination
                                    count={Math.ceil(espaces.total_count / espaces.results.length)}
                                    shape="rounded"
                                    onChange={_changePage}
                                    page={page}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Progress />
            }
        </div >
    );
}

export default EspacesVerts;
